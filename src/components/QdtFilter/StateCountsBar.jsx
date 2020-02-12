import React from 'react';
import PropTypes from 'prop-types';

/** Create StateCountsBar (the green line below the dropdown) */
const StateCountsBar = ({ qStateCounts, qcy }) => {
  console.log(qStateCounts, qcy);
  const fillWidth = `${((qStateCounts.qSelected + qStateCounts.qOption) / qcy) * 100}%`;
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
  qStateCounts: PropTypes.object.isRequired,
  qcy: PropTypes.number.isRequired,
};

export default StateCountsBar;
