import React from 'react';
import PropTypes from 'prop-types';
import { LuiSearch } from 'qdt-lui';
import withListObject from './withListObject';
import '../styles/index.scss';

/**
 * @extends withListObject
 * @property {array} col - Dimension to search for, ['myDimension/fieldName']
 * @property {string} placeholder - Placeholder attribute for the input element
 * @property {object} options - inverse - For dark Theme
 */

let searchString = '';

const QdtSearchComponent = ({
  qData, options, searchListObjectFor, acceptListObjectSearch, beginSelections, endSelections, select, showDropDown,
}) => {
  let isVisible = false;
  //   document.body.addEventListener('click', this.hideDropDown);
  console.log(qData);
  isVisible = !!(qData.qMatrix.length && searchString !== '' && showDropDown);
  if (isVisible) {
    beginSelections();
  }
  const inverse = !!(options.inverse);
  const onClear = () => {
    searchString = '';
    isVisible = false;
    endSelections(false);
  };
  const onChange = (s) => {
    searchString = s;
    searchListObjectFor(searchString);
  };
  const onKeyDown = (key) => {
    if (key === 'enter' || key === 'Enter') {
      isVisible = false;
      searchString = '';
      acceptListObjectSearch();
    }
  };
  const onSelect = (qElemNumber) => {
    // isVisible = false;
    // searchString = '';
    select(qElemNumber);
  };
  return (
    <div className="qtd-search">
      <LuiSearch inverse={inverse} onClear={onClear} onChange={onChange} onKeyDown={onKeyDown} placeholder={options.placeholder} />
      {isVisible &&
      <div className="qtd-search-results">
        {qData.qMatrix.length && qData.qMatrix.map(item => (
          <div className={(item[0].qState === 'S') ? 'qtd-search-item selected' : 'qtd-search-item'} role="button" tabIndex={0} key={item[0].qElemNumber} qElemNumber={item[0].qElemNumber} onClick={() => onSelect(item[0].qElemNumber)}>{item[0].qText}</div>
        ))}
      </div>
    }
    </div>
  );
};
QdtSearchComponent.propTypes = {
  qData: PropTypes.object.isRequired,
  searchListObjectFor: PropTypes.object.isRequired,
  acceptListObjectSearch: PropTypes.object.isRequired,
  beginSelections: PropTypes.object.isRequired,
  endSelections: PropTypes.object.isRequired,
  select: PropTypes.object.isRequired,
  options: PropTypes.object,
  showDropDown: PropTypes.bool.isRequired,
};
QdtSearchComponent.defaultProps = {
  options: null,
};

const QdtSearch = withListObject(QdtSearchComponent);
QdtSearch.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  searchListObjectFor: PropTypes.func.isRequired,
  acceptListObjectSearch: PropTypes.func.isRequired,
  beginSelections: PropTypes.func.isRequired,
  endSelections: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  cols: PropTypes.array,
  qHyperCubeDef: PropTypes.object,
  qPage: PropTypes.object,
  options: PropTypes.object,
  dropDown: PropTypes.bool,
};
QdtSearch.defaultProps = {
  cols: null,
  qHyperCubeDef: null,
  options: null,
  dropDown: true,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 10,
  },
};

export default QdtSearch;
