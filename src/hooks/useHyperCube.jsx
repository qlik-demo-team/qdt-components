import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

let qDoc = null;
let qObject = null;
let qLayout = null;
let selections = null;
let qRData = null;

const useHyperCube = ({
  qDocPromise, qPage, cols, qHyperCubeDef, qSortByAscii, qSortByLoadOrder, qInterColumnSortOrder, qSuppressZero, qSortByExpression, qSuppressMissing, qExpression, getQRData,
}) => {
  const [qData, setQData] = useState(null);

  const generateQProp = () => {
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
  };

  const getLayout = async () => {
    const _qLayout = await qObject.getLayout();
    return _qLayout;
  };

  const getData = async (qTop) => {
    const qDataPages = await qObject.getHyperCubeData('/qHyperCubeDef', [{ ...qPage, qTop }]);
    return qDataPages[0];
  };

  const getReducedData = async () => {
    const { qWidth } = qPage;
    const _qPage = {
      qTop: 0,
      qLeft: 0,
      qWidth,
      qHeight: Math.round(10000 / qWidth),
    };
    const qDataPages = await qObject.getHyperCubeReducedData('/qHyperCubeDef', [{ ..._qPage }], -1, 'D1');
    return qDataPages[0];
  };

  const update = async (qTopPassed = null) => {
    // Short-circuit evaluation because one line destructuring on Null values breaks on the browser.
    const { qDataGenerated } = qData || {};
    const { qArea } = qDataGenerated || {};
    const { qTop: qTopGenerated } = qArea || {};
    // We need to be able to pass qTopPassed=0 to force the update with qTop=0
    const qTop = (qTopPassed !== null && qTopPassed >= 0) ? qTopPassed : qTopGenerated;
    qLayout = await getLayout();
    const _qData = await getData(qTop);
    selections = _qData.qMatrix.filter((row) => row[0].qState === 'S');
    setQData(_qData);
  };

  const offset = (qTop) => update(qTop);

  const beginSelections = async () => {
    // await qDoc.abortModal(false);
    await qObject.beginSelections(['/qHyperCubeDef']);
  };

  const endSelections = async (qAccept) => {
    await qObject.endSelections(qAccept);
    // await qDoc.abortModal(qAccept);
  };

  const select = async (dimIndex, _selections, toggle = true) => {
    await qObject.selectHyperCubeValues('/qHyperCubeDef', dimIndex, _selections, toggle);
  };

  const applyPatches = async (patches) => {
    await qObject.applyPatches(patches);
  };

  useEffect(() => {
    (async () => {
      const qProp = await generateQProp();
      qDoc = await qDocPromise;
      qObject = await qDoc.createSessionObject(qProp);
      qObject.on('changed', () => { update(); });
      if (getQRData) qRData = await getReducedData();
      update();
    })();
    return () => {
      const { id } = qObject;
      qDoc.destroySessionObject(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    beginSelections, endSelections, qLayout, qData, qRData, offset, selections, select, applyPatches,
  };
};

useHyperCube.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qHyperCubeDef: PropTypes.object,
  qPage: PropTypes.object,
  qSortByAscii: PropTypes.oneOf([1, 0, -1]),
  qSortByLoadOrder: PropTypes.oneOf([1, 0, -1]),
  qInterColumnSortOrder: PropTypes.array,
  qSuppressZero: PropTypes.bool,
  qSortByExpression: PropTypes.oneOf([1, 0, -1]),
  qSuppressMissing: PropTypes.bool,
  qExpression: PropTypes.object,
  getQRData: PropTypes.bool, // Engine breaks on some HyperCubes
};

useHyperCube.defaultProps = {
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

export default useHyperCube;
