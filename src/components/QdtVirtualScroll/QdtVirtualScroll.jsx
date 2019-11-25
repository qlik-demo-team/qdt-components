import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

let start = 0;
let end = 0;
let translateY = 0;
let _qcy = 0;
let qMatrix = null;

const QdtVirtualScroll = (props) => {
  const [updating, setUpdating] = useState(false);
  const node = useRef(null);
  const {
    viewportHeight, rowHeight, qcy, qData, offset, Component, componentProps,
  } = props;

  end = viewportHeight / rowHeight;

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

  useEffect(() => {
    if (_qcy !== qcy) {
      node.current.scrollTop = 0;
      _qcy = qcy;
    }
    qMatrix = qData.qMatrix.slice(start - qData.qArea.qTop, end - qData.qArea.qTop);
  }, [qData, qcy]);

  return (
    <div
      ref={node}
      style={{
        position: 'relative',
        height: `${viewportHeight}px`,
        overflowY: 'auto',
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
            && <Component {...componentProps} qMatrix={qMatrix} rowHeight={rowHeight} />}
      </div>
      <div style={{ height: `${rowHeight * qcy}px` }} />
    </div>
  );
};

QdtVirtualScroll.propTypes = {
  qData: PropTypes.object.isRequired,
  qcy: PropTypes.number.isRequired,
  Component: PropTypes.func.isRequired,
  componentProps: PropTypes.object,
  offset: PropTypes.func.isRequired,
  rowHeight: PropTypes.number,
  viewportHeight: PropTypes.number,
};

QdtVirtualScroll.defaultProps = {
  componentProps: {},
  rowHeight: 40,
  viewportHeight: 200,
};

export default QdtVirtualScroll;
