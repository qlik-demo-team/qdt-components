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
      x: { data: { extract: { field: 'qDimensionInfo/0' } }, expand: 0.01 },
      y: { data: { field: 'qMeasureInfo/0' }, include: [0], invert: true, expand: 0.015 },
    },
    components: [],
    interactions: [],
  };
  if (type === 'standard') {
    if (xAxisProp) defaultProperties.components.push(axis(merge({ scale: 'x' }, xAxisProp)));
    if (yAxisProp) defaultProperties.components.push(axis(merge({ scale: 'y' }, yAxisProp)));
    if (gridProp) defaultProperties.components.push(grid(merge({ x: false, y: true }, gridProp)));
    if (lineAreaProp) defaultProperties.components.push(lineArea(merge({ showArea }, lineAreaProp)));
    if (pointProp) defaultProperties.components.push(point(merge({}, pointProp)));
    if (rangeProp) {
      defaultProperties.components.push(range(merge({}, rangeProp)));
      defaultProperties.interactions.push(rangePan());
    }
    if (tooltipProp) {
      defaultProperties.components.push(tooltip(merge({}, tooltipProp)));
      defaultProperties.interactions.push(tooltipHover());
    }
  }
  if (type === 'multi') {
    defaultProperties.scales.color = {
      data: { extract: { field: 'qDimensionInfo/1' } },
      range: Object.values(theme.palette).map((color) => color.main),
      type: 'color',
    };
    if (xAxisProp) defaultProperties.components.push(axis(merge({ scale: 'x' }, xAxisProp)));
    if (yAxisProp) defaultProperties.components.push(axis(merge({ scale: 'y' }, yAxisProp)));
    if (gridProp) defaultProperties.components.push(grid(merge({ x: false, y: true }, gridProp)));
    if (lineAreaProp) defaultProperties.components.push(
      lineArea(
        merge({ 
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
        }, 
        lineAreaProp)
      )
    );
    if (pointProp) {
      defaultProperties.components.push(point(merge({}, pointProp)));
      defaultProperties.scales.x
    }
    if (rangeProp) {
      defaultProperties.components.push(range(merge({}, rangeProp)));
      defaultProperties.interactions.push(rangePan());
    }
    if (tooltipProp) {
      defaultProperties.components.push(tooltip(merge({}, tooltipProp)));
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
    if (xAxisProp) defaultProperties.components.push(axis(merge({ scale: 'x' }, xAxisProp)));
    if (yAxisProp) defaultProperties.components.push(axis(merge({ scale: 'y' }, yAxisProp)));
    if (gridProp) defaultProperties.components.push(grid(merge({ x: false, y: true }, gridProp)));
    if (lineAreaProp) defaultProperties.components.push(
      lineArea(
        merge({ 
          showArea,
          properties: {
            data: { collection: 'stacked' },
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
        }, 
        lineAreaProp)
      )
    );
    if (pointProp) defaultProperties.components.push(point(merge({}, pointProp)));
    if (rangeProp) {
      defaultProperties.components.push(range(merge({}, rangeProp)));
      defaultProperties.interactions.push(rangePan());
    }
    if (tooltipProp) {
      defaultProperties.components.push(tooltip(merge({}, tooltipProp)));
      defaultProperties.interactions.push(tooltipHover());
    }
  }
  if (type === 'rangeArea') {
    defaultProperties.scales.y.data = { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] };
    if (xAxisProp) defaultProperties.components.push(axis(merge({ scale: 'x' }, xAxisProp)));
    if (yAxisProp) defaultProperties.components.push(axis(merge({ scale: 'y' }, yAxisProp)));
    if (gridProp) defaultProperties.components.push(grid(merge({ x: false, y: true }, gridProp)));
    defaultProperties.components.push(lineArea({ 
      showArea: true,
      properties: {
        data: {
          extract: {
            props: {
              y0: { field: 'qMeasureInfo/0' }, 
              y: { field: 'qMeasureInfo/1' }, 
            }
          }
        },
        settings: {
          coordinates: {
            minor0: { scale: 'y', ref: 'y0', fn: null }
          }
        }
      }
     }));
     defaultProperties.components.push(point({
      properties: {
        data: {
          extract: {
            props: {
              y: { field: 'qMeasureInfo/1' },
              num: { field: 'qMeasureInfo/1' },
            },
          },
        },
      },
    }));
    defaultProperties.components.push(lineArea({
      showArea: false,
      properties: {
        key: 'line2',
        data: {
          extract: {
            props: {
              y: { field: 'qMeasureInfo/0' },
            },
          },
        },
        settings: {
          paddingStart: 10,
          layers: {
            area: {
              show: false,
            },
            line: {
              stroke: theme.palette.secondary.main,
            },
          },
        },
      },
    }));
    defaultProperties.components.push(point({
      properties: {
        key: 'point2',
        data: {
          extract: {
            props: {
              y: { field: 'qMeasureInfo/0' },
              num: { field: 'qMeasureInfo/0' },
            },
          },
        },
        settings: {
          fill: theme.palette.secondary.main,
          stroke: theme.palette.secondary.main,
        },
      },
    }));
    if (rangeProp) {
      defaultProperties.components.push(range(merge({}, rangeProp)));
      defaultProperties.interactions.push(rangePan());
    }
    if (tooltipProp) {
      defaultProperties.components.push(tooltip(merge({}, tooltipProp)));
      defaultProperties.interactions.push(tooltipHover());
    }
  }
  const properties = merge(defaultProperties, propertiesProp);
  
  return properties;
};

export default lineChart;
