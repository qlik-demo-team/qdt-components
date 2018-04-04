import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

export default function withListObject(Component) {
  return class extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      cols: PropTypes.array,
      qListObjectDef: PropTypes.object,
      qPage: PropTypes.object,
      dropDown: PropTypes.bool,
    };

    static defaultProps = {
      cols: null,
      qListObjectDef: null,
      dropDown: false,
      qPage: {
        qTop: 0,
        qLeft: 0,
        qWidth: 1,
        qHeight: 100,
      },
    }

    constructor(props) {
      super(props);
      this.state = {
        qObject: null,
        qLayout: null,
        qData: null,
        updating: false,
        error: null,
        showDropDown: false,
      };
    }

    async componentWillMount() {
      try {
        const { qDocPromise } = this.props;
        const qProp = this.generateQProp();
        const qDoc = await qDocPromise;
        const qObject = await qDoc.createSessionObject(qProp);
        qObject.on('changed', () => { this.update(); });
        this.setState({ qObject }, () => {
          const { qPage } = this.props;
          this.update(qPage.qTop);
        });
      } catch (error) {
        this.setState({ error });
      }
    }

    componentDidMount() {
      const { dropDown } = this.props;
      if (dropDown) {
        document.body.addEventListener('click', this.hideDropDown);
      }
    }

    componentWillUnmount() {
      document.body.removeEventListener('click', this.hideDropDown);
    }

    async getLayout() {
      try {
        const { qObject } = this.state;
        const qLayout = await qObject.getLayout();
        return qLayout;
      } catch (error) {
        this.setState({ error });
        return null;
      }
    }

    async getData(qTop) {
      try {
        const { qPage } = this.props;
        const { qObject } = this.state;
        const qDataPages = await qObject.getListObjectData('/qListObjectDef', [{ ...qPage, qTop }]); // eslint-disable-line max-len
        return qDataPages[0];
      } catch (error) {
        this.setState({ error });
        return null;
      }
    }

    generateQProp() {
      const { cols, qListObjectDef } = this.props;
      const qProp = { qInfo: { qType: 'visualization' } };
      if (qListObjectDef) {
        qProp.qListObjectDef = qListObjectDef;
      } else {
        const qDimensions = cols.filter(col =>
          (typeof col === 'string' && !col.startsWith('=')) ||
          (typeof col === 'object' && col.qDef && col.qDef.qFieldDefs) ||
          (typeof col === 'object' && col.qLibraryId && col.qType && col.qType === 'dimension')).map((col) => {
          if (typeof col === 'string') {
            return { qDef: { qFieldDefs: [col] } };
          }
          return col;
        });
        const qDef = qDimensions[0];
        qProp.qListObjectDef = {
          ...qDef,
          qShowAlternatives: true,
          qAutoSortByState: { qDisplayNumberOfRows: 1 },
        };
      }
      return qProp;
    }

    @autobind
    hideDropDown(event) {
      const { dropDown } = this.props;
      if (dropDown && !event.target.attributes.qelemnumber) {
        this.endSelections(true);
        // this.setState({ showDropDown: false });
      }
    }

    @autobind
    offset(qTop) {
      this.update(qTop);
    }

    async update(qTop = this.state.qData.qArea.qTop) {
      this.setState({ updating: true });
      const [qLayout, qData] = await Promise.all([this.getLayout(), this.getData(qTop)]);
      this.setState({
        updating: false, qLayout, qData, showDropDown: true,
      });
    }

    @autobind
    beginSelections() {
      const { qObject } = this.state;
      qObject.beginSelections(['/qListObjectDef']);
    }

    @autobind
    endSelections(qAccept) {
      this.setState({ updating: true });
      const { qObject } = this.state;
      qObject.endSelections(qAccept);
      this.setState({ updating: false });
    }

    @autobind
    async select(qElemNumber) {
      const { qObject } = this.state;
      qObject.selectListObjectValues('/qListObjectDef', [qElemNumber], true);
    }

    @autobind
    async searchListObjectFor(string) {
      const { qObject } = this.state;
      qObject.searchListObjectFor('/qListObjectDef', string);
    }

    @autobind
    async acceptListObjectSearch() {
      this.setState({ updating: true });
      const { qObject } = this.state;
      qObject.acceptListObjectSearch('/qListObjectDef', true, true);
      this.setState({ updating: false });
    }

    @autobind
    async applyPatches(patches) {
      const { qObject } = this.state;
      qObject.applyPatches(patches);
    }

    render() {
      const {
        qObject, qLayout, qData, error, showDropDown,
      } = this.state;
      if (error) {
        return <div>{error.message}</div>;
      } else if (!qObject || !qLayout || !qData) {
        return <div>Loading...</div>;
      }
      return (<Component
        {...this.props}
        {...this.state}
        offset={this.offset}
        select={this.select}
        beginSelections={this.beginSelections}
        endSelections={this.endSelections}
        searchListObjectFor={this.searchListObjectFor}
        acceptListObjectSearch={this.acceptListObjectSearch}
        applyPatches={this.applyPatches}
        showDropDown={showDropDown}
      />);
    }
  };
}
