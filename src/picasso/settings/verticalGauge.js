import {
  axis, tooltip, box, labels,
} from './components';
import { itooltip } from './interactions';
import theme from '../../styles';

const setting = {
  scales: {
    x: { data: { extract: { field: 'qMeasureInfo/0' } }, include: [1] },
    y: { min: 0, max: 100, invert: true },
  },
  components: [
    axis({ scale: 'y' }),
    tooltip,
    box({
      field: 'qMeasureInfo/0', end: 100, fill: theme.palette[19], stroke: theme.palette[9],
    }),
    box({
      key: 'range', displayOrder: 2, field: 'qMeasureInfo/0', fill: theme.primary, stroke: theme.primaryLight,
    }),
    box({
      key: 'line', displayOrder: 3, field: 'qMeasureInfo/0', start: { field: 'qMeasureInfo/0' }, fill: '#FFFFFF', stroke: '#FFFFFF',
    }),
    labels({
      displayOrder: 4, component: 'line', direction: 'up', outsideFill: '#FFFFFF', fontSize: 18,
    }),
  ],
  interactions: [itooltip],
};

export default setting;
