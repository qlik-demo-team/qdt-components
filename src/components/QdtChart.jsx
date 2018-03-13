import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import picasso from 'picasso.js';
import picassoQ from 'picasso-plugin-q';
import withHyperCube from './withHyperCube';
// import properties from '../properties/barchart';
import properties from '../properties/';
// import hyperCube from '../properties/hypercube';
import Tooltip from '../utilities/Tooltip';
import utility from '../utilities/';
import '../styles/index.scss';

class QdtChartComponent extends React.Component {
    static propTypes = {
    //   qObject: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props);

      this.tooltip = new Tooltip();
      this.pic = null;
      this.selections = [];
      this.uid = utility.uid(8);
      this.state = {
        selectionsOn: false,
      };
    }

    componentWillMount() {
      picasso.use(picassoQ);
      this.tooltip.create();
    }
    componentDidMount() {
    //   const { qObject } = this.props;
      this.create();
    //   qObject.on('changed', () => { this.create(); });
    }
    componentDidUpdate() {
    }


    @autobind
    async create() {
      const { tooltip, uid } = this;
      const {
        qDocPromise, cols, type, qHyperCubeDef,
      } = this.props;
      const qDoc = await qDocPromise;
      const qProp = { qInfo: { qType: 'visualization' } };
      if (cols[1]) qHyperCubeDef.qMeasures[0].qDef = { qDef: cols[1] };
      if (cols[0]) qHyperCubeDef.qDimensions[0].qDef.qFieldDefs = [cols[0]];
      qProp.qHyperCubeDef = qHyperCubeDef;
      const qObject = await qDoc.createSessionObject(qProp);
      const qLayout = await qObject.getLayout();
      //   const { qLayout } = await this.props;
      const settings = properties[type];
      settings.interactions[0].events = {
        mousemove(e) {
          tooltip.div.x = e.pageX;
          tooltip.div.y = e.pageY;
          if (e.target.className !== 'qdt-barchart-chart') {
            tooltip.show();
          }
        },
        mouseout() {
          tooltip.hide();
        },
      };
      this.pic = picasso.chart({
        element: document.querySelector(`#${uid} .qdt-barchart-chart`),
        data: [{
          type: 'q',
          key: 'qHyperCube',
          data: qLayout.qHyperCube,
        }],
        settings,
      });
      this.pic.brush('tooltip').on('update', (data) => {
        if (data.length) {
          this.tooltip.show(data);
        } else {
          this.tooltip.hide();
        }
      });
      // No data is return if clicked on an inactive rect. How do we deselect?
      this.pic.brush('select').on('update', (data) => {
        const { select, selectionsOn, beginSelections } = this;
        if (!selectionsOn) beginSelections();
        if (data && data[0] && data[0].values && data[0].values[0] && data[0].values[0].qElemNumber) select(Number(data[0].values[0].qElemNumber));
      });
    }

    @autobind
    beginSelections() {
      this.setState({ selectionsOn: true });
    }

    @autobind
    endSelections() {
      const { pic } = this;
      pic.brush('highlight').end();
      pic.brush('select').end();
      this.setState({ selectionsOn: false });
    }

    @autobind
    async select(qElemNumber) {
      if (this.selections.includes(qElemNumber)) {
        this.selections = this.selections.filter(x => x !== qElemNumber);
      } else if (qElemNumber >= 0) {
        this.selections = [...this.selections, qElemNumber];
      }
    }

    @autobind
    async confirmSelections() {
      const { selections, endSelections, create } = this;
      const { select } = this.props;
      await select(selections);
      endSelections();
      create();
    }

    @autobind
    async cancelSelections() {
      this.endSelections();
    }

    render() {
      const { selectionsOn } = this.state;
      const { cancelSelections, confirmSelections, uid } = this;
      const width = '100%';
      const height = '300px';
      return (
        <div id={uid} className="qtd-picasso-horizontal-bar" style={{ width, height }}>
          <div className="qdt-barchart-header">
            {selectionsOn &&
              <div className="qdt-barchart-selection">
                <button className="lui-button lui-button--danger" tabIndex={0} key="cancelSelections" onClick={() => cancelSelections()}><span className="lui-icon lui-icon--close" /></button>
                <button className="lui-button lui-button--success" tabIndex={0} key="confirmSelections" onClick={() => confirmSelections()}><span className="lui-icon lui-icon--tick" /></button>
              </div>
            }
            <div className="qdt-barchart-chart" style={{ width, height }} />
          </div>
        </div>
      );
    }
}
QdtChartComponent.propTypes = {
//   qLayout: PropTypes.object.isRequired,
  //   qData: PropTypes.object.isRequired,
//   qObject: PropTypes.object.isRequired,
  select: PropTypes.object.isRequired,
};

const QdtChart = withHyperCube(QdtChartComponent);
QdtChart.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  qLayout: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['horizontal', 'vertical', 'pie']).isRequired,
  cols: PropTypes.array,
  qHyperCubeDef: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
};
properties.hyperCube.qHyperCubeDef.qInterColumnSortOrder = [1, 0];
properties.hyperCube.qHyperCubeDef.qInitialDataFetch.qWidth = 2;
properties.hyperCube.qHyperCubeDef.qInitialDataFetch.qHeight = 50;
QdtChart.defaultProps = {
  cols: null,
  qHyperCubeDef: properties.hyperCube.qHyperCubeDef,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 2,
    qHeight: 50,
  },
  width: '100%',
  height: '100%',
};

export default QdtChart;
