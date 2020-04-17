import React from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { useStyles } from './QdtModalStyles';

/* className={classes.paper} */
const QdtModal = ({
  open, header, body, footer, handleClose,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="QdtModal"
        aria-describedby="QdtModal"
      >
        <div className={classes.paper}>
          {header && (
          <div className={classes.header}>
            { header }
          </div>
          ) }
          { body && (
          <div className={classes.body}>
            { body }
          </div>
          ) }
          { footer && (
          <div className={classes.footer}>
            { footer }
          </div>
          ) }
        </div>
      </Modal>
    </div>
  );
};

QdtModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  header: PropTypes.string,
  body: PropTypes.string,
  footer: PropTypes.string,
};
QdtModal.defaultProps = {
  handleClose: null,
  header: null,
  body: null,
  footer: null,
};

export default QdtModal;
