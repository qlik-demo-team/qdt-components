import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { LuiDropdown, LuiList, LuiListItem, LuiSearch } from 'qdt-lui';
import withListObject from './withListObject';
import QdtVirtualScroll from './QdtVirtualScroll';
import '../styles/index.scss';

const DropdownItemList = ({ qMatrix, rowHeight, select }) => (
  <span>
    {qMatrix.map(row =>
      (
        <LuiListItem
          className={`${row[0].qState}`}
          key={row[0].qElemNumber}
          data-q-elem-number={row[0].qElemNumber}
          onClick={select}
          style={{ height: `${rowHeight}px` }}
        >
          {row[0].qText}
        </LuiListItem>
      ))}
  </span>
);

DropdownItemList.propTypes = {
  qMatrix: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired,
};

const StateCountsBar = ({ qStateCounts }) => {
  const totalStateCounts = Object.values(qStateCounts).reduce((a, b) => a + b);
  const fillWidth = `${((qStateCounts.qOption + qStateCounts.qSelected) * 100) / totalStateCounts}%`;
  const barStyle = { position: 'relative', height: '0.25rem', backgroundColor: '#ddd' };
  const fillStyle = {
    position: 'absolute', width: fillWidth, height: '100%', backgroundColor: '#52CC52', transition: 'width .6s ease',
  };
  return (
    <div style={barStyle}>
      <div style={fillStyle} />
    </div>
  );
};
StateCountsBar.propTypes = {
  qStateCounts: PropTypes.object.isRequired,
};

class QdtFilterComponent extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    offset: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    beginSelections: PropTypes.func.isRequired,
    endSelections: PropTypes.func.isRequired,
    searchListObjectFor: PropTypes.func.isRequired,
    acceptListObjectSearch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      searchListInputValue: '',
    };
  }

  @autobind
  toggle() {
    this.props.offset(0);

    if (!this.state.dropdownOpen) {
      this.props.beginSelections();
    }
    if (this.state.dropdownOpen) {
      this.props.endSelections(true);
    }

    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  @autobind
  select(event) {
    this.props.select(Number(event.currentTarget.dataset.qElemNumber));
  }

  @autobind
  clear() {
    this.setState({ searchListInputValue: '' });
  }

  @autobind
  searchListObjectFor(event) {
    this.setState({ searchListInputValue: event.target.value });
    this.props.searchListObjectFor(event.target.value);
  }

  @autobind
  acceptListObjectSearch(event) {
    if (event.charCode === 13) {
      this.setState({ searchListInputValue: '' });
      this.props.acceptListObjectSearch();
    }
  }

  render() {
    const {
      select, toggle, searchListObjectFor, acceptListObjectSearch,
    } = this;
    const { qData, qLayout, offset } = this.props;
    const { dropdownOpen, searchListInputValue } = this.state;
    return (
      <LuiDropdown isOpen={dropdownOpen} toggle={toggle}>
        Dropdown
        <LuiList style={{ width: '15rem' }}>
          <LuiSearch
            value={searchListInputValue}
            clear={this.clear}
            onChange={searchListObjectFor}
            onKeyPress={acceptListObjectSearch}
          />
          <QdtVirtualScroll
            qData={qData}
            qcy={qLayout.qListObject.qSize.qcy}
            Component={DropdownItemList}
            componentProps={{ select }}
            offset={offset}
            rowHeight={37}
            viewportHeight={190}
          />
        </LuiList>
        <StateCountsBar qStateCounts={qLayout.qListObject.qDimensionInfo.qStateCounts} />
      </LuiDropdown>
    );
  }
}

const QdtFilter = withListObject(QdtFilterComponent);
QdtFilter.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qListObjectDef: PropTypes.object,
  qPage: PropTypes.object,
};
QdtFilter.defaultProps = {
  cols: null,
  qListObjectDef: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 100,
  },
};

export default QdtFilter;
