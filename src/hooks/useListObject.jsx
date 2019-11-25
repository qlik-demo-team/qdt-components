import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

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
      qDoc, qObject, qData, qLayout, selections,
    }, type,
  } = action;
  switch (type) {
    case 'update':
      return {
        ...state, qData, qLayout, selections,
      };
    case 'init':
      return {
        ...state, qDoc, qObject,
      };
    default:
      throw new Error();
  }
}

const useListObject = ({
  qDocPromise, qPage, cols, qListObjectDef, qSortByAscii, qSortByLoadOrder, autoSortByState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    qData, qLayout, qObject, selections,
  } = state;

  /** Generate the Definition file */
  const generateQProp = (currentColumn = 0) => {
    const qProp = { qInfo: { qType: 'visualization' } };
    if (qListObjectDef) {
      qProp.qListObjectDef = qListObjectDef;
    } else {
      const qDimensions = cols.filter((col) => (typeof col === 'string' && !col.startsWith('='))
        || (typeof col === 'object' && col.qDef && col.qDef.qFieldDefs)
        || (typeof col === 'object' && col.qLibraryId && col.qType && col.qType === 'dimension'))
        .map((col) => {
          if (typeof col === 'string') {
            return { qDef: { qFieldDefs: [col], qSortCriterias: [{ qSortByAscii, qSortByLoadOrder }] } };
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
  };

  const getLayout = () => qObject.getLayout();

  const getData = async (qTop) => {
    const qDataPages = await qObject.getListObjectData('/qListObjectDef', [{ ...qPage, qTop }]);
    return qDataPages[0];
  };

  const update = async (qTopPassed = 0) => {
    // Short-circuit evaluation because one line destructuring on Null values breaks on the browser.
    const { qDataGenerated } = qData || {};
    const { qArea } = qDataGenerated || {};
    const { qTop: qTopGenerated } = qArea || {};
    const qTop = (qTopPassed) || qTopGenerated;
    const _qLayout = await getLayout();
    const _qData = await getData(qTop);
    const _selections = _qData.qMatrix.filter((row) => row[0].qState === 'S');
    dispatch({ type: 'update', payload: { qData: _qData, qLayout: _qLayout, selections: _selections } });
  };

  const offset = (qTop) => update(qTop);

  const beginSelections = async () => {
    // Make sure we close all other open selections. We usually get that when we have morethan one dropDown in the same page and while one is open, we click on the second one
    // await qDoc.abortModal(false);
    await qObject.beginSelections(['/qListObjectDef']);
  };

  const endSelections = (qAccept) => qObject.endSelections(qAccept);

  const select = (qElemNumber, toggle = true, ignoreLock = false) => qObject.selectListObjectValues('/qListObjectDef', [qElemNumber], toggle, ignoreLock);

  const searchListObjectFor = (string) => qObject.searchListObjectFor('/qListObjectDef', string);

  const acceptListObjectSearch = (ignoreLock = false) => qObject.acceptListObjectSearch('/qListObjectDef', true, ignoreLock);

  const applyPatches = (patches) => qObject.applyPatches(patches);

  useEffect(() => {
    (async () => {
      const qProp = await generateQProp();
      const qDoc = await qDocPromise;
      const _qObject = await qDoc.createSessionObject(qProp);
      if (!state.qDoc) dispatch({ type: 'init', payload: { qDoc, qObject: _qObject } });
      if (state.qDoc && !state.qLayout) {
        update();
        qObject.on('changed', () => { update(); });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.qDoc, state.qLayout]);

  return {
    qLayout, qData, offset, select, beginSelections, endSelections, searchListObjectFor, acceptListObjectSearch, applyPatches, selections,
  };
};

useListObject.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qListObjectDef: PropTypes.object,
  qPage: PropTypes.object,
  autoSortByState: PropTypes.bool,
  qSortByAscii: PropTypes.oneOf([1, 0, -1]),
  qSortByLoadOrder: PropTypes.oneOf([1, 0, -1]),
};

useListObject.defaultProps = {
  autoSortByState: 1,
  qSortByAscii: 1,
  qSortByLoadOrder: 1,
  cols: null,
  qListObjectDef: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 100,
  },
};

export default useListObject;
