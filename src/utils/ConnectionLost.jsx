import React from 'react';  //eslint-disable-line
import ReactDOM from 'react-dom'; //eslint-disable-line
import Button from '@material-ui/core/Button';
import ErrorModal from '../components/QdtModal';

export default ({ refreshUrl, timeoutMessage }) => {
  const element = document.createElement('div');
  const header = 'Connection lost';
  const body = (timeoutMessage) || 'Your connection to the Qlik Sense server is lost due to inactivity, refresh to continue working.';
  const refresh = () => ((refreshUrl) ? window.location = refreshUrl : window.location.reload());
  const footer = <Button variant="contained" onClick={refresh}>Refresh</Button>;
  ReactDOM.unmountComponentAtNode(element);
  ReactDOM.render(
    <ErrorModal
      open
      header={header}
      body={body}
      footer={footer}
    />,
    element,
  );
};
