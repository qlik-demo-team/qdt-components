import React from 'react';
import PropTypes from 'prop-types';
import useSessionObject from '../../hooks/useSessionObject';

const QdtComponent = React.forwardRef(({
  Component, options, app, properties, LoadingComponent, onLayoutChange,
}, { componentRef, modelRef, layoutRef }) => {
  const { model, layout } = useSessionObject({ app, properties, onLayoutChange });
  modelRef.current = model;  //eslint-disable-line
  layoutRef.current = layout;  //eslint-disable-line
  return (
    <>
      {(!layout && !LoadingComponent) && <div>Loading...</div>}
      {(!layout && LoadingComponent) && <LoadingComponent />}
      {layout && (
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
  onLayoutChange: PropTypes.func,
};
QdtComponent.defaultProps = {
  options: {},
  properties: {},
  LoadingComponent: null,
  onLayoutChange: null,
};

export default QdtComponent;
