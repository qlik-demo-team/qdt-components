// import { useEffect } from 'react';
import merge from 'deepmerge';

const useHyperCube = ({ app, qHyperCubeDef: qHyperCubeDefProp }) => {
  const qHyperCubeDefDefault = {
    qDimensions: [],
    qMeasures: [],
    qInitialDataFetch: [{
      qTop: 0,
      qWidth: 1,
      qHeight: 100,
    }],
    qInterColumnSortOrder: [],
    qSuppressZero: true,
    qSuppressMissing: true,
  };
  const qHyperCubeDef = merge(qHyperCubeDefDefault, qHyperCubeDefProp);
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
    const qDataPages = await model.getHyperCubeData('/qHyperCubeDef', [{ qTop: 0, qWidth: 4, qHeight: 2500 }]);
    qLayout.qHyperCube.qDataPages = qDataPages;
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
