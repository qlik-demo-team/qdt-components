import React from 'react';
import ReactDOM from 'react-dom';

export default ({ component: Component, options }) => ((env) => ({
  qae: {},
  component: {
    created() {
      console.log('created', env); //eslint-disable-line
    },
    render({ layout, model, element }) {
      ReactDOM.render(<Component layout={layout} model={model} options={options} />, element);
    },
  },
}));
