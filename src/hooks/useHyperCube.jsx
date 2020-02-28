// import { useEffect } from 'react';
import merge from 'deepmerge';

const useHyperCube = ({ app, qHyperCubeDef: qHyperCubeDefProp }) => {
  const qHyperCubeDefDefault = {
    qDimensions: [],
    qMeasures: [],
    qInitialDataFetch: [{
      qWidth: 1,
      qHeight: 10000,
    }],
    qInterColumnSortOrder: [],
    qSuppressZero: true,
    qSuppressMissing: true,
  };
  const qHyperCubeDef = merge(qHyperCubeDefDefault, qHyperCubeDefProp);
  if (qHyperCubeDefProp.qInitialDataFetch) qHyperCubeDef.qInitialDataFetch = qHyperCubeDefProp.qInitialDataFetch;
  // const qPage = {
  //   qTop: 0,
  //   qWidth: qHyperCubeDef.qInitialDataFetch[0].qWidth,
  //   qHeight: qHyperCubeDef.qInitialDataFetch[0].qHeight,
  // };
  const qProp = {
    qInfo: {
      qType: 'HyperCube',
    },
    qHyperCubeDef,
  };

  let model = null;
  let layout = null;

  const getLayout = async () => {
    const qLayout = await model.getLayout();
    // const qDataPages = await model.getHyperCubeData('/qHyperCubeDef', [qPage]);
    // qLayout.qHyperCube.qDataPages = qDataPages;
    return qLayout;
  };

  const init = async () => {
    model = await app.createSessionObject(qProp);
    layout = await getLayout();
    return { layout, model };
  };

  return init();
};

export default useHyperCube;
