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
        <div className={classes.useStyles}>
          {header && (
          <div className={classes.modalHeader}>
            { header }
          </div>
          ) }
          { body && (
          <div className={classes.modalBody}>
            { body }
          </div>
          ) }
          { footer && (
          <div className={classes.modalFooter}>
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
