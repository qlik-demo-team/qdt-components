import React from 'react';
import PropTypes from 'prop-types';
import { LuiListItem } from '../QdtLui';

const DropdownItemList = ({ qData, rowHeight, select }) => (
  <span>
    {qData.qMatrix.map((row) => (
      <LuiListItem
        className={`${row[0].qState}`}
        key={row[0].qElemNumber}
        data-q-elem-number={row[0].qElemNumber}
        data-q-state={row[0].qState}
        onClick={select}
        style={{ height: `${rowHeight - 1}px` }}
      >
        {row[0].qText}
      </LuiListItem>
    ))}
  </span>
);

DropdownItemList.propTypes = {
  qData: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired,
};

export default DropdownItemList;
