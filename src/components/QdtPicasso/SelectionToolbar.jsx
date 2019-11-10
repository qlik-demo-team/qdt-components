import React from 'react';
import PropTypes from 'prop-types';

const SelectionToolbar = ({ cancelSelections, confirmSelections }) => (
  <div style={{ position: 'absolute', top: '-2rem', right: 0 }}>
    <button type="button" className="lui-button lui-button--danger" style={{ marginRight: '1rem' }} onClick={cancelSelections}>
      <span className="lui-icon lui-icon--close" />
    </button>
    <button type="button" className="lui-button lui-button--success" style={{ marginRight: '1rem' }} onClick={confirmSelections}>
      <span className="lui-icon lui-icon--tick" />
    </button>
  </div>
);

SelectionToolbar.propTypes = {
  cancelSelections: PropTypes.func.isRequired,
  confirmSelections: PropTypes.func.isRequired,
};

export default SelectionToolbar;
