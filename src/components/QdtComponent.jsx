import React from 'react';
import ReactDOM from 'react-dom';

export default class QdtComponent {
  static render(Component, props, element) {
    return new Promise((resolve, reject) => {
      try {
        ReactDOM.render(<Component {...props} ref={node => resolve(node)} />, element);
      } catch (error) {
        reject(error);
      }
    });
  }
}
