import React from 'react';
import ReactDOM from 'react-dom';

const render = async (Component, props, element) => new Promise((resolve, reject) => {
  try {
    ReactDOM.render(<Component {...props} ref={node => resolve(node)} />, element);
  } catch (error) {
    reject(error);
  }
});

export default render;
