import { axis, box, tooltip, range, labels } from './components';
import { itooltip, pan } from './interactions';

const setting = {
  scales: {
    x: { data: { field: 'qMeasureInfo/0' }, include: [0] },
    y: { data: { extract: { field: 'qDimensionInfo/0' }, padding: 0.2 } },
  },
  components: [
    axis(),
    axis({ scale: 'y' }),
    box({ orientation: 'horizontal' }),
    range({ scale: 'y' }),
    labels({ direction: 'right' }),
    tooltip,
  ],
  interactions: [itooltip, pan({ scale: 'y' })],
};

export default setting;
