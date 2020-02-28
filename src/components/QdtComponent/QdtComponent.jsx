import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useSessionObject from '../../hooks/useSessionObject';

const QdtComponent = ({
  Component, options, app, properties, LoadingComponent,
}) => {
  const ComponentRef = useRef(Component);
  const optionsRef = useRef(options);
  const appRef = useRef(app);
  const propertiesRef = useRef(properties);
  const LoadingComponentRef = useRef(LoadingComponent);
  ComponentRef.current = Component || ComponentRef.current;
  optionsRef.current = options || optionsRef.current;
  appRef.current = app || appRef.current;
  propertiesRef.current = properties || propertiesRef.current;
  LoadingComponentRef.current = LoadingComponent || LoadingComponentRef.current;
  const { model, layout } = useSessionObject({ app: appRef.current, properties: propertiesRef.current });
  return (
    <>
      {((!model || !layout) && !LoadingComponentRef.current) && <div>Loading...</div>}
      {((!model || !layout) && LoadingComponentRef.current) && <LoadingComponentRef.current />}
      {(model && layout) && <ComponentRef.current app={app} model={model} layout={layout} options={optionsRef.current} />}
    </>
  );
};

QdtComponent.propTypes = {
  Component: PropTypes.func.isRequired,
  options: PropTypes.object,
  app: PropTypes.object.isRequired,
  properties: PropTypes.object,
  LoadingComponent: PropTypes.func,
};
QdtComponent.defaultProps = {
  options: {},
  properties: {},
  LoadingComponent: null,
};

export default QdtComponent;