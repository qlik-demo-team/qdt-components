import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { LuiDropdown, LuiList, LuiListItem, LuiSearch } from 'qdt-lui';
import QdtVirtualScroll from './QdtVirtualScroll';
import withListObject from './withListObject';
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

class QdtSearchComponent extends React.Component {
    static propTypes = {
      qData: PropTypes.object.isRequired,
      qLayout: PropTypes.object.isRequired,
      offset: PropTypes.func.isRequired,
      select: PropTypes.func.isRequired,
      beginSelections: PropTypes.func.isRequired,
      endSelections: PropTypes.func.isRequired,
      searchListObjectFor: PropTypes.func.isRequired,
      acceptListObjectSearch: PropTypes.func.isRequired,
      options: PropTypes.object,
    }

    static defaultProps = {
      options: {},
    };

    state = {
      dropdownOpen: false,
      value: '',
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
      this.setState({ value: '' });
    }

    @autobind
    handleChange(event) {
      this.setState({ value: event.target.value });
      if (event.target.value && event.target.value !== '') {
        this.props.searchListObjectFor(event.target.value);
      }
    }

    @autobind
    handleKeyPress(event) {
      if (event.charCode === 13) {
        this.setState({ value: '' });
        this.props.acceptListObjectSearch();
      }
    }

    render() {
      const {
        qData, qLayout, offset, options,
      } = this.props;
      const { dropdownOpen, value } = this.state;
      return (
        <LuiDropdown isOpen={dropdownOpen} toggle={this.toggle} select={false}>
          <LuiSearch
            value={value}
            clear={this.clear}
            inverse={!!(options && options.inverse)}
            placeholder={(options && options.placeholder) ? options.placeholder : null}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <LuiList style={{ width: '15rem' }}>
            <QdtVirtualScroll
              qData={qData}
              qcy={qLayout.qListObject.qSize.qcy}
              Component={DropdownItemList}
              componentProps={{ select: this.select }}
              offset={offset}
              rowHeight={37}
              viewportHeight={190}
            />
          </LuiList>
        </LuiDropdown>
      );
    }
}

const QdtSearch = withListObject(QdtSearchComponent);
QdtSearch.propTypes = {
  qData: PropTypes.object.isRequired,
  beginSelections: PropTypes.func.isRequired,
  endSelections: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  searchListObjectFor: PropTypes.func.isRequired,
  acceptListObjectSearch: PropTypes.func.isRequired,
  cols: PropTypes.array,
  qPage: PropTypes.object,
  options: PropTypes.object,
};
QdtSearch.defaultProps = {
  cols: null,
  options: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 10,
  },
};

export default QdtSearch;
