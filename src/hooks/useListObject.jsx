// import { useEffect } from 'react';
import merge from 'deepmerge';

const useListObject = ({ app, qListObjectDef: qListObjectDefProp }) => {
  const qListObjectDefDefault = {
    qDef: [],
    qInitialDataFetch: [{
      qTop: 0,
      qWidth: 1,
      qHeight: 1000,
    }],
    qInterColumnSortOrder: [],
    qSuppressZero: true,
    qSuppressMissing: true,
  };
  const qListObjectDef = merge(qListObjectDefDefault, qListObjectDefProp);
  const qProp = {
    qInfo: {
      qType: 'ListObject',
    },
    qListObjectDef,
  };

  let model = null;
  let layout = null;

  const getLayout = async () => {
    const qLayout = await model.getLayout();
    const qDataPages = await model.getListObjectData('/qListObjectDef', [{ qTop: 0, qWidth: 1, qHeight: 1000 }]);
    qLayout.qListObject.qDataPages = qDataPages;
    return qLayout;
  };

  const init = async () => {
    model = await app.createSessionObject(qProp);
    layout = await getLayout();
    return { layout, model };
  };

  return init();
};

export default useListObject;
