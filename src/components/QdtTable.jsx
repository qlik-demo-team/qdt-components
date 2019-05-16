import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import withHyperCube from './withHyperCube';
import QdtVirtualScroll from './QdtVirtualScroll';
import '../styles/index.scss';

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

const TableBody = ({
  qMatrix, rowHeight, columnWidth, select,
}) => (
  <table className="qtd-table-body">
    <tbody>
      {qMatrix.map(row => (
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
  qMatrix: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired,
  columnWidth: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired,
};

class QdtTableComponent extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    offset: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    applyPatches: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      sortColumn: 0,
    };
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentDidUpdate() {
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  @autobind
  async setSortColumn(event) {
    const index = Number(event.target.dataset.index);
    const { applyPatches } = this.props;
    await applyPatches([{
      qOp: 'replace',
      qPath: '/qHyperCubeDef/qInterColumnSortOrder',
      qValue: JSON.stringify([index]),
    }]);
    this.setState({ sortColumn: index });
  }

  @autobind
  select(e) {
    const { qstate, qElemNumber, index } = e.target.dataset;
    const { select } = this.props;
    if (qstate !== 'L') {
      select(Number(index), [Number(qElemNumber)]);
    }
  }

  @autobind
  resize() {
    const thead = this.node.getElementsByTagName('thead')[0];
    const tbody = this.node.getElementsByTagName('tbody')[0];
    thead.style.width = `${tbody.clientWidth}px`;
  }

  render() {
    const { select, setSortColumn } = this;
    const {
      qData, qLayout, offset, height, rowHeight,
    } = this.props;
    const columnWidth = 100 / qLayout.qHyperCube.qSize.qcx;
    const { sortColumn } = this.state;
    const labels = [
      ...qLayout.qHyperCube.qDimensionInfo.map(dim => dim.qFallbackTitle),
      ...qLayout.qHyperCube.qMeasureInfo.map(measure => measure.qFallbackTitle),
    ];
    return (
      <div ref={(node) => { this.node = node; }}>
        <TableHead
          columnWidth={columnWidth}
          labels={labels}
          sortColumn={sortColumn}
          setSortColumn={setSortColumn}
        />
        <QdtVirtualScroll
          qData={qData}
          qcy={qLayout.qHyperCube.qSize.qcy}
          Component={TableBody}
          componentProps={{ columnWidth, select }}
          offset={offset}
          rowHeight={rowHeight}
          viewportHeight={height}
        />
      </div>
    );
  }
}

const QdtTable = withHyperCube(QdtTableComponent);
QdtTable.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qHyperCubeDef: PropTypes.object,
  qPage: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.number,
  rowHeight: PropTypes.number,
};
QdtTable.defaultProps = {
  cols: null,
  qHyperCubeDef: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 10,
    qHeight: 100,
  },
  width: '100%',
  height: 400,
  rowHeight: 50,
};

export default QdtTable;
