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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  LuiDropdown, LuiList, LuiSearch, LuiTabset,
} from '../QdtLui';
import useListObject from '../../hooks/useListObject';
import DropdownItemList from './DropdownItemList';
import ExpandedHorizontalTab from './ExpandedHorizontalTab';
import StateCountsBar from './StateCountsBar';
import '../../styles/index.scss';


/** The Actual Component */
const QdtFilter = ({
  qDocPromise, cols, qPage, showStateInDropdown, single, hideStateCountsBar, expanded, expandedHorizontal, expandedHorizontalSense, placeholder,
}) => {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [value, setValue] = useState('');
  // let searchListInputValue = '';

  const {
    beginSelections, endSelections, qLayout, qData, selections, select, searchListObjectFor, acceptListObjectSearch,
  } = useListObject({ qDocPromise, cols, qPage });

  const _searchListObjectFor = (event) => {
    setValue(event.target.value);
    searchListObjectFor(event.target.value);
  };

  /** Clear all of the selections */
  const clear = () => {
    setValue('');
    searchListObjectFor('');
  };

  const _acceptListObjectSearch = (event) => {
    if (event.charCode === 13) {
      setValue('');
      acceptListObjectSearch();
    }
  };

  /** Toggle dropdown visibility */
  const toggle = () => {
    if (!dropdownOpen) {
      beginSelections();
    } else {
      endSelections(true);
      clear();
    }
    setDropDownOpen(!dropdownOpen);
  };

  /** Make Selections */
  const _select = (event) => {
    const { qElemNumber, qState } = event.currentTarget.dataset;  //eslint-disable-line
    // FKA - This is broken. I don't know what it was for, but it breaks selections in regular filters.
    // const toggleSelections = !(((!single && qState === 'S') || (expandedHorizontal) || single));
    select(Number(qElemNumber), true);
    if (single && (!expanded || !ExpandedHorizontalTab)) toggle();
    if (expandedHorizontal) endSelections(true);
  };

  return (
    <>
      { qData && qLayout && !expanded && !expandedHorizontal
        && (
        <LuiDropdown isOpen={dropdownOpen} toggle={() => toggle()}>
          <span>
            {!showStateInDropdown && placeholder}
            {(showStateInDropdown && selections && selections.length === 0) && placeholder}
            {(showStateInDropdown && selections && selections.length === 1) && `${placeholder}${placeholder && ':'} ${selections[0][0].qText}`}
            {(showStateInDropdown && selections && selections.length > 1) && `${placeholder}${placeholder && ':'} ${selections.length} of ${qLayout.qListObject.qSize.qcy}`}
          </span>
          <LuiList style={{ width: '15rem' }}>
            <LuiSearch
              value={value}
              clear={clear}
              onChange={_searchListObjectFor}
              onKeyPress={_acceptListObjectSearch}
              // onChange={_searchListObjectFor}
              // onKeyPress={handleKeyPress}
              // onGo={showGo ? _acceptListObjectSearch : null}
            />
            <DropdownItemList qData={qData} select={_select} dropdownOpen={dropdownOpen} />
          </LuiList>
          {!hideStateCountsBar && qLayout
            && <StateCountsBar qStateCounts={qLayout.qListObject.qDimensionInfo.qStateCounts} qcy={qLayout.qListObject.qSize.qcy} />}
        </LuiDropdown>
        )}
      { qData && qLayout && expanded
        && (
        <LuiList style={{ width: '15rem' }}>
          <LuiSearch
            value={value}
            clear={clear}
            onChange={_searchListObjectFor}
            onKeyPress={_acceptListObjectSearch}
          />
          <DropdownItemList qData={qData} select={_select} dropdownOpen={dropdownOpen} />
        </LuiList>
        )}
      { qData && expandedHorizontal
        && (
        <LuiTabset
          fill
          style={{ height: '100%' }}
        >
          <ExpandedHorizontalTab
            qData={qData}
            select={_select}
            expandedHorizontalSense={expandedHorizontalSense}
          />
        </LuiTabset>
        )}
    </>
  );
};

QdtFilter.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.isRequired,
  qPage: PropTypes.object,
  single: PropTypes.bool,
  hideStateCountsBar: PropTypes.bool,
  placeholder: PropTypes.string,
  showStateInDropdown: PropTypes.bool,
  expanded: PropTypes.bool,
  expandedHorizontal: PropTypes.bool,
  expandedHorizontalSense: PropTypes.bool,
};

QdtFilter.defaultProps = {
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 10000,
  },
  single: false,
  hideStateCountsBar: false,
  placeholder: 'Dropdown',
  showStateInDropdown: false,
  expanded: false,
  expandedHorizontal: false,
  expandedHorizontalSense: true,
};

export default QdtFilter;
