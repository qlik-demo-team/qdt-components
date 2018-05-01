import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import Preloader from '../utilities/Preloader';

export default function withListObject(Component) {
  return class extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      cols: PropTypes.array,
      qListObjectDef: PropTypes.object,
      qPage: PropTypes.object,
    };

    static defaultProps = {
      cols: null,
      qListObjectDef: null,
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
      };
    }

    async componentWillMount() {
      try {
        const { qDocPromise, qPage, cols } = this.props;
        const qDoc = await qDocPromise;
        const qProp = this.generateQProp();
        const qObject = await qDoc.createSessionObject(qProp);
        qObject.on('changed', () => { this.update(); });
          this.setState({ qObject }, () => {
            this.update(qPage.qTop);
          });
      } catch (error) {
        this.setState({ error });
      }
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

    generateQProp(currentColumn = 0) {
      try {
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
          const qDef = qDimensions[currentColumn];
          qProp.qListObjectDef = {
            ...qDef,
            qShowAlternatives: true,
            qAutoSortByState: { qDisplayNumberOfRows: 1 },
          };
        }
        return qProp;
      } catch (error) {
        this.setState({ error });
        return null;
      }
    }

    @autobind
    offset(qTop) {
      try {
        this.update(qTop);
      } catch (error) {
        this.setState({ error });
      }
    }

    // async update(qTop = (this.state.qData) ? this.state.qData.qArea.qTop : 0) {
    async update(qTop = this.state.qData.qArea.qTop) {
      try {
        this.setState({ updating: true });
        const [qLayout, qData] = await Promise.all([this.getLayout(), this.getData(qTop)]);
        this.setState({ updating: false, qLayout, qData });
      } catch (error) {
        this.setState({ error });
      }
    }

    @autobind
    async beginSelections() {
      try {
        const { qObject } = this.state;
        await qObject.beginSelections(['/qListObjectDef']);
      } catch (error) {
        this.setState({ error });
      }
    }

    @autobind
    async endSelections(qAccept) {
      try {
        const { qObject } = this.state;
        await qObject.endSelections(qAccept);
      } catch (error) {
        this.setState({ error });
      }
    }

    @autobind
    async select(qElemNumber, toggle = true, ignoreLock = false) {
      try {
        const { qObject } = this.state;
        await qObject.selectListObjectValues('/qListObjectDef', [qElemNumber], toggle, ignoreLock);
      } catch (error) {
        this.setState({ error });
      }
    }

    @autobind
    async searchListObjectFor(string) {
      try {
        const { qObject } = this.state;
        await qObject.searchListObjectFor('/qListObjectDef', string);
      } catch (error) {
        this.setState({ error });
      }
    }

    @autobind
    async acceptListObjectSearch(ignoreLock = false) {
      try {
        const { qObject } = this.state;
        await qObject.acceptListObjectSearch('/qListObjectDef', true, ignoreLock);
      } catch (error) {
        this.setState({ error });
      }
    }

    @autobind
    async applyPatches(patches) {
      try {
        const { qObject } = this.state;
        await qObject.applyPatches(patches);
      } catch (error) {
        this.setState({ error });
      }
    }

    render() {
      const {
        qObject, qLayout, qData, error,
      } = this.state;
      if (error) {
        // return <div>{error.message}</div>;
      } else if (!qObject || !qLayout || !qData) {
        return <Preloader width="100%" height="100%" paddingTop="0" />;
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
      />);
    }
  };
}
