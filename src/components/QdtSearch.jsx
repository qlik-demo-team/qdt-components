import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { LuiSearch } from 'qdt-lui';
import withListObject from './withListObject';
import '../styles/index.scss';

/**
 * @extends withListObject
 * @property {array} col - Dimension to search for, ['myDimension/fieldName']
 * @property {string} placeholder - Placeholder attribute for the input element
 * @property {object} options - inverse - For dark Theme
 */

class QdtSearchComponent extends React.Component {
    static propTypes = {
      qData: PropTypes.func.isRequired,
      beginSelections: PropTypes.func.isRequired,
      endSelections: PropTypes.func.isRequired,
      select: PropTypes.func.isRequired,
      searchListObjectFor: PropTypes.func.isRequired,
      acceptListObjectSearch: PropTypes.func.isRequired,
      options: PropTypes.object,
    }
    static defaultProps = {
      options: null,
    };

    constructor(props) {
      super(props);

      this.state = {
        isVisible: false,
      };
    }

    async componentWillMount() {
      const { beginSelections } = this.props;
      beginSelections();
    }

    componentDidMount() {
      document.body.addEventListener('click', this.hideDropDown);
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
      document.body.removeEventListener('click', this.hideDropDown);
    }

    @autobind
    onClear() {
      const { endSelections } = this.props;
      endSelections(false);
      this.setState({ isVisible: false });
    }

    @autobind
    async onChange(str) {
      const { searchListObjectFor } = this.props;
      await searchListObjectFor(str);
      this.setState({ isVisible: true });
    }

    @autobind
    onKeyDown(key) {
      if (key === 'enter' || key === 'Enter') {
        const { acceptListObjectSearch } = this.props;
        acceptListObjectSearch();
        this.setState({ isVisible: false });
      }
    }

    @autobind
    onSelect(qElemNumber) {
      const { select } = this.props;
      select(qElemNumber);
    }

    @autobind
    hideDropDown(event) {
      const { endSelections } = this.props;
      const { isVisible } = this.state;
      if (isVisible && !event.target.attributes.qelemnumber) {
        endSelections(true);
        this.setState({ isVisible: false });
      }
    }

    render() {
      const {
        onClear, onChange, onKeyDown, onSelect,
      } = this;
      const { qData, options } = this.props;
      const { isVisible } = this.state;
      const inverse = !!(options.inverse);
      return (
        <div className="qtd-search">
          <LuiSearch inverse={inverse} onClear={onClear} onChange={onChange} onKeyDown={onKeyDown} placeholder={options.placeholder} />
          {isVisible && qData.qMatrix.length > 0 &&
            <div className="qtd-search-results">
              { qData.qMatrix.map(item => (
                <div className={(item[0].qState === 'S') ? 'qtd-search-item selected' : 'qtd-search-item'} role="button" tabIndex={0} key={item[0].qElemNumber} qElemNumber={item[0].qElemNumber} onClick={() => onSelect(item[0].qElemNumber)}>{item[0].qText}</div>
              ))}
            </div>
            }
        </div>
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
