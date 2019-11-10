import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({
  qData, rowHeight, columnWidth, select,
}) => (
  <table className="qtd-table-body">
    <tbody>
      {qData.qMatrix.map((row) => (
        <tr
          key={row.slice(0, 2).reduce((a, b) => (
            a.qElemNumber.toString().concat(b.qElemNumber.toString())))}
        >
          {row.map((col, i) => (
            <td
              key={col.qText}
              style={{ height: `${rowHeight}px`, width: `${columnWidth}%` }}
              data-q-elem-number={col.qElemNumber}
              data-index={i}
              data-qstate={col.qState}
              onClick={select}
            >
              {col.qText}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

TableBody.propTypes = {
  qData: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired,
  columnWidth: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired,
};

export default TableBody;
