import React from 'react';
import PropTypes from 'prop-types';

const QdtExtension = React.forwardRef(({
  Component, options, model, layout, LoadingComponent,
}, { componentRef, modelRef, layoutRef }) => {
  modelRef.current = model;  //eslint-disable-line
  layoutRef.current = layout;  //eslint-disable-line
  return (
    <>
      {(!layout && !LoadingComponent) && <div>Loading...</div>}
      {(!layout && LoadingComponent) && <LoadingComponent />}
      {layout && (
        <Component ref={componentRef} model={model} layout={layout} options={options} />
      )}
    </>
  );
});

// const QdtExtension = React.forwardRef((_a, _b) => {
//   const { Component } = _a;
//   const { options } = _a;
//   const { model } = _a;
//   const { layout } = _a;
//   const { LoadingComponent } = _a;
//   const { componentRef } = _b;
//   const { modelRef } = _b;
//   const { layoutRef } = _b;
//     modelRef.current = model; //eslint-disable-line
//     layoutRef.current = layout; //eslint-disable-line
//   return (React.createElement(React.Fragment, null,
//     (!layout && !LoadingComponent) && React.createElement('div', null, 'Loading...'),
//     (!layout && LoadingComponent) && React.createElement(LoadingComponent, null),
//     layout && (React.createElement(Component, {
//       ref: componentRef, model, layout, options,
//     }))));
// });
QdtExtension.displayName = 'QdtExtension'; // Avoid eslint react/display-name
QdtExtension.propTypes = {
  Component: PropTypes.func.isRequired,
  options: PropTypes.object,
  model: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  LoadingComponent: PropTypes.func,
};
QdtExtension.defaultProps = {
  options: {},
  LoadingComponent: null,
};
export default QdtExtension;
