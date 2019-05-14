/**
 * @name QdtFilter
 * @param {bool} single [false] - If we want single selections only. For regular menu like components
 * @param {bool} hideStateCountsBar [false] -
 * @param {string} placeholder [Dropdown] - Custom text on the DropDown
 * @param {bool} showStateInDropdown [false] - Selection state in the placeholder
 * @param {bool} expanded [false] - Display as a list object
 * @param {bool} expandedHorizontal [false] - Display as tabs
 * @param {bool} expandedHorizontalSense [false] -
 * @param {bool} qSortByAscii [1] - For sorting the list. 1 = ASC, 0 = none, -1 = DESC
 * @description
 * Filter component for custom filters.
 * DropDown, List or Tabs
*/

import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import {
  LuiDropdown, LuiList, LuiListItem, LuiSearch, LuiTabset, LuiTab,
} from 'qdt-lui';
import withListObject from './withListObject';
import QdtVirtualScroll from './QdtVirtualScroll';
import '../styles/index.scss';

/** Create the DropDown list */
const DropdownItemList = ({ qMatrix, rowHeight, select }) => (
  <span>
    {qMatrix.map(row => (
      <LuiListItem
        className={`${row[0].qState}`}
        key={row[0].qElemNumber}
        data-q-elem-number={row[0].qElemNumber}
        data-q-state={row[0].qState}
        data-q-text={row[0].qText}
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

/** Create the Tabs */
const ExpandedHorizontalTab = ({ qData, select, expandedHorizontalSense }) => {
  const element = qData.qMatrix.map((row) => {
    let className = (expandedHorizontalSense) ? `${row[0].qState}` : '';
    if (!expandedHorizontalSense && row[0].qState === 'S') className += ' lui-active';
    return (
      <LuiTab
        className={className}
        key={row[0].qElemNumber}
        data-q-elem-number={row[0].qElemNumber}
        data-q-state={row[0].qState}
        onClick={select}
      >
        {row[0].qText}
      </LuiTab>
    );
  });
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      {element}
    </div>
  );
};
ExpandedHorizontalTab.propTypes = {
  qData: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  expandedHorizontalSense: PropTypes.bool.isRequired,
};

/** Create StateCountsBar (the green line below the dropdown) */
const StateCountsBar = ({ qStateCounts }) => {
  const totalStateCounts = Object.values(qStateCounts).reduce((a, b) => a + b);
  const fillWidth = `${((qStateCounts.qOption + qStateCounts.qSelected) * 100) / totalStateCounts}%`;
  const fillStyle = {
    position: 'absolute', width: fillWidth, height: '100%', backgroundColor: '#52CC52', transition: 'width .6s ease',
  };
  return (
    <div className="qdt-filter-state-counts-bar">
      <div style={fillStyle} />
    </div>
  );
};
StateCountsBar.propTypes = {
  qStateCounts: PropTypes.object.isRequired,
};

/** The Actual Component */
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
    expandedHorizontal: PropTypes.bool,
    expandedHorizontalSense: PropTypes.bool,
    // qSortByAscii: PropTypes.oneOf([1, 0, -1]),
  }

  static defaultProps = {
    single: false,
    hideStateCountsBar: false,
    placeholder: 'Dropdown',
    showStateInDropdown: false,
    expanded: false,
    expandedHorizontal: false,
    expandedHorizontalSense: true,
    // qSortByAscii: 1,
  }

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      searchListInputValue: '',
      selections: null,
      placeholder: props.placeholder,
    };
  }

  componentWillMount() {
    const { showStateInDropdown, qObject } = this.props;
    if (showStateInDropdown) {
      this.getSelections();
      qObject.on('changed', this.getSelections);
    }
  }

  //   componentDidMount() {
  //     window.addEventListener('click', this.handleOutsideClick);
  //   }
  //   componentWillUnmount() {
  //     window.removeEventListener('click', this.handleOutsideClick);
  //   }

  /** Get the selected items of the current object */
  getSelections = async () => {
    const { qObject } = this.props;
    const qDataPages = await qObject.getListObjectData('/qListObjectDef', [{ qWidth: 1, qHeight: 10000 }]);
    const selections = qDataPages[0].qMatrix.filter(row => row[0].qState === 'S');
    this.setState({ selections });
  }

  //   handleOutsideClick = (event) => {
  //     const outsideClick = !this.node.contains(event.target);
  //     const { dropdownOpen } = this.state;
  //     console.log(1, event);
  //     if (dropdownOpen && outsideClick) {
  //       console.log(2);
  //       this.props.endSelections(false);
  //       this.clear();
  //     }
  //   }

  /** Toggle dropdown visibility */
  @autobind
  toggle() {
    const { dropdownOpen } = this.state;
    const { beginSelections, endSelections } = this.props;
    this.setState({ dropdownOpen: !dropdownOpen }, () => {
      if (dropdownOpen) {
        beginSelections();
      }
      if (!dropdownOpen) {
        endSelections(true);
        this.clear();
      }
    });
  }

  /** Make Selections */
  @autobind
  select(event) {
    const { qElemNumber, qState } = event.currentTarget.dataset; // qText
    const { single, endSelections, select } = this.props; // placeholder
    if (qState === 'S') { select(Number(qElemNumber)); } else { select(Number(qElemNumber), !single); }
    if (single) {
      endSelections(true);
      this.toggle();
    }
  }

  /** Clear all of the selections */
  @autobind
  clear() {
    const { searchListObjectFor } = this.props;
    this.setState({ searchListInputValue: '' });
    searchListObjectFor('');
  }

  @autobind
  searchListObjectFor(event) {
    const { offset, searchListObjectFor } = this.props;
    this.setState({ searchListInputValue: event.target.value });
    offset(0);
    searchListObjectFor(event.target.value);
  }

  @autobind
  acceptListObjectSearch(event) {
    if (event.charCode === 13) {
      const { acceptListObjectSearch } = this.props;
      this.setState({ searchListInputValue: '' });
      acceptListObjectSearch();
    }
  }

  /** Finally start rendering into the Dom */
  render() {
    const {
      qData, qLayout, offset, hideStateCountsBar, showStateInDropdown, expanded, expandedHorizontal, expandedHorizontalSense,
    } = this.props;
    const {
      dropdownOpen, searchListInputValue, selections, placeholder,
    } = this.state;
    const { qStateCounts } = qLayout.qListObject.qDimensionInfo;
    const { qSelected } = qStateCounts;
    const totalStateCounts = Object.values(qStateCounts).reduce((a, b) => a + b);
    return (
      <div ref={(node) => { this.node = node; }}>
        { (!expanded && !expandedHorizontal)
          && (
          <LuiDropdown isOpen={dropdownOpen} toggle={this.toggle}>
            <span>
              {!showStateInDropdown && placeholder}
              {(showStateInDropdown && selections && selections.length === 0) && placeholder}
              {(showStateInDropdown && selections && selections.length === 1) && `${placeholder}: ${selections[0][0].qText}`}
              {(showStateInDropdown && selections && selections.length > 1) && `${placeholder}: ${qSelected} of ${totalStateCounts}`}
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
          )
        }
        { expanded
        && (
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
        )
        }
        { expandedHorizontal
        && (
        <LuiTabset
          fill
          style={{ height: '100%' }}
        >
          <ExpandedHorizontalTab
            qData={qData}
            select={this.select}
            expandedHorizontalSense={expandedHorizontalSense}
          />
        </LuiTabset>
        )
        }
      </div>
    );
  }
}

/** Create the Component but based on the ListObject */
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
  expandedHorizontal: PropTypes.bool,
  expandedHorizontalSense: PropTypes.bool,
  showStateInDropdown: PropTypes.bool,
  autoSortByState: PropTypes.bool,
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
  expandedHorizontal: false,
  expandedHorizontalSense: true,
  showStateInDropdown: false,
  autoSortByState: 1,
};

export default QdtFilter;
