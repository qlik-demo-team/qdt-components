import { axis, tooltip, box, labels } from './components';
import { itooltip } from './interactions';

const setting = {
  scales: {
    x: { data: { extract: { field: 'qMeasureInfo/0' } }, include: [1] },
    y: { min: 0, max: 100, invert: true },
  },
  components: [
    axis({ scale: 'y' }),
    tooltip,
    box({
      field: 'qMeasureInfo/0', end: 100, fill: '#EEEEEE', stroke: '#b7b7b7',
    }),
    box({
      key: 'range', displayOrder: 2, field: 'qMeasureInfo/0', fill: '#4477AA', stroke: '#b7b7b7',
    }),
    box({
      key: 'line', displayOrder: 3, field: 'qMeasureInfo/0', start: { field: 'qMeasureInfo/0' }, fill: '#FFFFFF', stroke: '#FFFFFF',
    }),
    labels({
      displayOrder: 4, component: 'line', direction: 'up', fill: '#4f4f4f', fontSize: 18,
    }),
  ],
  interactions: [itooltip],
};

export default setting;
