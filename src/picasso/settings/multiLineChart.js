import { axis, tooltip, line, point, range } from './components';
import { itooltip, pan } from './interactions';

const setting = {
  scales: {
    y: { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] }, invert: true, expand: 0.2 },
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.2 },
  },
  components: [
    { type: 'grid-line', y: 'y' },
    axis(),
    axis({ scale: 'y' }),
    tooltip,
    line(),
    point({ displayOrder: 2, fill: '#4477AA' }),
    line({
      key: 'line2', displayOrder: 3, y: { field: 'qMeasureInfo/1' }, stroke: '#CC6677',
    }),
    point({
      key: 'point2', displayOrder: 4, fill: '#CC6677', y: { field: 'qMeasureInfo/1' },
    }),
    range(),
  ],
  interactions: [itooltip, pan()],
};

export default setting;
