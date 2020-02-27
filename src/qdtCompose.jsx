import React from 'react';  //eslint-disable-line
import ReactDOM from 'react-dom'; //eslint-disable-line
import { CssBaseline } from '@material-ui/core'; //eslint-disable-line
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; //eslint-disable-line
import { Light as defaultTheme } from './themes/Themes'; //eslint-disable-line
import QdtComponent from './components/QdtComponent/QdtComponent';

export default ({
  element, theme: themeProp, component: Component, options, app, properties, loading: LoadingComponent,
}) => {
  const ref = { componentRef: React.createRef(), modelRef: React.createRef(), layoutRef: React.createRef() };
  const theme = (themeProp) ? createMuiTheme(themeProp) : createMuiTheme(defaultTheme);
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
    component: updatedComponent,
    options: updatedOptions,
    app: updatedApp,
    properties: updatedProperties,
  }) => {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QdtComponent
          Component={updatedComponent}
          options={updatedOptions}
          app={updatedApp}
          properties={updatedProperties}
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
          ref={ref}
        />
      </ThemeProvider>,
      element,
    );
  };
  const destroy = () => {
    ReactDOM.unmountComponentAtNode(element);
  };
  console.log(ref.modelRef, ref.layoutRef);
  return {
    element, theme, update, clear, destroy, componentRef: ref.componentRef, modelRef: ref.modelRef, layoutRef: ref.layoutRef,
  };
};
