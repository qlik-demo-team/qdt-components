import React from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import styles from './QdtModalStyles';

const QdtModal = ({
  open, header, body, footer, handleClose,
}) => {
  const theme = useTheme();
  const style = styles(theme);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="QdtModal"
        aria-describedby="QdtModal"
      >
        <div style={style.modalContainer}>
          {header && (
          <div style={style.modalHeader}>
            { header }
          </div>
          ) }
          { body && (
          <div style={style.modalBody}>
            { body }
          </div>
          ) }
          { footer && (
          <div style={style.modalFooter}>
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
