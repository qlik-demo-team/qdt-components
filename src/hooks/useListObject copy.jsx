import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const useListObject = ({
  qDocPromise, qPage, cols, qListObjectDef, qSortByAscii, qSortByLoadOrder, autoSortByState,
}) => {
  // const [qObject, setQObject] = useState(null);
  const [state, setState] = useState({
    // qDoc: null,
    // qObject: null,
    qData: null,
    qLayout: null,
    selections: null,
  });

  // const pages = useMemo(() => (qLayout && qPage) && Math.ceil(qLayout.qHyperCube.qSize.qcy / qPage.qHeight), [qLayout, qPage]);

  const { qData, qLayout, selections } = state;

  let qDoc = null;
  let qObject = null;

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

  const getLayout = async () => {
    // const { qObject } = state;
    const _qLayout = await qObject.getLayout();
    return _qLayout;
  };

  const getData = async (qTop) => {
    // const { qObject } = state;
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
    setState({ qData: _qData, qLayout: _qLayout, selections: _selections });
    // setQData(_qData);
  };

  const offset = (qTop) => update(qTop);

  const beginSelections = async () => {
    // const { qObject } = state;
    // Make sure we close all other open selections. We usually get that when we have morethan one dropDown in the same page and while one is open, we click on the second one
    // await qDoc.abortModal(false);
    await qObject.beginSelections(['/qListObjectDef']);
  };

  const endSelections = async (qAccept) => {
    // const { qObject } = state;
    await qObject.endSelections(qAccept);
  };

  const select = async (qElemNumber, toggle = true, ignoreLock = false) => {
    console.log('select', qObject);
    // const { qObject } = state;
    await qObject.selectListObjectValues('/qListObjectDef', [qElemNumber], toggle, ignoreLock);
  };

  const searchListObjectFor = async (string) => {
    // const { qObject } = state;
    await qObject.searchListObjectFor('/qListObjectDef', string);
  };

  const acceptListObjectSearch = async (ignoreLock = false) => {
    // const { qObject } = state;
    await qObject.acceptListObjectSearch('/qListObjectDef', true, ignoreLock);
  };

  const applyPatches = async (patches) => {
    // const { qObject } = state;
    await qObject.applyPatches(patches);
  };

  useEffect(() => {
    (async () => {
      const qProp = await generateQProp();
      qDoc = await qDocPromise;
      qObject = await qDoc.createSessionObject(qProp);
      qObject.on('changed', () => { update(); });
      // await setState({
      //   ...state,
      //   qDoc: _qDoc,
      //   qObject: _qObject,
      // });
      update();
    })();
    return () => {
      // const { qDoc, qObject: { id } } = state;
      const { id } = qObject;
      qDoc.destroySessionObject(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
