import { axis, box, tooltip, labels, line, point, range } from './components';
import { itooltip, pan } from './interactions';

const setting = {
  scales: {
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.3 },
    y: { data: { field: 'qMeasureInfo/0' }, include: [0], invert: true },
    y1: { data: { field: 'qMeasureInfo/1' }, invert: true, expand: 0.02 },
    c: { data: { field: 'qMeasureInfo/0' }, type: 'color' },
  },
  components: [
    { type: 'grid-line', y: 'y' },
    axis(),
    axis({ scale: 'y' }),
    tooltip,
    box(),
    labels(),
    line({
      displayOrder: 3, y: { field: 'qMeasureInfo/1' }, minor: { scale: 'y1', ref: 'y' }, stroke: '#960000',
    }),
    point({ displayOrder: 4, y: { scale: 'y1' }, fill: '#960000' }),
    range(),
  ],
  interactions: [
    itooltip,
    pan(),
  ],
};

export default setting;
