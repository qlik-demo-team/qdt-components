import React from 'react';  //eslint-disable-line
import ReactDOM from 'react-dom'; //eslint-disable-line
import { CssBaseline } from '@material-ui/core'; //eslint-disable-line
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; //eslint-disable-line
import { Light as defaultTheme } from './themes/Themes'; //eslint-disable-line
import QdtComponent from './components/QdtComponent/QdtComponent';

export default ({
  element, theme: themeProp, component: Component, options, app, properties,
}) => {
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
        />
      </ThemeProvider>,
      element,
    );
  };
  const destroy = () => {
    ReactDOM.unmountComponentAtNode(element);
  };
  return {
    element, theme, update, destroy,
  };
};
