import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import Preloader from '../utilities/Preloader';

export default function withHyperCube(Component) {
  return class extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      cols: PropTypes.array,
      qHyperCubeDef: PropTypes.object,
      qPage: PropTypes.object,
      width: PropTypes.string,
      height: PropTypes.string,
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
      width: '100%',
      height: '100%',
    }

    constructor(props) {
      super(props);
      this.state = {
        qObject: null,
        qLayout: null,
        qData: null,
        selections: false,
        updating: false,
        error: null,
      };
    }

    async componentWillMount() {
      try {
        const { qDocPromise } = this.props;
        const qProp = await this.generateQProp();
        const qDoc = await qDocPromise;
        const qObject = await qDoc.createSessionObject(qProp);
        qObject.on('changed', () => { this.update(); });
        this.setState({ qObject }, () => {
          const { qPage } = this.props;
          this.update(qPage.qTop);
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }

    async componentWillUnmount() {
      const qDoc = await qDocPromise;
      qDoc.destroySessionObject(this.state.qObject.id);
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
        if (cols[1]) qHyperCubeDef.qMeasures[0].qDef = { qDef: cols[1] };
        if (cols[0]) qHyperCubeDef.qDimensions[0].qDef.qFieldDefs = [cols[0]];
        qProp.qHyperCubeDef = qHyperCubeDef;
        return qProp;
      }
      const qInterColumnSortOrder = [];
      let sortIndex = 0;
      const qDimensions = cols.filter((col, i) => {
        const isDimension = (typeof col === 'string' && !col.startsWith('=')) ||
          (typeof col === 'object' && col.qDef && col.qDef.qFieldDefs) ||
          (typeof col === 'object' && col.qLibraryId && col.qType && col.qType === 'dimension');
        if (isDimension) { qInterColumnSortOrder[i] = sortIndex; sortIndex += 1; }
        return isDimension;
      }).map((col) => {
        if (typeof col === 'string') {
          return { qDef: { qFieldDefs: [col] } };
        }
        return col;
      });
      const qMeasures = cols.filter((col, i) => {
        const isMeasure = (typeof col === 'string' && col.startsWith('=')) ||
            (typeof col === 'object' && col.qDef && col.qDef.qDef) ||
            (typeof col === 'object' && col.qLibraryId && col.qType && col.qType === 'measure');
        if (isMeasure) { qInterColumnSortOrder[i] = sortIndex; sortIndex += 1; }
        return isMeasure;
      }).map((col) => {
        if (typeof col === 'string') {
          return { qDef: { qDef: col } };
        }
        return col;
      });

      qProp.qHyperCubeDef = { qDimensions, qMeasures, qInterColumnSortOrder };
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
    async beginSelections() {
      const { qObject } = this.state;
      qObject.beginSelections(['/qHyperCubeDef']);
      await this.setState({ selections: true });
    }

    @autobind
    async endSelections(qAccept) {
      const { qObject } = this.state;
      qObject.endSelections(qAccept);
      await this.setState({ selections: false });
    }

    @autobind
    async select(dimIndex, selections, toggle = true) {
      const { qObject } = this.state;
      await qObject.selectHyperCubeValues('/qHyperCubeDef', dimIndex, selections, toggle);
    }

    @autobind
    async applyPatches(patches) {
      const { qObject } = this.state;
      await qObject.applyPatches(patches);
    }

    render() {
      const { width, height, cols } = this.props;
      const {
        qObject, qLayout, qData, error,
      } = this.state;
      if (error) {
        return <div>{error.message}</div>;
      } else if (!qObject || !qLayout || !qData) {
        const preloaderType = (cols.length === 1) ? 'dots' : 'balls';
        const paddingTop = (parseInt(height, 0)) ? (height / 2) - 10 : 0;
        return <Preloader width={width} height={height} paddingTop={paddingTop} type={preloaderType} />;
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
