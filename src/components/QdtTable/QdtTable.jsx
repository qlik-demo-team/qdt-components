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
  qDocPromise, cols, qPage, style, minRows, showPageSizeOptions, disableSelections,
}) => {
  const {
    qLayout, qData, changePage, select, applyPatches, //eslint-disable-line
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

  // loading
  const [loading, setLoading] = useState(true);  //eslint-disable-line
  useEffect(() => {
    if (qData) setLoading(false);
  }, [qData]);

  // page size
  const [pageSize, setPageSize] = useState(qPage.qHeight);

  // page
  const [page, _setPage] = useState(0);
  const setPage = useCallback((_page) => {
    setLoading(true);
    _setPage(_page);
    changePage({ qTop: _page * pageSize });
  }, [changePage, pageSize]);
  window.setPage = setPage;

  // pages
  const [pages, _setPages] = useState(0);
  const setPages = useCallback((_pages) => {
    if (page >= _pages) {
      setPage(0);
    }
    _setPages(_pages);
  }, [page, setPage]);
  useEffect(() => {
    if (!qLayout) return;
    setPages(Math.ceil(qLayout.qHyperCube.qSize.qcy / pageSize));
  }, [qLayout, pageSize, setPage, setPages]);

  const handlePageChange = useCallback((pageIndex) => { setPage(pageIndex); }, [setPage]);
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
  }, [applyPatches, qLayout, setPage]);
  const handlePageSizeChange = useCallback((_pageSize) => {  //eslint-disable-line
    setPageSize(_pageSize);
    changePage({ qHeight: _pageSize, qTop: page * _pageSize });
  }, [changePage, page]);

  return (
    <div>
      <ReactTable
        manual
        data={qData ? qData.qMatrix : []}
        columns={columns}
        pages={pages}
        page={page}
        loading={loading}
        showPageJump={false}
        onPageChange={handlePageChange}
        onSortedChange={handleSortedChange}
        defaultPageSize={pageSize}
        minRows={minRows}
        showPageSizeOptions={showPageSizeOptions}
        onPageSizeChange={handlePageSizeChange}
        multiSort={false}
        className="-striped"
        style={style}
        getTdProps={(_, rowInfo, column) => ({
          onClick: (e, handleOriginal) => {
            if (!disableSelections && (column && rowInfo) && column.qPath.includes('qDimensions') && rowInfo.original[column.qInterColumnIndex].qstate !== 'L') {
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
  disableSelections: PropTypes.bool,
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
  disableSelections: false,
};

export default QdtTable;
