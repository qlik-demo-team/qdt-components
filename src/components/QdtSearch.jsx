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
      ignoreLock: PropTypes.bool.isRequired,
      showGo: PropTypes.bool.isRequired,
      afterSelect: PropTypes.func,
      single: PropTypes.bool,
      inverse: PropTypes.bool,
      placeholder: PropTypes.string,
      tooltipDock: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
      tooltipContent: PropTypes.string,
    }

    static defaultProps = {
      afterSelect: null,
      single: false,
      inverse: false,
      placeholder: 'Search',
      tooltipDock: 'top',
      tooltipContent: null,
    };

    state = {
      dropdownOpen: false,
      value: '',
    }

    @autobind
    toggle(event) {
      const outsideClick = (event) ? !this.node.contains(event.target) : true;
      if (outsideClick || !this.state.dropdownOpen) {
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
    }

    @autobind
    async select(qElemNumber, qState) {
      if (qState === 'S') {
        await this.props.select(Number(qElemNumber), true, this.props.ignoreLock);
      } else {
        await this.props.select(Number(qElemNumber), !this.props.single, this.props.ignoreLock);
        if (this.props.single) this.toggle();
      }
      if (this.props.afterSelect) { this.props.afterSelect(); }
    }

    @autobind
    handleSelect(event) {
      const { qElemNumber, qState } = event.currentTarget.dataset;
      this.select(qElemNumber, qState);
    }

    @autobind
    clear() {
      this.setState({ value: '' });
      this.props.searchListObjectFor('');
    }

    @autobind
    searchListObjectFor(event) {
      this.setState({ value: event.target.value });
      this.props.offset(0);
      this.props.searchListObjectFor(event.target.value);
    }

    @autobind
    acceptListObjectSearch() {
      if (!this.props.single) this.props.acceptListObjectSearch(this.props.ignoreLock);
      if (this.props.single) this.select(this.props.qData.qMatrix[0][0].qElemNumber, this.props.qData.qMatrix[0][0].qState);
      this.setState({ value: '' });
    }

    @autobind
    handleKeyPress(event) {
      if (event.charCode === 13) {
        this.acceptListObjectSearch();
      }
    }

    render() {
      const {
        qData, qLayout, offset, inverse, placeholder, tooltipDock, tooltipContent, showGo,
      } = this.props;
      const { dropdownOpen, value } = this.state;
      return (
        <div ref={node => this.node = node}>
          <LuiDropdown isOpen={dropdownOpen} toggle={this.toggle} select={false}>
            <LuiSearch
              value={value}
              clear={this.clear}
              inverse={!!(inverse)}
              placeholder={placeholder}
              tooltipDock={tooltipDock}
              tooltipContent={tooltipContent}
              onChange={this.searchListObjectFor}
              onKeyPress={this.handleKeyPress}
              onGo={showGo ? this.acceptListObjectSearch : null}
            />
            <LuiList style={{ width: '15rem' }}>
              <QdtVirtualScroll
                qData={qData}
                qcy={qLayout.qListObject.qSize.qcy}
                Component={DropdownItemList}
                componentProps={{ select: this.handleSelect }}
                offset={offset}
                rowHeight={38}
                viewportHeight={190}
              />
            </LuiList>
          </LuiDropdown>
        </div>
      );
    }
}

const QdtSearch = withListObject(QdtSearchComponent);
QdtSearch.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qListObjectDef: PropTypes.object,
  qPage: PropTypes.object,
  afterSelect: PropTypes.func,
  single: PropTypes.bool,
  inverse: PropTypes.bool,
  placeholder: PropTypes.string,
  tooltipDock: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  tooltipContent: PropTypes.string,
  ignoreLock: PropTypes.bool,
  showGo: PropTypes.bool,
};
QdtSearch.defaultProps = {
  cols: null,
  qListObjectDef: null,
  afterSelect: null,
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
};

export default QdtSearch;
