import React from 'react';
import ReactDOM from 'react-dom';
import { useApp, useLayout, useModel, useElement, useEffect } from '@nebula.js/supernova';

export default ({ component: Component, options }) => ((env) => ({
  qae: {},
  component() {
    const app = useApp();
    const layout = useLayout();
    const model = useModel();
    const element = useElement();
    useEffect(() => {
      ReactDOM.render(<Component app={app} layout={layout} model={model} options={options} />, element);
      return(() => {
        ReactDOM.unmountComponentAtNode(element);
      })
    }, [app, layout, model, element]);
  }
}));
