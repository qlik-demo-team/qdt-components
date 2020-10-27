import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

const styles = {
  root: {
    position: 'absolute',
    top: -40,
    // right: 0,
    width: '100%',
    textAlign: 'right',
    padding: 5,
  },
  rootOpen: {
    position: 'absolute',
    top: -40,
    width: '100%',
    borderTop: '1px solid #CCCCCC',
    borderLeft: '1px solid #CCCCCC',
    borderRight: '1px solid #CCCCCC',
    textAlign: 'right',
    padding: 5,
  },
  cancelButton: {
    color: '#FFFFFF',
    backgroundColor: '#dc423f',
    border: 0,
    padding: '5px 15px',
    borderRadius: 3,
    marginRight: 10,
  },
  confirmButton: {
    color: '#FFFFFF',
    backgroundColor: '#009845',
    border: 0,
    padding: '5px 15px',
    borderRadius: 3,
  },
};

const QdtSelectionModal = ({
  isOpen, onCancelSelections, onConfirmSelections,
}) => (
  <div style={(isOpen) ? styles.rootOpen : styles.root}>
    { isOpen
        && (
        <div>
          <IconButton style={styles.cancelButton} size="small" onClick={onCancelSelections}>
            <ClearIcon fontSize="inherit" />
          </IconButton>
          <IconButton style={styles.confirmButton} size="small" onClick={onConfirmSelections}>
            <CheckIcon fontSize="inherit" />
          </IconButton>
        </div>
        )}
  </div>
);

QdtSelectionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancelSelections: PropTypes.func.isRequired,
  onConfirmSelections: PropTypes.func.isRequired,
};

QdtSelectionModal.defaultProps = {
};

export default QdtSelectionModal;
