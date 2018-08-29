import { axis, tooltip, box, labels } from './components';
import { itooltip } from './interactions';
import theme from '../../styles';

const setting = {
  scales: {
    x: { data: { extract: { field: 'qMeasureInfo/0' } }, include: [1] },
    y: { data: { fields: ['qMeasureInfo/3', 'qMeasureInfo/4'] }, invert: true },
  },
  components: [
    axis({ scale: 'y' }),
    tooltip,
    box({
      field: 'qMeasureInfo/0', start: { field: 'qMeasureInfo/3' }, end: { field: 'qMeasureInfo/4' }, fill: theme.palette[19], stroke: theme.palette[9],
    }),
    box({
      key: 'range', displayOrder: 2, field: 'qMeasureInfo/0', start: { field: 'qMeasureInfo/1' }, end: { field: 'qMeasureInfo/2' }, fill: theme.palette[8], stroke: theme.palette[9],
    }),
    box({
      key: 'line', displayOrder: 4, field: 'qMeasureInfo/0', start: { field: 'qMeasureInfo/0' }, end: { field: 'qMeasureInfo/0' }, fill: '#FFFFFF', stroke: '#FFFFFF',
    }),
    labels({
      displayOrder: 4, component: 'line', direction: 'up', fill: '#FFFFFF', fontSize: 18,
    }),
  ],
  interactions: [itooltip],
};

export default setting;
