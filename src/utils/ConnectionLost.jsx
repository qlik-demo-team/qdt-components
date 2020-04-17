import React from 'react';  //eslint-disable-line
import ReactDOM from 'react-dom'; //eslint-disable-line
import Button from '@material-ui/core/Button';
import ErrorModal from '../components/QdtModal';

export default () => {
  const element = document.createElement('div');
  // const header = 'An error occurred';
  // const body = 'Connection lost. Make sure that Qlik Sense is running properly. If your session has timed out due to inactivity, refresh to continue working.';
  const header = 'Connection lost';
  const body = 'Your connection to the Qlik Sense server is lost due to inactivity, refresh to continue working.';
  const refresh = () => window.location.reload();
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
