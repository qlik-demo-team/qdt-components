import React from 'react';  //eslint-disable-line
import ReactDOM from 'react-dom';  //eslint-disable-line
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Light } from './themes/Themes';

// TODO: Support turning components into extensions
// TODO: Return an object containing the current app, layout, model, element, and instance of component

export default (supernova) => (Component, options) => ((/* env */) => ({
  component() {
    const app = supernova.useApp();
    const layout = supernova.useLayout();
    const model = supernova.useModel();
    const element = supernova.useElement();
    const theme = createMuiTheme(Light);
    supernova.useEffect(() => {
      ReactDOM.render(
        <ThemeProvider theme={theme}>
          <Component app={app} layout={layout} model={model} options={options} />
        </ThemeProvider>, element,
      );
    }, [app, layout, model, element]);
    supernova.useEffect(() => () => ReactDOM.unmountComponentAtNode(element), []);
  },
}));
