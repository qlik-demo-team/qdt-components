import React from 'react';
import PropTypes from 'prop-types';
import picasso from 'picasso.js';
import picassoHammer from 'picasso-plugin-hammer';
import picassoQ from 'picasso-plugin-q';
import withHyperCube from './withHyperCube';
import { domPointLabel, domPointImage } from '../picasso/components';
import preconfiguredSettings from '../picasso/settings';
import '../styles/index.scss';

picasso.component('domPointLabel', domPointLabel);
picasso.component('domPointImage', domPointImage);
picasso.use(picassoHammer);
picasso.use(picassoQ);

class QdtPicassoComponent extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,
    beginSelections: PropTypes.func.isRequired,
    endSelections: PropTypes.func.isRequired,
    selections: PropTypes.bool.isRequired,
    outerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    outerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    innerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    innerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    type: PropTypes.string,
    settings: PropTypes.object,
    options: PropTypes.object,
    afterConfirmSelections: PropTypes.func,
    prio: PropTypes.oneOf(['canvas', 'svg']),
  }

  static defaultProps = {
    type: null,
    settings: {},
    options: {},
    afterConfirmSelections: null,
    prio: 'canvas',
  }

  constructor(props) {
    super(props);
    this.mySettings = null;
  }

  componentDidMount() {
    this.createPic();
    window.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    this.updatePic();
    this.updatePic();
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('resize', this.handleResize);
  }

  handleOutsideClick = (event) => {
    const outsideClick = !this.root.contains(event.target);
    if (outsideClick) {
      this.confirmSelections();
    }
  }

  handleResize = () => {
    this.pic.update();
  }

  cancelSelections = () => {
    const { brush } = this.pic;
    const { endSelections } = this.props;
    brush('select').end();
    endSelections(false);
  }

  confirmSelections = () => {
    const { brush } = this.pic;
    const { selections, endSelections, afterConfirmSelections } = this.props;
    if (selections) {
      brush('select').end();
      endSelections(true);
      if (afterConfirmSelections) { afterConfirmSelections(); }
    }
  }

  createPic = async () => {
    const {
      qLayout, qData, settings, type, prio, options, select, selections, beginSelections,
    } = this.props;
    this.mySettings = type ? preconfiguredSettings[type] : settings;
    const data = { ...qLayout, qHyperCube: { ...qLayout.qHyperCube, qDataPages: [qData] } };
    if (type === 'horizontalBarchart' && options.bar && options.bar.fill) {
      this.mySettings.components[2].settings.box.fill = options.bar.fill;
    }
    if (type === 'verticalGauge' && options.min) {
      this.mySettings.scales.y.min = options.min;
      this.mySettings.components[1].start = options.min;
      this.mySettings.components[2].start = options.min;
    }
    if (type === 'verticalGauge' && options.max) {
      this.mySettings.scales.y.max = options.max;
      this.mySettings.components[1].end = options.max;
    }
    this.pic = picasso({ renderer: { prio: [prio] } }).chart({
      element: this.element,
      data: [{
        type: 'q',
        key: 'qHyperCube',
        data: data.qHyperCube,
      }],
      settings: this.mySettings,
    });
    this.pic.brush('select').on('start', () => { beginSelections(); select(0, [], false); });
    this.pic.brush('select').on('update', (added, removed) => {
      if (!selections && !added) return;
      const mySelections = [...added, ...removed].map(v => v.values[0]);
      select(0, mySelections);
    });
  }

  updatePic = () => {
    const { selections } = this.props;
    if (selections) return;
    const {
      qLayout, qData, type, options,
    } = this.props;
    const data = { ...qLayout, qHyperCube: { ...qLayout.qHyperCube, qDataPages: [qData] } };
    if (type === 'horizontalBarchart' && options.bar && options.bar.fill) {
      this.mySettings.components[2].settings.box.fill = options.bar.fill;
    }
    if (type === 'verticalGauge' && options.min) {
      this.mySettings.scales.y.min = options.min;
      this.mySettings.components[1].start = options.min;
      this.mySettings.components[2].start = options.min;
    }
    if (type === 'verticalGauge' && options.max) {
      this.mySettings.scales.y.max = options.max;
      this.mySettings.components[1].end = options.max;
    }
    this.pic.update({
      data: [{
        type: 'q',
        key: 'qHyperCube',
        data: data.qHyperCube,
      }],
      settings: this.mySettings,
    });
  }

  render() {
    const {
      selections, type, qData, outerWidth, outerHeight, innerWidth, innerHeight, options,
    } = this.props;
    let myInnerHeight = innerHeight;
    let maxWidth = '100%';
    let maxHeight = '100%';
    if (type === 'horizontalBarchart' && options.bar && options.bar.height && innerHeight === '100%') {
      maxHeight = qData.qMatrix.length * options.bar.height;
      myInnerHeight = maxHeight;
    }
    if (type === 'verticalBarchart') {
      maxWidth = qData.qMatrix.length * 50;
    }
    return (
      <div ref={node => this.root = node} style={{ position: 'relative' }}>
        {selections
          && (
          <div style={{ position: 'absolute', top: '-2rem', right: 0 }}>
            <button type="button" className="lui-button lui-button--danger" style={{ marginRight: '1rem' }} onClick={this.cancelSelections}>
              <span className="lui-icon lui-icon--close" />
            </button>
            <button type="button" className="lui-button lui-button--success" style={{ marginRight: '1rem' }} onClick={this.confirmSelections}>
              <span className="lui-icon lui-icon--tick" />
            </button>
          </div>
          )
        }
        <div style={{
          position: 'relative', width: outerWidth, height: outerHeight, overflow: 'auto', paddingRight: 10,
        }}
        >
          <div
            ref={node => this.element = node}
            style={{
              width: innerWidth,
              height: myInnerHeight,
              maxWidth,
              maxHeight,
            }}
          />
        </div>
      </div>
    );
  }
}

const QdtPicasso = withHyperCube(QdtPicassoComponent);
QdtPicasso.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qHyperCubeDef: PropTypes.object,
  qPage: PropTypes.object,
  type: PropTypes.oneOf([
    'comboLineBarchart',
    'horizontalBarchart',
    'lineChart',
    'multiLineChart',
    'pie',
    'piechart',
    'scatterplot',
    'verticalBarchart',
    'verticalGroupBarchart',
    'stackedBarchart',
    'verticalGauge',
    'verticalRangeGauge',
    'rangeArea',
    'gantt',
  ]),
  settings: PropTypes.object,
  options: PropTypes.object,
  outerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  outerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  afterConfirmSelections: PropTypes.func,
  prio: PropTypes.oneOf(['canvas', 'svg']),
};
QdtPicasso.defaultProps = {
  cols: null,
  qHyperCubeDef: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 10,
    qHeight: 1000,
  },
  type: null,
  settings: {},
  options: {},
  outerWidth: '100%',
  outerHeight: '100%',
  innerWidth: '100%',
  innerHeight: '100%',
  afterConfirmSelections: null,
  prio: 'canvas',
};

export default QdtPicasso;
