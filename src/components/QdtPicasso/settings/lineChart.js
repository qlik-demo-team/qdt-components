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
  type = 'standard',
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
      y: { data: { field: 'qMeasureInfo/0' }, include: [0], invert: true },
    },
    components: [],
    interactions: [],
  };
  if (type === 'standard') {
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
  }
  if (type === 'multi') {
    defaultProperties.scales.color = {
      data: { extract: { field: 'qDimensionInfo/1' } },
      range: Object.values(theme.palette).map((color) => color.main),
      type: 'color',
    };
    if (xAxisProp) defaultProperties.components.push(merge(axis({ scale: 'x' }), xAxisProp));
    if (yAxisProp) defaultProperties.components.push(merge(axis({ scale: 'y' }), yAxisProp));
    if (gridProp) defaultProperties.components.push(merge(grid({ x: false, y: true }), gridProp));
    if (lineAreaProp) defaultProperties.components.push(
      merge(
        lineArea({ 
          showArea,
          properties: {
            data: {
              extract: {
                props: { series: { field: 'qDimensionInfo/1' } }
              }
            },
            settings: {
              coordinates: {
                layerId: { ref: 'series' }
              },
              layers: {
                line: { stroke: { scale: 'color', ref: 'series' }},
                area: { fill: { scale: 'color', ref: 'series' }}
              }
            }
          }
        }), 
        lineAreaProp
      )
    );
    if (pointProp) defaultProperties.components.push(merge(point(), pointProp));
    if (rangeProp) {
      defaultProperties.components.push(merge(range(), rangeProp));
      defaultProperties.interactions.push(rangePan());
    }
    if (tooltipProp) {
      defaultProperties.components.push(merge(tooltip(), tooltipProp));
      defaultProperties.interactions.push(tooltipHover());
    }
  }
  if (type === 'stacked') {
    defaultProperties.collections = [{
      key: 'stacked',
      data: {
        extract: {
          field: 'qDimensionInfo/0',
          props: {
            series: { field: 'qDimensionInfo/1' },
            end: { field: 'qMeasureInfo/0' },
          },
        },
        stack: {
          stackKey: (d) => d.value,
          value: (d) => d.end.value,
        },
      },
    }];
    defaultProperties.scales.y.data = { collection: { key: 'stacked' } };
    defaultProperties.scales.color = {
      data: { extract: { field: 'qDimensionInfo/1' } },
      range: Object.values(theme.palette).map((color) => color.main),
      type: 'color',
    };
    if (xAxisProp) defaultProperties.components.push(merge(axis({ scale: 'x' }), xAxisProp));
    if (yAxisProp) defaultProperties.components.push(merge(axis({ scale: 'y' }), yAxisProp));
    if (gridProp) defaultProperties.components.push(merge(grid({ x: false, y: true }), gridProp));
    if (lineAreaProp) defaultProperties.components.push(
      merge(
        lineArea({ 
          showArea,
          properties: {
            data: { collection: 'stacked' },
            // settings: {
            //   box: { fill: { scale: 'color', ref: 'series' } },
            // },
            settings: {
              coordinates: {
                minor: { scale: 'y', ref: 'end' },
                minor0: { scale: 'y', ref: 'start' },
                layerId: { ref: 'series' },
              },
              layers: {
                line: { stroke: { scale: 'color', ref: 'series' }},
                area: { fill: { scale: 'color', ref: 'series' }}
              }
            }
          }
        }), 
        lineAreaProp
      )
    );
    if (pointProp) defaultProperties.components.push(merge(point(), pointProp));
    if (rangeProp) {
      defaultProperties.components.push(merge(range(), rangeProp));
      defaultProperties.interactions.push(rangePan());
    }
    if (tooltipProp) {
      defaultProperties.components.push(merge(tooltip(), tooltipProp));
      defaultProperties.interactions.push(tooltipHover());
    }
  }
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default lineChart;
