import React from 'react';  //eslint-disable-line
import ReactDOM from 'react-dom';  //eslint-disable-line

// TODO: Support turning components into extensions
// TODO: Return an object containing the current app, layout, model, element, and instance of component

export default (supernova) => (Component, options) => ((/* env */) => ({
  component() {
    const app = supernova.useApp();
    const layout = supernova.useLayout();
    const model = supernova.useModel();
    const element = supernova.useElement();
    supernova.useEffect(() => {
      ReactDOM.render(<Component app={app} layout={layout} model={model} options={options} />, element);
    }, [app, layout, model, element]);
    supernova.useEffect(() => () => ReactDOM.unmountComponentAtNode(element), []);
  },
}));
