import { Light as defaultTheme } from 'themes';
import merge from 'utils/merge';
import axis from './components/axis';
import box from './components/box';
import labels from './components/labels';
import tooltip from './components/tooltip';
import range from './components/range';
import rangePan from './interactions/rangePan';
import tooltipHover from './interactions/tooltipHover';

const MerimekkoChart = ({
  theme: themeProp = {},
} = {}) => {
  const theme = merge(defaultTheme, themeProp);
  return {
    collections: [{
      key: 'stacked',
      data: {
        extract: {
          field: 'qDimensionInfo/1',
          props: {
            series: { field: 'qDimensionInfo/0' },
            metric: { field: 'qMeasureInfo/0', reduce: 'sum' },
            end: { field: 'qMeasureInfo/0', reduce: 'sum' },
          },
        },
        stack: {
          stackKey: (d) => d.series.value,
          value: (d) => d.end.value,
          offset: 'expand',
        },
      },
    },
    {
      key: 'span',
      data: {
        extract: {
          field: 'qDimensionInfo/0',
          trackBy: (d) => d.qElemNumber,
          reduce: 'first',
          props: {
            series: { field: 'qDimensionInfo/0' },
            metric: { field: 'qMeasureInfo/0' },
            end: { field: 'qMeasureInfo/0' },
          },
        },
        stack: {
          stackKey: () => -1,
          value: (d) => d.end.value,
          offset: 'expand',
        },
      },
    },
    ],
    scales: {
      y: { data: { collection: { key: 'stacked' } }, invert: true },
      b: {
        data: { collection: { key: 'span' } },
        type: 'band',
      },
      x: { // m
        data: { collection: { key: 'span' } },
        max: 1,
      },
      c: {
        data: { extract: { field: 'qDimensionInfo/1' } },
        // range: Object.values(theme.palette).map((color) => color.main),
        range: theme.range,
        type: 'color',
      },
    },
    components: [
      axis({
        scale: 'y',
        formatter: {
          type: 'd3-number',
          format: '.0%',
        },
      }),
      axis({
        scale: 'x',
        formatter: {
          type: 'd3-number',
          format: '.0%',
        },
      }),
      box({
        properties: {
          key: 'rects',
          data: { collection: 'stacked' },
          displayOrder: 1,
          settings: {
            major: {
              binStart: {
                scale: 'x',
                fn: (b) => {
                  const ss = b.resources.scale('b');
                  return b.resources.scale('x')(ss.datum(b.datum.series.value).start.value);
                },
              },
              binEnd: {
                fn: (b) => {
                  const ss = b.resources.scale('b');
                  return b.resources.scale('x')(ss.datum(b.datum.series.value).end.value);
                },
              },
              ref: 'series',
            },
            minor: { scale: 'y', ref: 'end' },
            box: {
              fill: { scale: 'c' },
            },
            brush: {
              trigger: [
                { data: ['series'] },
              ],
            },
          },
        },
      }),
      box({
        properties: {
          key: 'bar-labels',
          data: { collection: 'span' },
          displayOrder: 2,
          dock: 'top',
          preferredSize: () => 24,
          settings: {
            major: {
              binStart: {
                scale: 'x',
                fn: (b) => {
                  const ss = b.resources.scale('b');
                  return b.resources.scale('x')(ss.datum(b.datum.series.value).start.value);
                },
              },
              binEnd: {
                fn: (b) => {
                  const ss = b.resources.scale('b');
                  return b.resources.scale('x')(ss.datum(b.datum.series.value).end.value);
                },
              },
            },
            minor: { start: 0, end: 1 },
            box: {
              fill: 'rgba(100, 0, 0, 0.0)',
              strokeWidth: 0,
            },
            brush: {
              trigger: [
                { data: ['series'] },
              ],
            },
          },
        },
      }),
      labels({
        component: 'bar-labels',
        orientation: 'horizontal',
        labels: [{
          label({ data }) {
            return `${data.label} (${Math.round(data.metric.value)}%)`;
          },
          placements: [
            { position: 'inside', fill: '#000', justify: 0.5 },
            { position: 'outside', fill: '#666666', justify: 0 },
          ],
        }],
        properties: {
          key: 'bar-labels-ts',
          dock: '@bar-labels',
          displayOrder: 5,
        },
      }),
      labels({
        component: 'rects',
        orientation: 'horizontal',
        // type: 'rows',
        labels: [{
          label({ data }) {
            return `${data.label} (${Math.round(data.metric.value)}%)`;
          },
          placements: [
            { position: 'inside', fill: '#FFFFFF', justify: 0.5 },
          ],
        }],
        properties: {
          key: 'bar-labels-rects',
          dock: '@rects',
          displayOrder: 6,
        },
      }),
      range(),
      tooltip(),
    ],
    interactions: [tooltipHover(), rangePan()],
    // interactions: [],
  };
};

export default MerimekkoChart;
