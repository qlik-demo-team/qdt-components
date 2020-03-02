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
    loading: updatedLoadingComponent,
  }) => {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QdtComponent
          Component={updatedComponent || Component}
          options={updatedOptions || options}
          app={updatedApp || app}
          properties={updatedProperties || properties}
          LoadingComponent={updatedLoadingComponent || LoadingComponent}
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
          properties={properties}
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
<<<<<<< HEAD

=======
>>>>>>> 5ae780d2f146477eb1cc861e1391db70bda161c0
  return {
    element, theme, update, clear, destroy, componentRef: ref.componentRef, modelRef: ref.modelRef, layoutRef: ref.layoutRef,
  };
};
