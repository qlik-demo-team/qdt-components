import React, { useRef, useState, useEffect } from 'react';  // eslint-disable-line
import equal from 'deep-equal';
import merge from '../utils/merge';

const defaultHyperCubeDef = {
  qDimensions: [],
  qMeasures: [],
  qInitialDataFetch: [{
    qTop: 0,
    qLeft: 0,
    qWidth: 10,
    qHeight: 1000,
  }],
  qInterColumnSortOrder: [],
  qSuppressZero: true,
  qSuppressMissing: true,
};

const defaultListObjectDef = {
  qDef: [],
  qInitialDataFetch: [{
    qTop: 0,
    qWidth: 1,
    qHeight: 10000,
  }],
  qInterColumnSortOrder: [],
  qSuppressZero: true,
  qSuppressMissing: true,
};

const useSessionObject = ({ app, properties: propertiesProp }) => {
  const properties = { ...propertiesProp };
  properties.qInfo = { qType: 'qdt' };
  if (properties.qHyperCubeDef) {
    properties.qHyperCubeDef = merge(defaultHyperCubeDef, properties.qHyperCubeDef);
  }
  if (properties.qListObjectDef) {
    properties.qListObjectDef = merge(defaultListObjectDef, properties.qListObjectDef);
  }

  const staleProperties = useRef();
  const qProp = useRef();
  qProp.current = properties;

  const model = useRef(null);
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    (async () => {
      model.current = await app.createSessionObject(qProp.current);
      model.current.on('changed', async () => {
        const _layout = await model.current.getLayout();
        setLayout(_layout);
      });
      const _layout = await model.current.getLayout();
      setLayout(_layout);
    })();
    return () => {
      (async () => {
        app.destroySessionObject(model.current.id);
      })();
    };
  }, [app]);

  useEffect(() => {
    if (!model.current) return;
    if (!equal(staleProperties.current, properties)) {
      (async () => {
        await model.current.setProperties(qProp.current);
        const _layout = await model.current.getLayout();
        setLayout(_layout);
      })();
    }
    staleProperties.current = properties;
  });

  return { model: model.current, layout };
};

export default useSessionObject;
