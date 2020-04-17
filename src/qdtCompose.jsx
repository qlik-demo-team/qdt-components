import React from 'react';  //eslint-disable-line
import ReactDOM from 'react-dom'; //eslint-disable-line
import { CssBaseline } from '@material-ui/core'; //eslint-disable-line
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; //eslint-disable-line
import { Light as defaultTheme } from 'themes';
import QdtComponent from './components/QdtComponent/QdtComponent';

export default ({
  element, theme: themeProp,
  component: componentProp, options: optionsProp,
  app: appProp, properties: propertiesProp,
  loading: loadingProp,
}) => {
  let theme = (themeProp) ? createMuiTheme(themeProp) : createMuiTheme(defaultTheme);
  let Component = componentProp;
  let options = optionsProp;
  let app = appProp;
  let properties = propertiesProp;
  let LoadingComponent = loadingProp;
  const ref = { componentRef: React.createRef(), modelRef: React.createRef(), layoutRef: React.createRef() };
  ReactDOM.unmountComponentAtNode(element);
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QdtComponent
        Component={Component}
        options={options}
        app={app}
        properties={properties}
        LoadingComponent={LoadingComponent}
        ref={ref}
      />
    </ThemeProvider>,
    element,
  );
  const update = ({
    theme: updatedThemeProp,
    component: updatedComponentProp,
    options: updatedOptionsProp,
    app: updatedAppProp,
    properties: updatedPropertiesProp,
    loading: updatedLoadingProp,
  }) => {
    theme = (updatedThemeProp) ? createMuiTheme(updatedThemeProp) : createMuiTheme(defaultTheme);
    Component = updatedComponentProp || Component;
    options = updatedOptionsProp || options;
    app = updatedAppProp || app;
    properties = updatedPropertiesProp || properties;
    LoadingComponent = updatedLoadingProp || LoadingComponent;
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QdtComponent
          Component={Component}
          options={options}
          app={app}
          properties={properties}
          LoadingComponent={LoadingComponent}
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
