import React from 'react';
import PropTypes from 'prop-types';

const TableHead = ({
  columnWidth, labels, sortColumn, setSortColumn,
}) => (
  <table className="qtd-table-header">
    <thead>
      <tr>
        {labels.map((label, index) => (
          <th
            className={index === sortColumn ? 'active' : null}
            style={{ width: `${columnWidth}%` }}
            key={label}
            data-index={index}
            onClick={setSortColumn}
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
  </table>
);

TableHead.propTypes = {
  columnWidth: PropTypes.number.isRequired,
  labels: PropTypes.array.isRequired,
  sortColumn: PropTypes.number.isRequired,
  setSortColumn: PropTypes.func.isRequired,
};

export default TableHead;
