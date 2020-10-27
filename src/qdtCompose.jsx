/**
 * @param {object} element
 * @param {object} theme
 * @param {object} component
 * @param {object} options
 * @param {object} app
 * @param {object} model
 * @param {object} layout
 * @param {object} properties
 * @param {object} loading
 * @param {object} onLayoutChange
 * @return {object}
 */

import React from 'react';  //eslint-disable-line
import ReactDOM from 'react-dom'; //eslint-disable-line
import { CssBaseline } from '@material-ui/core'; //eslint-disable-line
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; //eslint-disable-line
import { Light as defaultTheme } from 'themes';
import QdtComponent from './components/QdtComponent/QdtComponent';
import QdtExtension from './components/QdtExtension/QdtExtension';

export default ({
  element,
  theme: themeProp,
  component: componentProp,
  options: optionsProp,
  app: appProp,
  model: modelProp,
  layout: layoutProp,
  properties: propertiesProp,
  loading: loadingProp,
  onLayoutChange: onLayoutChangeProp,
}) => {
  let theme = (themeProp) ? createMuiTheme(themeProp) : createMuiTheme(defaultTheme);
  let Component = componentProp;
  let options = optionsProp;
  let app = appProp;
  const model = modelProp;
  const layout = layoutProp;
  let properties = propertiesProp;
  let LoadingComponent = loadingProp;
  let onLayoutChange = onLayoutChangeProp;
  const ref = { componentRef: React.createRef(), modelRef: React.createRef(), layoutRef: React.createRef() };
  ReactDOM.unmountComponentAtNode(element);
  if (!app && model && layout) {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QdtExtension
          Component={Component}
          options={options}
          model={model}
          layout={layout}
          LoadingComponent={LoadingComponent}
          ref={ref}
        />
      </ThemeProvider>,
      element,
    );
  } else {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QdtComponent
          Component={Component}
          options={options}
          app={app}
          properties={properties}
          LoadingComponent={LoadingComponent}
          onLayoutChange={onLayoutChange}
          ref={ref}
        />
      </ThemeProvider>,
      element,
    );
  }
  const update = ({
    theme: updatedThemeProp,
    component: updatedComponentProp,
    options: updatedOptionsProp,
    app: updatedAppProp,
    properties: updatedPropertiesProp,
    loading: updatedLoadingProp,
    onLayoutChange: updatedOnLayoutChangeProp,
  }) => {
    theme = (updatedThemeProp) ? createMuiTheme(updatedThemeProp) : createMuiTheme(defaultTheme);
    Component = updatedComponentProp || Component;
    options = updatedOptionsProp || options;
    app = updatedAppProp || app;
    properties = updatedPropertiesProp || properties;
    LoadingComponent = updatedLoadingProp || LoadingComponent;
    onLayoutChange = updatedOnLayoutChangeProp || onLayoutChange;
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QdtComponent
          Component={Component}
          options={options}
          app={app}
          properties={properties}
          LoadingComponent={LoadingComponent}
          onLayoutChange={onLayoutChange}
          ref={ref}
        />
      </ThemeProvider>,
      element,
    );
  };
  const clear = () => {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QdtComponent
          Component={() => null}
          options={{}}
          app={app}
          properties={{}}
          LoadingComponent={LoadingComponent}
          onLayoutChange={null}
          ref={ref}
        />
      </ThemeProvider>,
      element,
    );
  };
  const destroy = () => {
    ReactDOM.unmountComponentAtNode(element);
  };
  return {
    element, theme, update, clear, destroy, componentRef: ref.componentRef, modelRef: ref.modelRef, layoutRef: ref.layoutRef,
  };
};
