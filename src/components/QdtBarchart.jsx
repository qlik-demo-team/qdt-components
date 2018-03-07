import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import picasso from 'picasso.js';
import picassoQ from 'picasso-plugin-q';
import withHyperCube from './withHyperCube';
import properties from '../properties/barchart';
import hyperCube from '../properties/hypercube';
// import Tooltip from '../utilities/QtdTooltip';
import Tooltip from '../utilities/Tooltip';
import '../styles/index.scss';

class QdtBarchartComponent extends React.Component {
    static propTypes = {
    //   qObject: PropTypes.object.isRequired,
    }
    pic = null;
    selections = [];

    constructor(props) {
      super(props);

      this.tooltip = new Tooltip();
      this.state = {
        selectionsOn: false,
      };
    }

    componentWillMount() {
      picasso.use(picassoQ);
      this.tooltip.create();
    }
    async componentDidMount() {
      const { qObject } = await this.props;
      this.create();
      qObject.on('changed', () => { this.create(); });
    }
    componentDidUpdate() {
    }

    @autobind
    async create() {
      const { tooltip } = this;
      const { qObject } = await this.props;
      const qLayout = await qObject.getLayout();
      const settings = properties.horizontal;
      settings.interactions[0].events = {
        mousemove(e) {
          tooltip.div.x = e.pageX;
          tooltip.div.y = e.pageY;
          if (e.target.id !== 'qdt-barchart2') {
            tooltip.show();
          }
        },
        mouseout() {
          tooltip.hide();
        },
      };
      this.pic = picasso.chart({
        element: document.querySelector('#qdt-barchart2'),
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
        //   me.setState({ tooltipShow: true, tooltipData: data });
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
      const { cancelSelections, confirmSelections } = this;
      const width = '100%';
      const height = '300px';
      return (
        <div className="qtd-picasso-horizontal-bar" style={{ width, height }}>
          <div className="qdt-barchart-header">
            {selectionsOn &&
              <div className="qdt-barchart-selection">
                <button className="lui-button lui-button--danger" tabIndex={0} key="cancelSelections" onClick={() => cancelSelections()}><span className="lui-icon lui-icon--close" /></button>
                <button className="lui-button lui-button--success" tabIndex={0} key="confirmSelections" onClick={() => confirmSelections()}><span className="lui-icon lui-icon--tick" /></button>
              </div>
            }
            <div id="qdt-barchart2" style={{ width, height }} />
          </div>
        </div>
      );
    }
}
QdtBarchartComponent.propTypes = {
//   qLayout: PropTypes.object.isRequired,
  //   qData: PropTypes.object.isRequired,
//   qObject: PropTypes.object.isRequired,
  select: PropTypes.object.isRequired,
};

const QdtBarchart2 = withHyperCube(QdtBarchartComponent);
QdtBarchart2.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  qLayout: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qHyperCubeDef: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
};

hyperCube.qHyperCubeDef.qInterColumnSortOrder = [1, 0];
hyperCube.qHyperCubeDef.qInitialDataFetch.qWidth = 2;
hyperCube.qHyperCubeDef.qInitialDataFetch.qHeight = 50;
QdtBarchart2.defaultProps = {
  cols: null,
  qHyperCubeDef: hyperCube.qHyperCubeDef,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 2,
    qHeight: 50,
  },
  width: '100%',
  height: '100%',
};

export default QdtBarchart2;
