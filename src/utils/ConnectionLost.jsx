import React from 'react';  //eslint-disable-line
import ReactDOM from 'react-dom'; //eslint-disable-line
import ErrorModal from './QdtModal';

export default () => {
  const element = document.createElement('div');
  ReactDOM.unmountComponentAtNode(element);
  ReactDOM.render(
    <ErrorModal open />,
    element,
  );
};
