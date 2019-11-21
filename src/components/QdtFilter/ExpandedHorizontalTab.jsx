import React from 'react';
import PropTypes from 'prop-types';
import { LuiTab } from '../QdtLui';

/** Create the Tabs */
const ExpandedHorizontalTab = ({ qData, select, expandedHorizontalSense }) => {
  console.log(qData);
  const element = qData.qMatrix.map((row) => {
    let className = (expandedHorizontalSense) ? `${row[0].qState}` : '';
    if (!expandedHorizontalSense && row[0].qState === 'S') className += ' lui-active';
    return (
      <LuiTab
        className={className}
        key={row[0].qElemNumber}
        data-q-elem-number={row[0].qElemNumber}
        data-q-state={row[0].qState}
        onClick={select}
      >
        {row[0].qText}
      </LuiTab>
    );
  });
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      {element}
    </div>
  );
};

ExpandedHorizontalTab.propTypes = {
  qData: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  expandedHorizontalSense: PropTypes.bool.isRequired,
};

export default ExpandedHorizontalTab;
