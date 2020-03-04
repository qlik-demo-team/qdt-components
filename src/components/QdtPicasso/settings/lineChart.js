/* eslint-disable */
import { Light as defaultTheme } from 'themes';
import merge from 'utils/merge';
import axis from './components/axis';
import grid from './components/grid';
import lineArea from './components/lineArea';
import point from './components/point';
import range from './components/range';
import tooltip from './components/tooltip';
import rangePan from './interactions/rangePan';
import tooltipHover from './interactions/tooltipHover';

const lineChart = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
  showArea = false,
  xAxis: xAxisProp = {},
  yAxis: yAxisProp = {},
  grid: gridProp = {},
  lineArea: lineAreaProp = {},
  point: pointProp = {},
  range: rangeProp = {},
  tooltip: tooltipProp = {},
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = {
    scales: {
      x: { data: { extract: { field: 'qDimensionInfo/0' } } },
      y: { data: { field: 'qMeasureInfo/0' }, invert: true },
    },
    components: [],
    interactions: [],
  };
  if (xAxisProp) defaultProperties.components.push(merge(axis({ scale: 'x' }), xAxisProp));
  if (yAxisProp) defaultProperties.components.push(merge(axis({ scale: 'y' }), yAxisProp));
  if (gridProp) defaultProperties.components.push(merge(grid({ x: false, y: true }), gridProp));
  if (lineAreaProp) defaultProperties.components.push(merge(lineArea({ showArea }), lineAreaProp));
  if (pointProp) defaultProperties.components.push(merge(point(), pointProp));
  if (rangeProp) {
    defaultProperties.components.push(merge(range(), rangeProp));
    defaultProperties.interactions.push(rangePan());
  }
  if (tooltipProp) {
    defaultProperties.components.push(merge(tooltip(), tooltipProp));
    defaultProperties.interactions.push(tooltipHover());
  }
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default lineChart;
