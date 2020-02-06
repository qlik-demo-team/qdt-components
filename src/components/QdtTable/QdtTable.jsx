/**
 * @name QdtTable
 * @param {object} layout - Qlik object layout
 * @param {string} model - Qlik object model
 * @param {options} object - Options
*/

import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../../styles/index.scss';

// TODO - set qColumnOrder in useHyperCube so it can be used here.

const QdtTable = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    minRows: undefined,
    pageSize: 10,
    style: { height: '100%' },
  };
  const options = merge(defaultOptions, optionsProp);

  const columns = useMemo(() => (
    layout
      ? [
        ...layout.qHyperCube.qDimensionInfo.map((col, index) => ({
          Header: col.qFallbackTitle,
          accessor: (d) => d[index].qText,
          defaultSortDesc: col.qSortIndicator === 'D',
          id: col.qFallbackTitle,
          qInterColumnIndex: index,
          qPath: `/qHyperCubeDef/qDimensions/${index}`,
          qSortIndicator: col.qSortIndicator,
          qReverseSort: col.qReverseSort,
        })),
        ...layout.qHyperCube.qMeasureInfo.map((col, index) => ({
          Header: col.qFallbackTitle,
          accessor: (d) => d[index + layout.qHyperCube.qDimensionInfo.length].qText,
          defaultSortDesc: col.qSortIndicator === 'D',
          id: col.qFallbackTitle,
          qInterColumnIndex: index + layout.qHyperCube.qDimensionInfo.length,
          qPath: `/qHyperCubeDef/qMeasures/${index}`,
          qSortIndicator: col.qSortIndicator,
          qReverseSort: col.qReverseSort,
        })),
      ]
      : []
  ), [layout]);

  const [loading, setLoading] = useState(true);

  const pages = useMemo(() => (
    layout && Math.ceil(layout.qHyperCube.qSize.qcy / options.pageSize)
  ), [layout, options.pageSize]);

  const [page, setPage] = useState(0);
  useEffect(() => {
    if (page >= pages) {
      setPage(0);
    }
  }, [page, pages]);

  const [data, setData] = useState(null);
  useEffect(() => {
    if (!layout) return;
    (async () => {
      setLoading(true);
      const _data = await model.getHyperCubeData(
        '/qHyperCubeDef',
        [{ qWidth: layout.qHyperCube.qSize.qcx, qHeight: options.pageSize, qTop: options.pageSize * page }],
      );
      setData(_data);
      setLoading(false);
    })();
  }, [layout, model, options.pageSize, page]);

  const handlePageChange = useCallback((pageIndex) => { setPage(pageIndex); }, []);
  const handleSortedChange = useCallback(async (newSorted, column) => {
    // If no sort is set, we need to set a default sort order
    if (column.qSortIndicator === 'N') {
      if (column.qPath.includes('qDimensions')) {
        await model.applyPatches([
          {
            qOp: 'add',
            qPath: `${column.qPath}/qDef/qSortCriterias`,
            qValue: JSON.stringify([{ qSortByLoadOrder: 1 }]),
          },
        ]);
      }
      if (column.qPath.includes('qMeasures')) {
        await model.applyPatches([
          {
            qOp: 'add',
            qPath: `${column.qPath}/qSortBy`,
            qValue: JSON.stringify({ qSortByLoadOrder: 1 }),
          },
        ]);
      }
    }
    await model.applyPatches([
      {
        qOp: 'replace',
        qPath: `${column.qPath}/qDef/qReverseSort`,
        qValue: JSON.stringify((newSorted[0].desc !== column.defaultSortDesc) !== !!column.qReverseSort),
      },
      {
        qOp: 'replace',
        qPath: '/qHyperCubeDef/qInterColumnSortOrder',
        qValue: JSON.stringify([...layout.qHyperCube.qEffectiveInterColumnSortOrder].sort((a, b) => (a === column.qInterColumnIndex ? -1 : b === column.qInterColumnIndex ? 1 : 0))), //eslint-disable-line
      },
    ]);
    setPage(0);
  }, [model, layout]);

  return (
    <div>
      <ReactTable
        manual
        data={data ? data.qMatrix : []}
        columns={columns}
        pages={pages}
        page={page}
        loading={loading}
        onPageChange={handlePageChange}
        onSortedChange={handleSortedChange}
        defaultPageSize={options.pageSize}
        minRows={options.minRows}
        showPageSizeOptions={false}
        multiSort={false}
        className="-striped"
        style={options.style}
        getTdProps={(_, rowInfo, column) => ({
          onClick: (e, handleOriginal) => {
            if ((column && rowInfo) && column.qPath.includes('qDimensions') && rowInfo.original[column.qInterColumnIndex].qstate !== 'L') {
              model.selectHyperCubeValues(
                '/qHyperCubeDef',
                column.qInterColumnIndex,
                [rowInfo.original[column.qInterColumnIndex].qElemNumber],
                true,
              );
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
  layout: PropTypes.object,
  model: PropTypes.object,
  options: PropTypes.object,
};
QdtTable.defaultProps = {
  layout: null,
  model: null,
  options: {},
};

export default QdtTable;
