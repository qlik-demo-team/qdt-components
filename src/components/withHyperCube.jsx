import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

export default function withHyperCube(Component) {
  return class extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      cols: PropTypes.array,
      qHyperCubeDef: PropTypes.object,
      qPage: PropTypes.object,
    };

    static defaultProps = {
      cols: null,
      qHyperCubeDef: null,
      qPage: {
        qTop: 0,
        qLeft: 0,
        qWidth: 10,
        qHeight: 100,
      },
    }

    constructor(props) {
      super(props);
      this.state = {
        qObject: {},
        qLayout: {},
        qData: {},
        updating: false,
        error: null,
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
          const { qPage } = this.props.qPage;
          this.update(qPage.qTop);
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }

    async getLayout() {
      const { qObject } = this.state;
      const qLayout = await qObject.getLayout();
      return qLayout;
    }

    async getData(qTop) {
      const { qPage } = this.props;
      const { qObject } = this.state;
      const qDataPages = await qObject.getHyperCubeData('/qHyperCubeDef', [{ ...qPage, qTop }]); // eslint-disable-line max-len
      return qDataPages[0];
    }

    generateQProp() {
      const { cols, qHyperCubeDef } = this.props;
      const qProp = { qInfo: { qType: 'visualization' } };
      if (qHyperCubeDef) {
        qProp.qHyperCubeDef = qHyperCubeDef;
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
        const qMeasures = cols.filter(col =>
          (typeof col === 'string' && col.startsWith('=')) ||
          (typeof col === 'object' && col.qDef && col.qDef.qDef) ||
          (typeof col === 'object' && col.qLibraryId && col.qType && col.qType === 'measure')).map((col) => {
          if (typeof col === 'string') {
            return { qDef: { qDef: col } };
          }
          return col;
        });
        qProp.qHyperCubeDef = { qDimensions, qMeasures };
      }
      return qProp;
    }

    @autobind
    offset(qTop) {
      this.update(qTop);
    }

    async update(qTop = this.state.qData.qArea.qTop) {
      this.setState({ updating: true });
      const [qLayout, qData] = await Promise.all([this.getLayout(), this.getData(qTop)]);
      this.setState({ updating: false, qLayout, qData });
    }

    @autobind
    beginSelections() {
      const { qObject } = this.state;
      qObject.beginSelections(['/qHyperCubeDef']);
    }

    @autobind
    endSelections(qAccept) {
      const { qObject } = this.state;
      qObject.endSelections(qAccept);
    }

    @autobind
    async select(qElemNumber, dimIndex = 0) {
      const { qObject } = this.state;
      qObject.selectHyperCubeValues('/qHyperCubeDef', dimIndex, [qElemNumber], true);
    }

    @autobind
    async applyPatches(patches) {
      const { qObject } = this.state;
      qObject.applyPatches(patches);
    }

    render() {
      const {
        qObject, qLayout, qData, error,
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
        applyPatches={this.applyPatches}
      />);
    }
  };
}
