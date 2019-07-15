import React from 'react';
import PropTypes from 'prop-types';
import picasso from 'picasso.js';
import picassoHammer from 'picasso-plugin-hammer';
import picassoQ from 'picasso-plugin-q';
import withHyperCube from './withHyperCube';
import preconfiguredSettings from '../picasso/settings';
import '../styles/index.scss';

picasso.use(picassoHammer);
picasso.use(picassoQ);

class QdtPicassoMiniMapComponent extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qRData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    outerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    innerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    type: PropTypes.string.isRequired,
    offset: PropTypes.func.isRequired,
    setQTop: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.settings = null;
    this.state = {
      left: 0,
      width: 0,
    };
    this.height = 50;
  }

  componentDidMount() {
    this.createPic();
    window.addEventListener('click', this.handleOutsideClick);
    this.calculate();
  }

  componentDidUpdate(prevProps) {
    const { qData } = this.props;
    if (qData.qArea.qTop !== prevProps.qData.qArea.qTop) this.calculate();
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
  }

  calculate = () => {
    const { qLayout: { qHyperCube: { qSize: { qcy } } }, qData: { qArea: { qHeight, qTop } } } = this.props; // qcy = totalRows
    const totalWidth = this.element.getBoundingClientRect().width;
    const pages = Math.round(qcy / qHeight);
    const width = totalWidth / pages;
    const currentPage = qTop / qHeight;
    const left = width * currentPage;
    this.setState({ left, width });
  }

  // Capture all clicks outside of the component
  handleOutsideClick = async (event) => {
    const { target, pageX } = event;
    const { offset, setQTop, qData: { qArea: { qTop, qHeight } } } = this.props;
    const { left, width } = this.state;
    const insideClick = this.root.contains(target);
    // Check if the click is inside the miniMap
    if (insideClick) {
      // Check if the click is to the left of the current page overlay
      if (pageX < left) {
        const position = qTop - qHeight;
        await offset(position);
        setQTop(position);
      // Check if the click is to the right of the current page overlay
      } else if (pageX > (left + width)) {
        const position = qTop + qHeight;
        await offset(position);
        setQTop(position);
      }
    }
  }

  createPic = async () => {
    const {
      qLayout, qRData, type,
    } = this.props;
    const tempSettings = preconfiguredSettings[type];
    this.settings = {
      components: [],
      scales: tempSettings.scales,
    };
    const data = { ...qLayout, qHyperCube: { ...qLayout.qHyperCube, qDataPages: [qRData] } };
    if (type === 'horizontalBarchart' || type === 'verticalBarchart') {
      const { components: [,, box] } = tempSettings;
      const { brush, ...noInteractionBox } = box;
      this.settings.components.push(noInteractionBox);
    }
    this.pic = picasso({ renderer: { prio: ['canvas'] } }).chart({
      element: this.element,
      data: [{
        type: 'q',
        key: 'qHyperCube',
        data: data.qHyperCube,
      }],
      settings: this.settings,
    });
  }

  render() {
    const { outerWidth, innerWidth } = this.props;
    const { left, width } = this.state;
    const { height } = this;
    return (
      <div ref={node => this.root = node} style={{ position: 'relative' }}>
        <div style={{
          position: 'relative', width: outerWidth, height: '50px', overflow: 'auto', paddingRight: 10,
        }}
        >
          <div
            ref={node => this.element = node}
            style={{
              backgroundColor: '#EFEFEF',
              padding: 3,
              width: innerWidth,
              height,
              maxWidth: '100%',
              maxHeight: height,
              cursor: 'pointer',
            }}
          />
          <div
            style={{
              border: '1px solid rgba(89, 89, 89, 0.4)',
              backgroundColor: 'rgba(0,0,0,0.1)',
              position: 'absolute',
              top: 0,
              left,
              width,
              padding: 0,
              height,
              maxHeight: height,
              cursor: 'default',
            }}
          />
        </div>
      </div>
    );
  }
}

const QdtPicassoMiniMap = withHyperCube(QdtPicassoMiniMapComponent);
QdtPicassoMiniMap.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qHyperCubeDef: PropTypes.object,
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
  outerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  outerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
QdtPicassoMiniMap.defaultProps = {
  cols: null,
  qHyperCubeDef: null,
  type: null,
  settings: {},
  outerWidth: '100%',
  outerHeight: 100,
  innerWidth: '100%',
  innerHeight: '100%',
};

export default QdtPicassoMiniMap;
