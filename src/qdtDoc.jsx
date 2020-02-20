import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import QdtTheme from './themes/Themes';

export default (element, layout, model) => (Component, options) => {
  const theme = (options.theme) ? createMuiTheme(options.theme) : createMuiTheme(QdtTheme.Light);
  console.log(221, element, layout, model, Component, options);
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Component layout={layout} model={model} options={options} />
    </ThemeProvider>, element,
  );
};
