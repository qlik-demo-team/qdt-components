import { axis, range, tooltip, line, point } from './components';
import { itooltip, pan } from './interactions';

const setting = {
  scales: {
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.2 },
    y: { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] }, invert: true, expand: 0.2 },
  },
  components: [
    { type: 'grid-line', y: 'y' },
    axis(),
    axis({ scale: 'y' }),
    tooltip,
    range(),
    // line(),
    line({ y0: { field: 'qMeasureInfo/0' }, y: { field: 'qMeasureInfo/1' }, area: true }),
    point({ displayOrder: 2, fill: '#4477AA' }),
    line({
      key: 'line2', displayOrder: 3, y: { field: 'qMeasureInfo/1' }, stroke: '#CC6677',
    }),
    point({
      key: 'point2', displayOrder: 4, fill: '#CC6677', y: { field: 'qMeasureInfo/1' },
    }),
  ],
  interactions: [itooltip, pan()],
};

export default setting;
