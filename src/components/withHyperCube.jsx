/**
 * @name withHyperCube
 * @param {array} cols - The dimension for the ListObject
 * @param {object} qListObjectDef - Pass the entire Definition to bypass our creation object
 * @param {bool} autoSortByState - IF we want the selected to be always on top like Qlik Sense. Default true
 * @param {number} qSortByAscii [1] - For sorting the list by text. 1 = ASC, 0 = none, -1 = DESC
 * @param {number} qSortByLoadOrder [1] - For sorting the list by Sense load. 1 = ASC, 0 = none, -1 = DESC
 * @description
 * Creates a Session List Object
 * https://help.qlik.com/en-US/sense-developer/June2018/Subsystems/EngineAPI/Content/GenericObject/PropertyLevel/HyperCubeDef.htm
 *
*/

import React from 'react';
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
      qSortByAscii: PropTypes.oneOf([1, 0, -1]),
      qSortByLoadOrder: PropTypes.oneOf([1, 0, -1]),
      qInterColumnSortOrder: PropTypes.array,
      qSuppressZero: PropTypes.bool,
      qSortByExpression: PropTypes.oneOf([1, 0, -1]),
      qSuppressMissing: PropTypes.bool,
      qExpression: PropTypes.object,
    };

    static defaultProps = {
      cols: null,
      qHyperCubeDef: null,
      qSortByAscii: 1,
      qSortByLoadOrder: 1,
      qInterColumnSortOrder: [],
      qSuppressZero: false,
      qSortByExpression: 0,
      qSuppressMissing: false,
      qExpression: null,
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
        qRData: null,
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
      const { qDocPromise } = this.props;
      const { qObject: { id } } = this.state;
      const qDoc = await qDocPromise;
      qDoc.destroySessionObject(id);
    }

    getLayout = async () => {
      const { qObject } = this.state;
      const qLayout = await qObject.getLayout();
      return qLayout;
    }

    getData = async (qTop) => {
      const { qPage } = this.props;
      const { qObject } = this.state;
      const qDataPages = await qObject.getHyperCubeData('/qHyperCubeDef', [{ ...qPage, qTop }]);
      return qDataPages[0];
    }

    getReducedData = async () => {
      const { qPage: { qWidth } } = this.props;
      const qPage = {
        qTop: 0,
        qLeft: 0,
        qWidth,
        qHeight: Math.round(10000 / qWidth),
      };
      const { qObject } = this.state;
      const qDataPages = await qObject.getHyperCubeReducedData('/qHyperCubeDef', [{ ...qPage }], -1, 'D1');
      return qDataPages[0];
    }

    generateQProp = () => {
      const {
        cols, qHyperCubeDef, qSortByAscii, qSortByLoadOrder, qSuppressZero, qInterColumnSortOrder, qSortByExpression, qExpression, qSuppressMissing,
      } = this.props;
      const qProp = { qInfo: { qType: 'visualization' } };
      if (qHyperCubeDef) {
        if (cols && cols[1]) qHyperCubeDef.qMeasures[0].qDef = { qDef: cols[1] };
        if (cols && cols[0]) qHyperCubeDef.qDimensions[0].qDef.qFieldDefs = [cols[0]];
        qProp.qInfo.qType = 'HyperCube';
        qProp.qHyperCubeDef = qHyperCubeDef;
        return qProp;
      }
      const myqInterColumnSortOrder = (qInterColumnSortOrder) || [];
      const qInterColumnSortOrderSet = !!(qInterColumnSortOrder);
      let sortIndex = 0;
      const qDimensions = cols.filter((col, i) => {
        const isDimension = (typeof col === 'string' && !col.startsWith('='))
          || (typeof col === 'object' && col.qDef && col.qDef.qFieldDefs)
          || (typeof col === 'object' && col.qLibraryId && col.qType && col.qType === 'dimension');
        if (isDimension && !qInterColumnSortOrderSet) { myqInterColumnSortOrder[i] = sortIndex; sortIndex += 1; }
        return isDimension;
      }).map((col) => {
        if (typeof col === 'string') {
          return { qDef: { qFieldDefs: [col], qSortCriterias: [{ qSortByAscii, qSortByLoadOrder }] } }; //
        }
        return col;
      });
      const qMeasures = cols.filter((col, i) => {
        const isMeasure = (typeof col === 'string' && col.startsWith('='))
            || (typeof col === 'object' && col.qDef && col.qDef.qDef)
            || (typeof col === 'object' && col.qLibraryId && col.qType && col.qType === 'measure');
        if (isMeasure && !qInterColumnSortOrderSet) { myqInterColumnSortOrder[i] = sortIndex; sortIndex += 1; }
        return isMeasure;
      }).map((col) => {
        if (typeof col === 'string') {
          return {
            qDef: { qDef: col },
            qSortBy: {
              qSortByNumeric: -1, qSortByExpression, qExpression, qSuppressMissing,
            },
          };
        }
        return col;
      });

      qProp.qHyperCubeDef = {
        qDimensions,
        qMeasures,
        qInterColumnSortOrder,
        qSuppressZero,
        qSuppressMissing,
      };
      return qProp;
    }

    offset = (qTop) => {
      this.update(qTop);
    }

    update = async (qTopPassed = null) => {
      // Short-circuit evaluation because one line destructuring on Null values breaks on the browser.
      const { qData: qDataGenerated } = this.state || {};
      const { qArea } = qDataGenerated || {};
      const { qTop: qTopGenerated } = qArea || {};
      // We need to be able to pass qTopPassed=0 to force the update with qTop=0
      const qTop = (qTopPassed !== null && qTopPassed >= 0) ? qTopPassed : qTopGenerated;
      this.setState({ updating: true });
      const [qLayout, qData, qRData] = await Promise.all([this.getLayout(), this.getData(qTop), this.getReducedData()]);
      this.setState({
        updating: false, qLayout, qData, qRData,
      });
    }

    beginSelections = async () => {
      const { qObject } = this.state;
      qObject.beginSelections(['/qHyperCubeDef']);
      await this.setState({ selections: true });
    }

    endSelections = async (qAccept) => {
      const { qObject } = this.state;
      qObject.endSelections(qAccept);
      await this.setState({ selections: false });
    }

    select = async (dimIndex, selections, toggle = true) => {
      const { qObject } = this.state;
      await qObject.selectHyperCubeValues('/qHyperCubeDef', dimIndex, selections, toggle);
    }

    applyPatches = async (patches) => {
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
      } if (!qObject || !qLayout || !qData) {
        const preloaderType = (cols && cols.length === 1) ? 'dots' : 'balls';
        const paddingTop = (parseInt(height, 0)) ? (height / 2) - 10 : 0;
        return <Preloader width={width} height={height} paddingTop={paddingTop} type={preloaderType} />;
      }
      return (
        <Component
          {...this.props}
          {...this.state}
          offset={this.offset}
          select={this.select}
          beginSelections={this.beginSelections}
          endSelections={this.endSelections}
          applyPatches={this.applyPatches}
        />
      );
    }
  };
}
