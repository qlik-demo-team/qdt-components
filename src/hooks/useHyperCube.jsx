import {
  useCallback, useRef, useReducer, useEffect,
} from 'react';
import merge from 'deepmerge';

const initialState = {
  qData: null,
  qRData: null,
  qLayout: null,
  selections: null,
};

function reducer(state, action) {
  const {
    payload: {
      qData, qRData, qLayout, selections,
    }, type,
  } = action;
  switch (type) {
    case 'update':
      return {
        ...state, qData, qLayout, selections,
      };
    case 'updateReducedData':
      return {
        ...state, qRData,
      };
    default:
      throw new Error();
  }
}

const initialProps = {
  cols: null,
  qHyperCubeDef: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 10,
    qHeight: 100,
  },
  qSortByAscii: 1,
  qSortByLoadOrder: 1,
  qInterColumnSortOrder: [],
  qSuppressZero: false,
  qSortByExpression: 0,
  qSuppressMissing: false,
  qExpression: null,
  getQRData: false,
};

const useHyperCube = (props) => {
  const {
    qPage: qPageProp, cols, qHyperCubeDef, qSortByAscii, qSortByLoadOrder, qInterColumnSortOrder, qSuppressZero, qSortByExpression, qSuppressMissing, qExpression, getQRData,
  } = merge(initialProps, props);
  const { qDocPromise } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    qData, qRData, qLayout, selections,
  } = state;

  const qObject = useRef(null);
  const qPage = useRef(qPageProp);

  const generateQProp = useCallback(() => {
    const qProp = { qInfo: { qType: 'visualization' } };
    if (qHyperCubeDef) {
      const _qHyperCubeDef = qHyperCubeDef;
      if (cols && cols[1]) _qHyperCubeDef.qMeasures[0].qDef = { qDef: cols[1] };
      if (cols && cols[0]) _qHyperCubeDef.qDimensions[0].qDef.qFieldDefs = [cols[0]];
      qProp.qInfo.qType = 'HyperCube';
      qProp.qHyperCubeDef = _qHyperCubeDef;
      return qProp;
    }
    const myqInterColumnSortOrder = (qInterColumnSortOrder) || [];
    const qInterColumnSortOrderSet = !!(qInterColumnSortOrder);
    let sortIndex = 0;
    const qDimensions = cols.filter((col, i) => {
      const isDimension = (typeof col === 'string' && !col.startsWith('='))
        || (typeof col === 'object' && col.qDef && col.qDef.qFieldDefs)
        || (typeof col === 'object' && col.qLibraryId && col.qType && col.qType === 'dimension');
      if (isDimension && !qInterColumnSortOrderSet) { myqInterColumnSortOrder[i] = sortIndex; sortIndex += 1; }
      return isDimension;
    }).map((col) => {
      if (typeof col === 'string') {
        return { qDef: { qFieldDefs: [col], qSortCriterias: [{ qSortByAscii, qSortByLoadOrder }] }, qNullSuppression: true }; //
      }
      return col;
    });
    const qMeasures = cols.filter((col, i) => {
      const isMeasure = (typeof col === 'string' && col.startsWith('='))
          || (typeof col === 'object' && col.qDef && col.qDef.qDef)
          || (typeof col === 'object' && col.qLibraryId && col.qType && col.qType === 'measure');
      if (isMeasure && !qInterColumnSortOrderSet) { myqInterColumnSortOrder[i] = sortIndex; sortIndex += 1; }
      return isMeasure;
    }).map((col) => {
      if (typeof col === 'string') {
        return {
          qDef: { qDef: col },
          qSortBy: {
            qSortByNumeric: -1, qSortByExpression, qExpression, qSuppressMissing,
          },
        };
      }
      return col;
    });

    qProp.qHyperCubeDef = {
      qDimensions,
      qMeasures,
      qInterColumnSortOrder,
      qSuppressZero,
      qSuppressMissing,
    };
    return qProp;
  }, [cols, qExpression, qHyperCubeDef, qInterColumnSortOrder, qSortByAscii, qSortByExpression, qSortByLoadOrder, qSuppressMissing, qSuppressZero]);

  const getLayout = useCallback(() => qObject.current.getLayout(), []);

  const getData = useCallback(async () => {
    const qDataPages = await qObject.current.getHyperCubeData('/qHyperCubeDef', [qPage.current]);
    return qDataPages[0];
  }, []);

  const getReducedData = useCallback(() => async () => {
    const { qWidth } = qPage.current;
    const _qPage = {
      qTop: 0,
      qLeft: 0,
      qWidth,
      qHeight: Math.round(10000 / qWidth),
    };
    const qDataPages = await qObject.current.getHyperCubeReducedData('/qHyperCubeDef', [_qPage], -1, 'D1');
    return qDataPages[0];
  }, []);

  const update = useCallback(async () => {
    const _qLayout = await getLayout();
    const _qData = await getData();
    const _selections = _qData.qMatrix.filter((row) => row[0].qState === 'S');
    dispatch({ type: 'update', payload: { qData: _qData, qLayout: _qLayout, selections: _selections } });
    if (getQRData) {
      const _qRData = await getReducedData();
      dispatch({ type: 'updateReducedData', payload: { qRData: _qRData } });
    }
  }, [getData, getLayout, getQRData, getReducedData]);

  const changePage = useCallback((newPage) => {
    qPage.current = { ...qPage.current, ...newPage };
    update();
  }, [update]);

  const beginSelections = useCallback(() => qObject.current.beginSelections(['/qHyperCubeDef']), []);

  const endSelections = useCallback((qAccept) => qObject.current.endSelections(qAccept), []);

  const select = useCallback((qElemNumber, _selections, toggle = true) => qObject.current.selectHyperCubeValues('/qHyperCubeDef', qElemNumber, _selections, toggle), []);

  const applyPatches = useCallback((patches) => qObject.current.applyPatches(patches), []);

  useEffect(() => {
    if (qObject.current) return;
    (async () => {
      const qProp = generateQProp();
      const qDoc = await qDocPromise;
      qObject.current = await qDoc.createSessionObject(qProp);
      qObject.current.on('changed', () => { update(); });
      update();
    })();
  }, [generateQProp, qDocPromise, update]);

  return {
    beginSelections, endSelections, qLayout, qData, qRData, changePage, selections, select, applyPatches,
  };
};

export default useHyperCube;