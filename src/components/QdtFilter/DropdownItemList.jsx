import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { LuiListItem } from '../QdtLui';

let start = 0;
let end = 0;
let translateY = 0;
// let _qcy = 0;
// let qMatrix = null;

/** Create the DropDown list */
const DropdownItemList = ({
  qData, rowHeight, viewportHeight, select, qcy, offset,
}) => {
  const [updating, setUpdating] = useState(false);
  const node = useRef(null);

  const handleScroll = (event) => {
    const { scrollTop } = event.target;
    const numOfViewportItems = viewportHeight / rowHeight;
    start = scrollTop / rowHeight;
    end = start + numOfViewportItems;
    translateY = rowHeight * start;

    if (qData.qArea.qTop > start) {
      const qTop = Math.max(0, (start - qData.qArea.qHeight) + numOfViewportItems);
      offset(qTop);
    } else if (qData.qArea.qTop + qData.qArea.qHeight < end) {
      const qTop = start;
      offset(qTop);
    }
    setUpdating(false);
  };

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
      onScroll={handleScroll}
    >
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          width: '100%',
          maxHeight: '100%',
          // overflow: 'hidden',
          position: 'absolute',
        }}
      >
        {!updating
        && (
        <span>
          {qData.qMatrix.map((row) => (
            <LuiListItem
              className={`${row[0].qState}`}
              key={row[0].qElemNumber}
              data-q-elem-number={row[0].qElemNumber}
              data-q-state={row[0].qState}
              data-q-text={row[0].qText}
              onClick={select}
              style={{
                height: `${rowHeight - 1}px`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {row[0].qText}
            </LuiListItem>
          ))}
        </span>
        )}
      </div>
      <div style={{ height: `${rowHeight * qcy}px` }} />
    </div>
  );
};

DropdownItemList.propTypes = {
  qData: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  offset: PropTypes.func.isRequired,
  qcy: PropTypes.number.isRequired,
  rowHeight: PropTypes.number,
  viewportHeight: PropTypes.number,
};

DropdownItemList.defaultProps = {
  rowHeight: 40,
  viewportHeight: 200,
};

export default DropdownItemList;
