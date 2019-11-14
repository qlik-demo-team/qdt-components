import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import useHyperCube from '../../hooks/useHyperCube';
import 'react-table/react-table.css';
import '../../styles/index.scss';

// TODO - handle if qInterColumnSortOrder is set, instead of just overriding it
// TODO - set qColumnOrder in useHyperCube so it can be used here.

const QdtTable = ({
  qDocPromise, cols, qPage, style,
}) => {
  const {
    qLayout, qData, offset, select, applyPatches, //eslint-disable-line
  } = useHyperCube({ qDocPromise, cols, qPage });

  // const _select = (e) => {
  //   const { qstate, qElemNumber, index } = e.target.dataset;
  //   if (qstate !== 'L') {
  //     select(Number(index), [Number(qElemNumber)]);
  //   }
  // };

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

  const handlePageChange = (pageIndex) => { offset(pageIndex * qPage.qHeight); };
  const handleSortedChange = async (newSorted, column) => {
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
            qValue: JSON.stringify([{ qSortByLoadOrder: 1 }]),
          },
        ]);
      }
    }
    applyPatches([
      {
        qOp: 'replace',
        qPath: `${column.qPath}/qDef/qReverseSort`,
        qValue: JSON.stringify(newSorted[0].desc !== column.defaultSortDesc ? !column.qReverseSort : !!column.qReverseSort),
      },
      {
        qOp: 'replace',
        qPath: '/qHyperCubeDef/qInterColumnSortOrder',
        qValue: JSON.stringify([column.qInterColumnIndex]),
      },
    ]);
  };

  return (
    <div>
      {/* {console.log(qData, qLayout)} */}
      <ReactTable
        manual
        data={qData ? qData.qMatrix : []}
        columns={columns}
        pages={pages}
        loading={!qData}
        onPageChange={handlePageChange}
        onSortedChange={handleSortedChange}
        defaultPageSize={qPage.qHeight}
        showPageSizeOptions={false}
        multiSort={false}
        className="-striped -highlight"
        style={style}
      />
    </div>
  );
};

QdtTable.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qPage: PropTypes.object,
  style: PropTypes.object,
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
};

export default QdtTable;
