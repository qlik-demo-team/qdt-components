import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { LuiDropdown, LuiList, LuiSearch } from '../QdtLui';
import useListObject from '../../hooks/useListObject';
import DropdownItemList from './DropdownItemList';
import '../../styles/index.scss';

const QdtSearch = ({
  qDocPromise, cols, qPage, ignoreLock, single, afterSelect, inverse, placeholder, tooltipDock, tooltipContent, showGo,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState('');
  const node = useRef(null);
  const {
    beginSelections, endSelections, qData, select, searchListObjectFor, acceptListObjectSearch,
  } = useListObject({ qDocPromise, cols, qPage });

  const _searchListObjectFor = (event) => {
    setValue(event.target.value);
    searchListObjectFor(event.target.value);
  };

  const clear = () => {
    setValue('');
    _searchListObjectFor('');
  };

  const toggle = (event) => {
    const outsideClick = (event) ? !node.current.contains(event.target) : true;
    if (outsideClick || !dropdownOpen) {
      setDropdownOpen(!dropdownOpen, () => {
        if (!dropdownOpen) {
          beginSelections();
        }
        if (dropdownOpen) {
          endSelections(true);
          clear();
        }
      });
    }
  };

  const _select = async (qElemNumber, qState) => {
    if (qState === 'S') {
      await select(Number(qElemNumber), true, ignoreLock);
    } else {
      await select(Number(qElemNumber), !single, ignoreLock);
      if (single) toggle();
    }
    if (afterSelect) { afterSelect(); }
  };

  const handleSelect = (event) => {
    const { qElemNumber, qState } = event.currentTarget.dataset;
    _select(qElemNumber, qState);
  };

  const _acceptListObjectSearch = () => {
    if (!single) acceptListObjectSearch(ignoreLock);
    if (single) _select(qData.qMatrix[0][0].qElemNumber, qData.qMatrix[0][0].qState);
    setValue('');
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) _acceptListObjectSearch();
  };

  return (
    <div ref={node}>
      { qData
        && (
        <LuiDropdown isOpen={dropdownOpen} toggle={toggle} select={false}>
          <LuiSearch
            value={value}
            clear={clear}
            inverse={!!(inverse)}
            placeholder={placeholder}
            tooltipDock={tooltipDock}
            tooltipContent={tooltipContent}
            onChange={_searchListObjectFor}
            onKeyPress={handleKeyPress}
            onGo={showGo ? _acceptListObjectSearch : null}
          />
          <LuiList style={{ width: '15rem' }}>
            <DropdownItemList qData={qData} select={handleSelect} />
          </LuiList>
        </LuiDropdown>
        )}
    </div>
  );
};

QdtSearch.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qPage: PropTypes.object,
  single: PropTypes.bool,
  inverse: PropTypes.bool,
  placeholder: PropTypes.string,
  tooltipDock: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  tooltipContent: PropTypes.string,
  ignoreLock: PropTypes.bool,
  showGo: PropTypes.bool,
  afterSelect: PropTypes.func,
};

QdtSearch.defaultProps = {
  cols: null,
  single: false,
  inverse: false,
  placeholder: 'Search',
  tooltipDock: 'top',
  tooltipContent: null,
  ignoreLock: false,
  showGo: false,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 100,
  },
  afterSelect: null,
};

export default QdtSearch;
