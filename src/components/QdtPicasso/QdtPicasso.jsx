import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import picasso from 'picasso.js';
import picassoHammer from 'picasso-plugin-hammer';
import picassoQ from 'picasso-plugin-q';
import useHyperCube from '../../hooks/useHyperCube';
import { domPointLabel, domPointImage } from './picasso/components';
import preconfiguredSettings from './picasso/settings';
import QdtPicassoMiniMap from './QdtPicassoMiniMap';
import LuiSelectionModal from '../QdtLui/LuiSelectionModal';
import '../../styles/index.scss';
import './style.scss';


let _settings = null;
let pic = null;
let maxWidth = '100%';
let maxHeight = '100%';

picasso.component('domPointLabel', domPointLabel);
picasso.component('domPointImage', domPointImage);
picasso.use(picassoHammer);
picasso.use(picassoQ);

const QdtPicasso = ({
  settings, type, prio, options, innerHeight, outerWidth, innerWidth, outerHeight, afterConfirmSelections, miniMapVisible, ...otherProps
}) => {
  const rootNode = useRef(null);
  const elementNode = useRef(null);
  const [isSelectionBarVisible, setSelectionBarVisible] = useState(false);
  const {
    beginSelections, endSelections, qLayout, qData, qRData, offset, selections, select,
  } = useHyperCube({ ...otherProps });

  let _innerHeight = innerHeight;

  const offsetPicasso = (qTop) => offset(qTop);

  const handleResize = () => pic.update();

  const cancelSelections = () => {
    const { brush } = pic;
    brush('select').end();
    endSelections(false);
    setSelectionBarVisible(false);
  };

  const createPic = async () => {
    if (type === 'horizontalBarchart' && options.bar && options.bar.height && innerHeight === '100%') {
      maxHeight = qData.qMatrix.length * options.bar.height;
      _innerHeight = maxHeight;
    }
    if (type === 'verticalBarchart') {
      maxWidth = qData.qMatrix.length * 50;
      _innerHeight = outerHeight - 50; // Add the  mini map
    }
    _settings = type ? preconfiguredSettings[type] : settings;
    const data = { ...qLayout, qHyperCube: { ...qLayout.qHyperCube, qDataPages: [qData] } };
    if (type === 'horizontalBarchart' && options.bar && options.bar.fill) {
      _settings.components[2].settings.box.fill = options.bar.fill;
    }
    if (type === 'verticalGauge' && options.min) {
      _settings.scales.y.min = options.min;
      _settings.components[1].start = options.min;
      _settings.components[2].start = options.min;
    }
    if (type === 'verticalGauge' && options.max) {
      _settings.scales.y.max = options.max;
      _settings.components[1].end = options.max;
    }
    pic = picasso({ renderer: { prio: [prio] } }).chart({
      element: elementNode.current,
      data: [{
        type: 'q',
        key: 'qHyperCube',
        data: data.qHyperCube,
      }],
      settings: _settings,
    });
    pic.brush('select').on('start', () => {
      beginSelections();
      // select(0, [], false);
      setSelectionBarVisible(true);
    });
    pic.brush('select').on('update', (added, removed) => {
      if (!selections && !added) return;
      const _selections = [...added, ...removed].map((v) => v.values[0]);
      select(0, _selections);
    });
  };

  const updatePic = () => {
    const data = { ...qLayout, qHyperCube: { ...qLayout.qHyperCube, qDataPages: [qData] } };
    if (type === 'horizontalBarchart' && options.bar && options.bar.fill) {
      _settings.components[2].settings.box.fill = options.bar.fill;
    }
    if (type === 'verticalGauge' && options.min) {
      _settings.scales.y.min = options.min;
      _settings.components[1].start = options.min;
      _settings.components[2].start = options.min;
    }
    if (type === 'verticalGauge' && options.max) {
      _settings.scales.y.max = options.max;
      _settings.components[1].end = options.max;
    }
    pic.update({
      data: [{
        type: 'q',
        key: 'qHyperCube',
        data: data.qHyperCube,
      }],
      settings: _settings,
    });
  };

  const confirmSelections = async () => {
    const { brush } = pic;
    brush('select').end();
    await endSelections(true);
    if (afterConfirmSelections) { afterConfirmSelections(); }
    setSelectionBarVisible(false);
  };

  const handleOutsideClick = (event) => {
    if (isSelectionBarVisible) {
      const outsideClick = !rootNode.current.contains(event.target);
      if (outsideClick && selections) confirmSelections();
    }
  };

  useEffect(() => {
    if (qData && !isSelectionBarVisible) createPic();
    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qData]);

  return (
    <div ref={rootNode} style={{ position: 'relative' }}>
      <div style={{
        position: 'relative',
        width: outerWidth,
        height: outerHeight,
        overflow: 'auto',
        paddingRight: 10,
        border: (isSelectionBarVisible) ? '1px solid #CCCCCC' : 'none',
        overflowX: (isSelectionBarVisible) ? 'hidden' : 'auto',
        overflowY: (isSelectionBarVisible) ? 'hidden' : 'auto',
      }}
      >
        <div
          ref={elementNode}
          style={{
            width: innerWidth,
            height: _innerHeight,
            maxWidth,
            maxHeight,
          }}
        />
      </div>
      { type === 'verticalBarchart' && miniMapVisible
        && (
        <QdtPicassoMiniMap
          qLayout={qLayout}
          qData={qData}
          qRData={qRData}
          offset={offset}
          type={type}
          updatePic={updatePic}
          offsetPicasso={offsetPicasso}
          outerWidth={outerWidth}
          innerWidth={innerWidth}
        />
        )}
      <LuiSelectionModal
        isOpen={isSelectionBarVisible}
        cancelSelections={cancelSelections}
        confirmSelections={confirmSelections}
      />
    </div>
  );
};

QdtPicasso.propTypes = {
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
    'merimekko',
    'pointDistribution',
  ]),
  settings: PropTypes.object,
  options: PropTypes.object,
  outerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  outerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  afterConfirmSelections: PropTypes.func,
  prio: PropTypes.oneOf(['canvas', 'svg']),
  // useHyperCube Props
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.isRequired,
  qPage: PropTypes.object,
  qSortByAscii: PropTypes.oneOf([1, 0, -1]),
  qSortByLoadOrder: PropTypes.oneOf([1, 0, -1]),
  qInterColumnSortOrder: PropTypes.array,
  qSuppressZero: PropTypes.bool,
  qSortByExpression: PropTypes.oneOf([1, 0, -1]),
  qSuppressMissing: PropTypes.bool,
  qExpression: PropTypes.object,
  getQRData: PropTypes.bool,
  miniMapVisible: PropTypes.bool,
};

QdtPicasso.defaultProps = {
  type: null,
  settings: {},
  options: {},
  outerWidth: '100%',
  outerHeight: '100%',
  innerWidth: '100%',
  innerHeight: '100%',
  afterConfirmSelections: null,
  prio: 'canvas',
  // useHyperCube Props
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 10,
    qHeight: 1000,
  },
  qSortByAscii: 1,
  qSortByLoadOrder: 1,
  qInterColumnSortOrder: [],
  qSuppressZero: false,
  qSortByExpression: 0,
  qSuppressMissing: false,
  qExpression: null,
  getQRData: true,
  miniMapVisible: false,
};

export default QdtPicasso;
