import React from 'react';
import ReactDOM from 'react-dom';
import {
  useApp, useLayout, useModel, useElement, useEffect,
} from '@nebula.js/supernova';

export default (Component, options) => ((/* env */) => ({
  qae: {},
  component() {
    const app = useApp();  //eslint-disable-line
    const layout = useLayout();  //eslint-disable-line
    const model = useModel();  //eslint-disable-line
    const element = useElement();  //eslint-disable-line
    useEffect(() => {  //eslint-disable-line
      ReactDOM.render(<Component app={app} layout={layout} model={model} options={options} />, element);
      return (() => {
        ReactDOM.unmountComponentAtNode(element);
      });
    }, [app, layout, model, element]);
  },
}));
