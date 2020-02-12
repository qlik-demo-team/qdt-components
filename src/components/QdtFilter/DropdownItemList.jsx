import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { LuiListItem } from '../QdtLui';

/** Create the DropDown list */
const DropdownItemList = ({
  qData, viewportHeight, select, dropdownOpen,
}) => {
  const node = useRef();
  window.node = node.current;
  useEffect(() => {
    node.current.scrollTop = 0;
  }, [dropdownOpen]);
  return (
    <div
      ref={node}
      style={{
        position: 'relative',
        height: `${viewportHeight}px`,
        overflowY: 'auto',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #dee2e6',
        borderLeft: '1px solid #dee2e6',
        borderBottom: '1px solid #dee2e6',
      }}
    >
      {qData.qMatrix.map((row) => (
        <LuiListItem
          className={`${row[0].qState}`}
          key={row[0].qElemNumber}
          data-q-elem-number={row[0].qElemNumber}
          data-q-state={row[0].qState}
          data-q-text={row[0].qText}
          onClick={select}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {row[0].qText}
        </LuiListItem>
      ))}
    </div>
  );
};

DropdownItemList.propTypes = {
  qData: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  // rowHeight: PropTypes.number,
  viewportHeight: PropTypes.number,
  dropdownOpen: PropTypes.bool.isRequired,
};

DropdownItemList.defaultProps = {
  // rowHeight: 40,
  viewportHeight: 200,
};

export default DropdownItemList;
