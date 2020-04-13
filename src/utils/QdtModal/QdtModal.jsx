import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { useStyles } from './QdtModalStyles';

/* className={classes.paper} */
const QdtModal = ({ open, handleClose }) => {
  const classes = useStyles();

  const refresh = () => window.location.reload();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="QdtModal"
        aria-describedby="QdtModal"
      >
        <div className={classes.paper}>
          <div className={classes.header}>
            An error occurred
          </div>
          <div className={classes.body}>
            Connection lost. Make sure that Qlik Sense is running properly. If your session has timed out due to inactivity, refresh to continue working.
          </div>
          <div className={classes.footer}>
            <Button variant="contained" onClick={refresh}>Refresh</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

QdtModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};
QdtModal.defaultProps = {
  handleClose: null,
};

export default QdtModal;
