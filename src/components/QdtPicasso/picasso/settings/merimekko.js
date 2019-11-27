import {
  axis,
  box,
  legend,
  labels,
  tooltip,
  range,
} from './components';
import {
  itooltip,
  pan,
} from './interactions';
import theme from '../../../../styles';

const setting = {
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
        // value: (d) => d.series.value,
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
      range: theme.palette,
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
      key: 'rects', collection: 'stacked', type: 'merimekko', fill: { scale: 'c' },
    }),
    box({
      key: 'bar-labels', collection: 'span', type: 'merimekko', fill: 'rgba(100, 0, 0, 0.0)', strokeWidth: 0, displayOrder: 2,
    }),
    labels({
      key: 'bar-labels-ts', dock: '@bar-labels', component: 'bar-labels', fontSize: 10, displayOrder: 3, insideFill: '#000', justify: 0.5, direction: 'right',
    }),
    labels({
      dock: '@rects', component: 'rects', type: 'rows', displayOrder: 4,
    }),
    legend,
    range(),
    tooltip,
  ],
  interactions: [itooltip, pan()],
};

export default setting;
