import { axis, legend, tooltip, range, labels, box } from './components';
import { itooltip, pan } from './interactions';

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
        stackKey: d => d.value,
        value: d => d.end.value,
      },
    },
  }],
  scales: {
    y: {
      data: { collection: { key: 'stacked' } }, invert: true, expand: 0.2, min: 0,
    },
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.3 },
    color: { data: { extract: { field: 'qDimensionInfo/1' } }, type: 'color' },
  },
  components: [
    axis(),
    axis({ scale: 'y' }),
    legend,
    tooltip,
    range(),
    box({ collection: 'stacked', fill: { scale: 'color', ref: 'series' } }),
    labels(),
  ],
  interactions: [itooltip, pan()],
};

export default setting;
