import React from 'react';
import PropTypes from 'prop-types';
import useSessionObject from '../../hooks/useSessionObject';

const QdtComponent = React.forwardRef(({
  Component, options, app, properties, LoadingComponent,
}, { componentRef, modelRef, layoutRef }) => {
  const ComponentRef = useRef(Component);
  const optionsRef = useRef(options);
  const appRef = useRef(app);
  const propertiesRef = useRef(properties);
  const LoadingComponentRef = useRef(LoadingComponent);
  ComponentRef.current = Component || ComponentRef.current;
  optionsRef.current = options || optionsRef.current;
  appRef.current = app || appRef.current;
  propertiesRef.current = (properties) || propertiesRef.current;
  LoadingComponentRef.current = LoadingComponent || LoadingComponentRef.current;
  const { model, layout } = useSessionObject({ app: appRef.current, properties: propertiesRef.current });
  modelRef.current = model;  //eslint-disable-line
  layoutRef.current = layout;  //eslint-disable-line
  return (
    <>
      {((!model || !layout) && !LoadingComponent) && <div>Loading...</div>}
      {((!model || !layout) && LoadingComponent) && <LoadingComponent />}
      {(model && layout) && (
        <Component ref={componentRef} app={app} model={model} layout={layout} options={options} />
      )}
    </>
  );
});

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
