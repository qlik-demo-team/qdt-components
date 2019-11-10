import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useHyperCube from '../../hooks/useHyperCube';
import QdtVirtualScroll from '../QdtVirtualScroll/QdtVirtualScroll';
import TableHead from './TableHead';
import TableBody from './TableBody';
import '../../styles/index.scss';

let columnWidth = null;
let labels = null;

const QdtTable = ({
  qDocPromise, cols, qPage, height, rowHeight,
}) => {
  const [sortColumn, setSortColumn] = useState(0);
  const node = useRef(null);
  const {
    qLayout, qData, offset, select, applyPatches,
  } = useHyperCube({ qDocPromise, cols, qPage });

  if (qLayout) {
    columnWidth = 100 / qLayout.qHyperCube.qSize.qcx;
    labels = [
      ...qLayout.qHyperCube.qDimensionInfo.map((dim) => dim.qFallbackTitle),
      ...qLayout.qHyperCube.qMeasureInfo.map((measure) => measure.qFallbackTitle),
    ];
  }

  const _setSortColumn = async (event) => {
    const index = Number(event.target.dataset.index);
    await applyPatches([{
      qOp: 'replace',
      qPath: '/qHyperCubeDef/qInterColumnSortOrder',
      qValue: JSON.stringify([index]),
    }]);
    setSortColumn(index);
  };

  const _select = (e) => {
    const { qstate, qElemNumber, index } = e.target.dataset;
    if (qstate !== 'L') {
      select(Number(index), [Number(qElemNumber)]);
    }
  };

  const resize = () => {
    const thead = node.current.getElementsByTagName('thead')[0];
    const tbody = node.current.getElementsByTagName('tbody')[0];
    thead.style.width = `${tbody.clientWidth}px`;
  };

  useEffect(() => {
    if (qData) resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qData]);

  return (
    <div ref={node}>
      { qData
        && (
        <TableHead
          columnWidth={columnWidth}
          labels={labels}
          sortColumn={sortColumn}
          setSortColumn={_setSortColumn}
        />
        )}
      { qData
        && (
        <QdtVirtualScroll
          qData={qData}
          qcy={qLayout.qHyperCube.qSize.qcy}
          Component={TableBody}
          componentProps={{ qData, columnWidth, select: _select }}
          offset={offset}
          rowHeight={rowHeight}
          viewportHeight={height}
        />
        )}
    </div>
  );
};

// QdtTableComponent.propTypes = {
//   qData: PropTypes.object.isRequired,
//   qLayout: PropTypes.object.isRequired,
//   offset: PropTypes.func.isRequired,
//   select: PropTypes.func.isRequired,
//   applyPatches: PropTypes.func.isRequired,
//   height: PropTypes.number.isRequired,
//   rowHeight: PropTypes.number.isRequired,
// };

// const QdtTable = withHyperCube(QdtTableComponent);
QdtTable.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qPage: PropTypes.object,
  // width: PropTypes.string,
  height: PropTypes.number,
  rowHeight: PropTypes.number,
};
QdtTable.defaultProps = {
  cols: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 10,
    qHeight: 100,
  },
  // width: '100%',
  height: 400,
  rowHeight: 50,
};

export default QdtTable;
