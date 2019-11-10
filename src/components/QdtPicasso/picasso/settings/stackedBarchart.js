import {
  axis, legend, tooltip, range, labels, box,
} from './components';
import { itooltip, pan } from './interactions';
import theme from '../../../../styles';

const setting = {
  collections: [{
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
  }],
  scales: {
    y: {
      data: { collection: { key: 'stacked' } }, invert: true, expand: 0.2, min: 0,
    },
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.3 },
    c: {
      data: { extract: { field: 'qDimensionInfo/1' } },
      range: theme.palette,
      type: 'color',
    },
  },
  components: [
    axis(),
    axis({ scale: 'y' }),
    legend,
    tooltip,
    range(),
    box({ collection: 'stacked', fill: { scale: 'c', ref: 'series' } }),
    labels({ displayOrder: 3, direction: 'up' }),
  ],
  interactions: [itooltip, pan()],
};

export default setting;
