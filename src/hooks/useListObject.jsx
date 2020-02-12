import {
  useCallback, useRef, useReducer, useEffect,
} from 'react';
import merge from 'deepmerge';
// import useSequencer from './useSequencer';

const initialState = {
  qDoc: null,
  qObject: null,
  qData: null,
  qLayout: null,
  selections: null,
};

function reducer(state, action) {
  const {
    payload: {
      qData, qLayout, selections,
    }, type,
  } = action;
  switch (type) {
    case 'update':
      return {
        ...state, qData, qLayout, selections,
      };
    default:
      throw new Error();
  }
}

const initialProps = {
  autoSortByState: 1,
  qSortByAscii: 1,
  qSortByLoadOrder: 1,
  cols: null,
  qListObjectDef: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 1000,
  },
};

const useListObject = (props) => {
  const {
    qPage: qPageProp, cols, qListObjectDef, qSortByAscii, qSortByLoadOrder, autoSortByState,
  } = merge(initialProps, props);
  const { qDocPromise } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    qData, qLayout, selections,
  } = state;

  const qObject = useRef(null);
  const qPage = useRef(qPageProp);

  /** Generate the Definition file */
  const generateQProp = useCallback((currentColumn = 0) => {
    const qProp = { qInfo: { qType: 'visualization' } };
    if (qListObjectDef) {
      qProp.qListObjectDef = qListObjectDef;
    } else {
      const qDimensions = cols.filter((col) => (typeof col === 'string' && !col.startsWith('='))
        || (typeof col === 'object' && col.qDef && col.qDef.qFieldDefs)
        || (typeof col === 'object' && col.qLibraryId && col.qType && col.qType === 'dimension'))
        .map((col) => {
          if (typeof col === 'string') {
            return { qDef: { qFieldDefs: [col], qSortCriterias: [{ qSortByLoadOrder, qSortByAscii }] } };
          }
          return col;
        });
      const qLibraryId = { qLibraryId: (typeof cols[0] === 'object' && cols[0].qLibraryId) ? cols[0].qLibraryId : '' };
      const qDef = qDimensions[currentColumn];
      qProp.qListObjectDef = {
        ...qLibraryId,
        ...qDef,
        qShowAlternatives: true,
        qAutoSortByState: { qDisplayNumberOfRows: autoSortByState },
      };
    }
    return qProp;
  }, [autoSortByState, cols, qListObjectDef, qSortByAscii, qSortByLoadOrder]);

  const getLayout = useCallback(() => qObject.current.getLayout(), []);

  const getData = useCallback(async () => {
    const qDataPages = await qObject.current.getListObjectData('/qListObjectDef', [qPage.current]);
    return qDataPages[0];
  }, []);

  const update = useCallback(async () => {
    const _qLayout = await getLayout();
    const _qData = await getData();
    const _selections = _qData.qMatrix.filter((row) => row[0].qState === 'S');
    dispatch({ type: 'update', payload: { qData: _qData, qLayout: _qLayout, selections: _selections } });
  }, [getData, getLayout]);

  const changePage = useCallback((newPage) => {
    qPage.current = { ...qPage.current, ...newPage };
    update();
  }, [update]);

  const beginSelections = useCallback(async () => qObject.current.beginSelections(['/qListObjectDef']), []);

  const endSelections = useCallback((qAccept) => qObject.current.endSelections(qAccept), []);

  const select = useCallback((qElemNumber, toggle = true, ignoreLock = false) => qObject.current.selectListObjectValues('/qListObjectDef', [qElemNumber], toggle, ignoreLock), []);

  const searchListObjectFor = useCallback((string) => qObject.current.searchListObjectFor('/qListObjectDef', string), []);

  const acceptListObjectSearch = useCallback((ignoreLock = false) => qObject.current.acceptListObjectSearch('/qListObjectDef', true, ignoreLock), []);

  const applyPatches = useCallback((patches) => qObject.current.applyPatches(patches), []);

  const clearSelections = useCallback(() => qObject.current.clearSelections('/qListObjectDef'), []);

  useEffect(() => {
    if (!qDocPromise || qObject.current) return;
    (async () => {
      const qProp = generateQProp();
      const qDoc = await qDocPromise;
      qObject.current = await qDoc.createSessionObject(qProp);
      qObject.current.on('changed', () => { update(); });
      update();
    })();
  }, [generateQProp, qDocPromise, update]);

  return {
    qLayout, qData, changePage, select, beginSelections, endSelections, searchListObjectFor, acceptListObjectSearch, applyPatches, selections, clearSelections,
  };
};

export default useListObject;
