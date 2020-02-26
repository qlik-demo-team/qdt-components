import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useSessionObject from '../../hooks/useSessionObject';

const QdtComponent = ({
  Component, options, app, properties,
}) => {
  const ComponentRef = useRef(Component);
  const optionsRef = useRef(options);
  const appRef = useRef(app);
  const propertiesRef = useRef(properties);
  ComponentRef.current = Component || ComponentRef.current;
  optionsRef.current = options || optionsRef.current;
  appRef.current = app || appRef.current;
  propertiesRef.current = properties || propertiesRef.current;
  const { model, layout } = useSessionObject({ app: appRef.current, properties: propertiesRef.current });
  return (
    <>
      {(!model || !layout) && <div>Loading...</div>}
      {(model && layout) && <ComponentRef.current model={model} layout={layout} options={optionsRef.current} />}
    </>
  );
};

QdtComponent.propTypes = {
  Component: PropTypes.func.isRequired,
  options: PropTypes.object,
  app: PropTypes.object.isRequired,
  properties: PropTypes.object,
};
QdtComponent.defaultProps = {
  options: {},
  properties: {},
};

export default QdtComponent;
