import React from 'react';
import PropTypes from 'prop-types';

/** Create StateCountsBar (the green line below the dropdown) */
const StateCountsBar = ({ totalStateCounts, selections }) => {
  const fillWidth = (selections.length) ? `${(selections.length / totalStateCounts) * 100}%` : '100%';
  const fillStyle = {
    position: 'absolute', width: fillWidth, height: '100%', backgroundColor: '#52CC52', transition: 'width .6s ease',
  };

  return (
    <div className="qdt-filter-state-counts-bar">
      <div style={fillStyle} />
    </div>
  );
};

StateCountsBar.propTypes = {
  totalStateCounts: PropTypes.number.isRequired,
  selections: PropTypes.array.isRequired,
};

export default StateCountsBar;
