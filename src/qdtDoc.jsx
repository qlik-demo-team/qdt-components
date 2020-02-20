import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Light } from './themes/Themes';

export default (element, layout, model) => (Component, options) => {
  const theme = (options.theme) ? createMuiTheme(options.theme) : createMuiTheme(Light);
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component layout={layout} model={model} options={options} />
    </ThemeProvider>, element,
  );
};
