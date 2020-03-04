import { Light as defaultTheme } from 'themes';
import merge from 'utils/merge';
import axis from './components/axis';
import grid from './components/grid';
import line from './components/line';
import point from './components/point';
import range from './components/range';
import tooltip from './components/tooltip';
import rangePan from './interactions/rangePan';
import tooltipHover from './interactions/tooltipHover';

const lineChart = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
  xAxis: xAxisProp = {},
  yAxis: yAxisProp = {},
  grid: gridProp = {},
  line: lineProp = {},
  point: pointProp = {},
  range: rangeProp = {},
  tooltip: tooltipProp = {},
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = {
    scales: {
      x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.2 },
      y: { data: { field: 'qMeasureInfo/0' }, expand: 0.1, invert: true },
    },
    components: [],
    interactions: [],
  };
  if (xAxisProp) defaultProperties.components.push(merge(axis({ scale: 'x' }), xAxisProp));
  if (yAxisProp) defaultProperties.components.push(merge(axis({ scale: 'y' }), yAxisProp));
  if (gridProp) defaultProperties.components.push(merge(grid({ x: false, y: true }), gridProp));
  if (lineProp) defaultProperties.components.push(merge(line(), lineProp));
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
