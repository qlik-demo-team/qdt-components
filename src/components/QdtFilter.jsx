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
          data-q-state={row[0].qState}
          onClick={select}
          style={{ height: `${rowHeight - 1}px` }}
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
    qObject: PropTypes.object.isRequired,
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    offset: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    beginSelections: PropTypes.func.isRequired,
    endSelections: PropTypes.func.isRequired,
    searchListObjectFor: PropTypes.func.isRequired,
    acceptListObjectSearch: PropTypes.func.isRequired,
    single: PropTypes.bool,
    hideStateCountsBar: PropTypes.bool,
    placeholder: PropTypes.string,
    showStateInDropdown: PropTypes.bool,
    expanded: PropTypes.bool,
  }
  static defaultProps = {
    single: false,
    hideStateCountsBar: false,
    placeholder: 'Dropdown',
    showStateInDropdown: false,
    expanded: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      searchListInputValue: '',
      selections: null,
    };
  }

  componentWillMount() {
    const { showStateInDropdown, qObject } = this.props;
    if (showStateInDropdown) {
      this.getSelections();
      qObject.on('changed', this.getSelections);
    }
  }

  getSelections = async () => {
    const { qObject } = this.props;
    const qDataPages = await qObject.getListObjectData('/qListObjectDef', [{ qWidth: 1, qHeight: 10000 }]);
    const selections = qDataPages[0].qMatrix.filter(row => row[0].qState === 'S');
    this.setState({ selections });
  }

  @autobind
  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen }, () => {
      if (this.state.dropdownOpen) {
        this.props.beginSelections();
      }
      if (!this.state.dropdownOpen) {
        this.props.endSelections(true);
        this.clear();
      }
    });
  }

  @autobind
  select(event) {
    const { qElemNumber, qState } = event.currentTarget.dataset;
    if (qState === 'S') { this.props.select(Number(qElemNumber)); } else { this.props.select(Number(qElemNumber), !this.props.single); }
  }

  @autobind
  clear() {
    this.setState({ searchListInputValue: '' });
    this.props.searchListObjectFor('');
  }

  @autobind
  searchListObjectFor(event) {
    this.setState({ searchListInputValue: event.target.value });
    this.props.offset(0);
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
      qData, qLayout, offset, placeholder, hideStateCountsBar, showStateInDropdown, expanded,
    } = this.props;
    const { dropdownOpen, searchListInputValue, selections } = this.state;
    const { qStateCounts } = qLayout.qListObject.qDimensionInfo;
    const { qSelected } = qStateCounts;
    const totalStateCounts = Object.values(qStateCounts).reduce((a, b) => a + b);
    return (
      <div>
        { !expanded &&
          <LuiDropdown isOpen={dropdownOpen} toggle={this.toggle}>
            <span>
              {!showStateInDropdown && placeholder}
              {(showStateInDropdown && selections && selections.length === 0) && placeholder}
              {(showStateInDropdown && selections && selections.length === 1) && selections[0][0].qText}
              {(showStateInDropdown && selections && selections.length > 1) && `${qSelected} of ${totalStateCounts}`}
            </span>
            <LuiList style={{ width: '15rem' }}>
              <LuiSearch
                value={searchListInputValue}
                clear={this.clear}
                onChange={this.searchListObjectFor}
                onKeyPress={this.acceptListObjectSearch}
              />
              <QdtVirtualScroll
                qData={qData}
                qcy={qLayout.qListObject.qSize.qcy}
                Component={DropdownItemList}
                componentProps={{ select: this.select }}
                offset={offset}
                rowHeight={38}
                viewportHeight={190}
              />
            </LuiList>
            {!hideStateCountsBar && (
            <StateCountsBar qStateCounts={qStateCounts} />
            )}
          </LuiDropdown>
        }
        { expanded &&
        <LuiList style={{ width: '15rem' }}>
          <LuiSearch
            value={searchListInputValue}
            clear={this.clear}
            onChange={this.searchListObjectFor}
            onKeyPress={this.acceptListObjectSearch}
          />
          <QdtVirtualScroll
            qData={qData}
            qcy={qLayout.qListObject.qSize.qcy}
            Component={DropdownItemList}
            componentProps={{ select: this.select }}
            offset={offset}
            rowHeight={38}
            viewportHeight={190}
          />
        </LuiList>
          }
      </div>
    );
  }
}

const QdtFilter = withListObject(QdtFilterComponent);
QdtFilter.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qListObjectDef: PropTypes.object,
  qPage: PropTypes.object,
  single: PropTypes.bool,
  hideStateCountsBar: PropTypes.bool,
  placeholder: PropTypes.string,
  expanded: PropTypes.bool,
  showStateInDropdown: PropTypes.bool,
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
  single: false,
  hideStateCountsBar: false,
  placeholder: 'Dropdown',
  expanded: false,
  showStateInDropdown: false,
};

export default QdtFilter;
