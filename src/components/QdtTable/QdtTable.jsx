import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import useHyperCube from '../../hooks/useHyperCube';
import 'react-table/react-table.css';
import '../../styles/index.scss';

// TODO - set qColumnOrder in useHyperCube so it can be used here.

const QdtTable = ({
  qDocPromise, cols, qPage, style, minRows, showPageSizeOptions,
}) => {
  const {
    qLayout, qData, offset, select, applyPatches, //eslint-disable-line
  } = useHyperCube({ qDocPromise, cols, qPage });

  const columns = useMemo(() => (
    qLayout
      ? [
        ...qLayout.qHyperCube.qDimensionInfo.map((col, index) => ({
          Header: col.qFallbackTitle,
          accessor: (d) => d[index].qText,
          defaultSortDesc: col.qSortIndicator === 'D',
          id: col.qFallbackTitle,
          qInterColumnIndex: index,
          qPath: `/qHyperCubeDef/qDimensions/${index}`,
          qSortIndicator: col.qSortIndicator,
          qReverseSort: col.qReverseSort,
        })),
        ...qLayout.qHyperCube.qMeasureInfo.map((col, index) => ({
          Header: col.qFallbackTitle,
          accessor: (d) => d[index + qLayout.qHyperCube.qDimensionInfo.length].qText,
          defaultSortDesc: col.qSortIndicator === 'D',
          id: col.qFallbackTitle,
          qInterColumnIndex: index + qLayout.qHyperCube.qDimensionInfo.length,
          qPath: `/qHyperCubeDef/qMeasures/${index}`,
          qSortIndicator: col.qSortIndicator,
          qReverseSort: col.qReverseSort,
        })),
      ]
      : []
  ), [qLayout]);

  const pages = useMemo(() => (qLayout && qPage) && Math.ceil(qLayout.qHyperCube.qSize.qcy / qPage.qHeight), [qLayout, qPage]);

  const [page, setPage] = useState(0);
  useEffect(() => {
    if (page >= pages) {
      setPage(0);
    }
  }, [page, pages]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [qData]);

  const handlePageChange = useCallback((pageIndex) => { setPage(pageIndex); setLoading(true); offset(pageIndex * qPage.qHeight); }, [offset, qPage.qHeight]);
  const handleSortedChange = useCallback(async (newSorted, column) => {
    setLoading(true);
    // If no sort is set, we need to set a default sort order
    if (column.qSortIndicator === 'N') {
      if (column.qPath.includes('qDimensions')) {
        await applyPatches([
          {
            qOp: 'add',
            qPath: `${column.qPath}/qDef/qSortCriterias`,
            qValue: JSON.stringify([{ qSortByLoadOrder: 1 }]),
          },
        ]);
      }
      if (column.qPath.includes('qMeasures')) {
        await applyPatches([
          {
            qOp: 'add',
            qPath: `${column.qPath}/qSortBy`,
            qValue: JSON.stringify({ qSortByLoadOrder: 1 }),
          },
        ]);
      }
    }
    await applyPatches([
      {
        qOp: 'replace',
        qPath: `${column.qPath}/qDef/qReverseSort`,
        qValue: JSON.stringify((newSorted[0].desc !== column.defaultSortDesc) !== !!column.qReverseSort),
      },
      {
        qOp: 'replace',
        qPath: '/qHyperCubeDef/qInterColumnSortOrder',
        qValue: JSON.stringify([...qLayout.qHyperCube.qEffectiveInterColumnSortOrder].sort((a, b) => (a === column.qInterColumnIndex ? -1 : b === column.qInterColumnIndex ? 1 : 0))), //eslint-disable-line
      },
    ]);
    setPage(0);
  }, [applyPatches, qLayout]);

  return (
    <div>
      <ReactTable
        manual
        data={qData ? qData.qMatrix : []}
        columns={columns}
        pages={pages}
        page={page}
        loading={loading}
        onPageChange={handlePageChange}
        onSortedChange={handleSortedChange}
        defaultPageSize={qPage.qHeight}
        minRows={minRows}
        showPageSizeOptions={showPageSizeOptions}
        multiSort={false}
        className="-striped"
        style={style}
        getTdProps={(_, rowInfo, column) => ({
          onClick: (e, handleOriginal) => {
            if ((column && rowInfo) && column.qPath.includes('qDimensions') && rowInfo.original[column.qInterColumnIndex].qstate !== 'L') {
              select(column.qInterColumnIndex, [rowInfo.original[column.qInterColumnIndex].qElemNumber]);
            }
            if (handleOriginal) {
              handleOriginal();
            }
          },
        })}
      />
    </div>
  );
};

QdtTable.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qPage: PropTypes.object,
  style: PropTypes.object,
  minRows: PropTypes.number,
  showPageSizeOptions: PropTypes.bool,
};
QdtTable.defaultProps = {
  cols: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 10,
    qHeight: 20,
  },
  style: { height: '100%' },
  minRows: undefined,
  showPageSizeOptions: false,
};

export default QdtTable;
