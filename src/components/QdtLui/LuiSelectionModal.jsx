import React from 'react';
import PropTypes from 'prop-types';

const LuiSelectionModal = ({ cancelSelections, confirmSelections, isOpen }) => (
  <>
    { isOpen
        && (
        <div style={{
          position: 'absolute',
          top: -40,
          right: 0,
          width: '100%',
          borderTop: '1px solid #CCCCCC',
          borderLeft: '1px solid #CCCCCC',
          borderRight: '1px solid #CCCCCC',
          textAlign: 'right',
          padding: 5,
        }}
        >
          <button type="button" className="lui-button lui-button--danger" style={{ marginRight: '1rem' }} onClick={cancelSelections}>
            <span className="lui-icon lui-icon--close" />
          </button>
          <button type="button" className="lui-button lui-button--success" onClick={confirmSelections}>
            <span className="lui-icon lui-icon--tick" />
          </button>
        </div>
        )}
  </>
);

LuiSelectionModal.propTypes = {
  cancelSelections: PropTypes.func.isRequired,
  confirmSelections: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

LuiSelectionModal.defaultProps = {
  isOpen: false,
};

export default LuiSelectionModal;
