import { axis, tooltip, line, point, range } from './components';
import { itooltip, pan } from './interactions';

const setting = {
  scales: {
    y: { data: { field: 'qMeasureInfo/0' }, expand: 0.1, invert: true },
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.2 },
  },
  components: [
    { type: 'grid-line', y: 'y' },
    axis(),
    axis({ scale: 'y' }),
    tooltip,
    line(),
    point({ displayOrder: 2, fill: '#4477AA' }),
    range(),
  ],
  interactions: [itooltip, pan()],
};

export default setting;
