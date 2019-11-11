import {
  axis, legend, tooltip, column, cell, mekkoLabels,
} from './components';
import { itooltip, pan } from './interactions';
import theme from '../../../../styles';

const setting = {
  collections: [{
    key: 'stacked',
    data: {
      extract: {
        field: 'qDimensionInfo/1',
        props: {
          series: { field: 'qDimensionInfo/0' },
          metric: { field: 'qMeasureInfo/0' },
          end: { field: 'qMeasureInfo/0' },
        },
      },
      stack: {
        value: (d) => d.end.value,
        offset: 'expand'
      },
    },
  },
   {
    key: 'span',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        trackBy: d => d.qElemNumber,
        reduce: 'first',
        props: {
          series: { field: 'qDimensionInfo/0' },
          metric: { field: 'qMeasureInfo/0' },
          end: { field: 'qMeasureInfo/0' },
        },
      },
      stack: {
        stackKey: (d) => -1,
        value: (d) => d.end.value,
        offset: 'expand'
      },
    },
  }],
  formatters: { myFormatter: { formatter: 'd3', type: 'number', format: '.0%'} },
  scales: {
    y: {
      data: { collection: { key: 'stacked' } }, invert: true, max: 1,
    },
    b: { data: { collection: { key: 'span' } }, type: 'band' },
    m: { data: { collection: { key: 'span' } }, max: 1 },
    c: {
      data: { extract: { field: 'qDimensionInfo/1' } },
      range: theme.palette,
      type: 'color',
    },
  },
  components: [
    axis({scale: 'y', format: '.0%', dock: 'left'}),
    axis({ scale: 'm', format: '.0%', dock: 'bottom'}),
    tooltip,
    cell(),
    mekkoLabels({format: myFormatter({format: '.0%'}), dock: '@cell', comp: 'cell'}),
    column({scale: 'm'}),
    columnLabels({ format: myFormatter({format: '.0%'})}),
    
  ],
  interactions: [itooltip, pan()],
};

export default setting;
