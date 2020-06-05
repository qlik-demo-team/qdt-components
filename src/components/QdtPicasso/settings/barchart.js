import { format } from 'd3-format';
import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';
import axis from './components/axis';
import box from './components/box';
import grid from './components/grid';
import labels from './components/labels';
import legend from './components/legend';
import range from './components/range';
import tooltip from './components/tooltip';
import rangePan from './interactions/rangePan';
import tooltipHover from './interactions/tooltipHover';
import './utils/formatters';

const BarChart = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
  orientation = 'vertical',
  type = 'standard',
  xAxis: xAxisProp = {},
  yAxis: yAxisProp = {},
  grid: gridProp = {},
  box: boxProp = {},
  labels: labelsProp = {},
  legend: legendProp = {},
  range: rangeProp = {},
  tooltip: tooltipProp = {},
} = {}) => {
  const theme = merge(defaultTheme, themeProp);
  const majorScale = (orientation === 'vertical' && 'x') || (orientation === 'horizontal' && 'y') || null;
  const minorScale = (orientation === 'vertical' && 'y') || (orientation === 'horizontal' && 'x') || null;
  const defaultProperties = {
    scales: {
      [majorScale]: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.2 },
      [minorScale]: { data: { field: 'qMeasureInfo/0' }, include: [0], invert: orientation === 'vertical' },
    },
    components: [],
    interactions: [],
  };
  if (type === 'standard') {
    if (xAxisProp) defaultProperties.components.push(axis(merge({ scale: 'x' }, xAxisProp)));
    if (yAxisProp) defaultProperties.components.push(axis(merge({ scale: 'y' }, yAxisProp)));
    if (gridProp) {
      defaultProperties.components.push(
        grid(
          merge({ x: orientation === 'horizontal', y: orientation === 'vertical' }, gridProp),
        ),
      );
    }
    if (boxProp) {
      defaultProperties.components.push(
        box(
          merge({ orientation }, boxProp),
        ),
      );
    }
    if (labelsProp) defaultProperties.components.push(labels(merge({ orientation }, labelsProp)));
    if (rangeProp) {
      defaultProperties.components.push(range(merge({ scale: majorScale }, rangeProp)));
      defaultProperties.interactions.push(rangePan({ scale: majorScale }));
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
          value: (d) => d.qText, // qElemNumber
          props: {
            series: { field: 'qDimensionInfo/1', value: (d) => d.qText },
            end: { field: 'qMeasureInfo/0' },
            qElemNumber: { value: (d) => d.qElemNumber },
          },
        },
        stack: {
          stackKey: (d) => d.value,
          value: (d) => d.end.value,
        },
      },
    }];
    defaultProperties.scales[majorScale].data = {
      extract: {
        field: 'qDimensionInfo/0',
        value: (d) => d.qText,
      },
    };
    defaultProperties.scales[minorScale].data = { collection: { key: 'stacked' } };
    defaultProperties.scales.color = {
      data: {
        extract: {
          field: 'qDimensionInfo/1',
          value: (d) => d.qText,
        },
      },
      range: Object.values(theme.palette).map((color) => color.main),
      type: 'color',
    };
    if (xAxisProp) defaultProperties.components.push(axis(merge({ scale: 'x' }, xAxisProp)));
    if (yAxisProp) defaultProperties.components.push(axis(merge({ scale: 'y' }, yAxisProp)));
    if (gridProp) {
      defaultProperties.components.push(
        grid(
          merge({ x: orientation === 'horizontal', y: orientation === 'vertical' }, gridProp),
        ),
      );
    }
    if (boxProp) {
      defaultProperties.components.push(
        box(
          merge({
            orientation,
            properties: {
              data: { collection: 'stacked' },
              settings: {
                box: {
                  fill: { scale: 'color', ref: 'series' },
                  strokeWidth: 0,
                },
              },
              brush: {
                trigger: [{
                  on: 'tap',
                  contexts: ['select'],
                  data: ['qElemNumber'],
                }],
              },
            },
          },
          boxProp),
        ),
      );
    }
    if (labelsProp) defaultProperties.components.push(labels(merge({ orientation }, labelsProp)));
    if (legendProp) defaultProperties.components.push(legend(merge({ properties: { scale: 'color' } }, legendProp)));
    if (rangeProp) {
      defaultProperties.components.push(range(merge({ scale: majorScale }, rangeProp)));
      defaultProperties.interactions.push(rangePan({ scale: majorScale }));
    }
    if (tooltipProp) {
      defaultProperties.components.push(tooltip(merge({}, tooltipProp)));
      defaultProperties.interactions.push(tooltipHover());
    }
  }
  if (type === 'group') { /* define group barchart */ }
  if (type === 'butterfly') {
    defaultProperties.scales[minorScale] = {
      data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] },
      expand: 0.1,
      min: ({ data }) => -Math.max(...data.fields.map((f) => f.max())) * 1.1,
    };
    defaultProperties.scales.color = {
      range: [theme.palette.primary.main, theme.palette.secondary.main],
      type: 'color',
    };
    if (xAxisProp) defaultProperties.components.push(axis(merge({ scale: 'x', formatter: { type: 'abs' } }, xAxisProp)));
    if (yAxisProp) defaultProperties.components.push(axis(merge({ scale: 'y' }, yAxisProp)));
    if (gridProp) {
      defaultProperties.components.push(
        grid(
          merge({ x: orientation === 'horizontal', y: orientation === 'vertical' }, gridProp),
        ),
      );
    }
    if (boxProp) {
      defaultProperties.components.push(
        box(
          merge({
            orientation,
            properties: {
              settings: {
                minor: {
                  start: (d) => d.resources.scale(minorScale)(0),
                  end: (d) => d.resources.scale(minorScale)(d.datum.end.value * -1),
                },
                box: {
                  fill: (d) => d.resources.scale('color')(0),
                },
              },
            },
          },
          boxProp),
        ),
      );
      defaultProperties.components.push(
        box(
          merge({
            orientation,
            properties: {
              data: {
                extract: {
                  props: {
                    end: { field: 'qMeasureInfo/1' },
                  },
                },
              },
              settings: {
                minor: {
                  start: (d) => d.resources.scale(minorScale)(0),
                  end: (d) => d.resources.scale(minorScale)(d.datum.end.value),
                },
                box: {
                  fill: (d) => d.resources.scale('color')(1),
                },
              },
            },
          },
          boxProp),
        ),
      );
    }
    if (labelsProp) defaultProperties.components.push(labels(merge({ orientation }, labelsProp)));
    if (rangeProp) {
      defaultProperties.components.push(range(merge({ scale: majorScale }, rangeProp)));
      defaultProperties.interactions.push(rangePan({ scale: majorScale }));
    }
    if (tooltipProp) {
      defaultProperties.components.push(tooltip(merge({}, tooltipProp)));
      defaultProperties.interactions.push(tooltipHover());
    }
  }
  if (type === 'rank') {
    defaultProperties.scales[majorScale].data.extract.props = {
      rank: { field: 'qMeasureInfo/1' },
    };
    defaultProperties.scales[majorScale].data.sort = (a, b) => a.rank.value - b.rank.value;
    defaultProperties.scales[minorScale].expand = 0.5;
    defaultProperties.scales.color = {
      data: { extract: { field: 'qMeasureInfo/1' } },
      range: [theme.palette.primary.main, theme.palette.secondary.main],
      type: 'color',
    };
    if (gridProp) {
      defaultProperties.components.push(
        grid(
          merge({ x: orientation === 'horizontal', y: orientation === 'vertical' }, gridProp),
        ),
      );
    }
    defaultProperties.components.push(
      box({
        orientation,
        properties: {
          data: {
            extract: {
              props: { rank: { field: 'qMeasureInfo/1' } },
            },
          },
          settings: {
            major: {
              fn: (d) => (d.datum.rank.value * d.scale.step()) - (d.scale.paddingOuter() * d.scale.bandwidth()) - (0.5 * d.scale.bandwidth()),
            },
            box: {
              fill: { scale: 'color', fn: (d) => d.scale(d.datum.rank.value) },
              strokeWidth: 0,
              width: 0.25,
            },
          },
        },
      }),
    );
    // defaultProperties.components.push(
    //   box({
    //     orientation,
    //     properties: {
    //       key: 'end-bars',
    //       data: {
    //         extract: {
    //           props: {
    //             start: { field: 'qMeasureInfo/0' },
    //             end: { field: 'qMeasureInfo/0' },
    //             rank: { field: 'qMeasureInfo/1' },
    //           },
    //         },
    //       },
    //       settings: {
    //         major: {
    //           fn: (d) => (d.datum.rank.value * d.scale.step()) - (d.scale.paddingOuter() * d.scale.bandwidth()) - (0.5 * d.scale.bandwidth()),
    //         },
    //         box: {
    //           fill: { scale: 'c', fn: (d) => d.scale(d.datum.rank.value) },
    //           width: 0.6,
    //           minHeightPx: 3,
    //         },
    //       },
    //     },
    //   }),
    // );
    defaultProperties.components.push(
      box({
        orientation,
        properties: {
          key: 'label-bars',
          data: {
            extract: {
              props: { rank: { field: 'qMeasureInfo/1' } },
            },
          },
          settings: {
            major: {
              fn: (d) => (d.datum.rank.value * d.scale.step()) - (d.scale.paddingOuter() * d.scale.bandwidth()) - (0.5 * d.scale.bandwidth()),
            },
            box: {
              opacity: 0,
              width: 1,
            },
          },
        },
      }),
    );
    const valueLabels = labels({
      orientation,
      component: 'label-bars',
      labels: [{
        placements: [{ position: 'outside', fill: '#666' }],
        label: (node) => format('$.3s')(node.data.end.value).replace(/G/, 'B'),
      }],
    });
    valueLabels.settings.sources[0].strategy.settings.fontSize = 12;
    valueLabels.settings.sources[0].strategy.settings.padding = {
      top: 0, right: 0, bottom: 0, left: 6,
    };
    defaultProperties.components.push(valueLabels);
    const axisLabels = labels({
      orientation,
      component: 'label-bars',
      labels: [{
        placements: [{ position: 'opposite', fill: '#666' }],
        label: (node) => node.data.label,
      }],
    });
    axisLabels.settings.sources[0].strategy.settings.fontSize = 14;
    axisLabels.settings.sources[0].strategy.settings.padding = {
      top: 0, right: 8, bottom: 0, left: 0,
    };
    defaultProperties.components.push(axisLabels);
  }
  if (type === 'mekko') { /* define merimekko */ }
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default BarChart;
