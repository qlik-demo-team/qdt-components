import {
  // axis,
  axis, box, tooltip, range, labels,
} from './components';
import { itooltip, pan } from './interactions';
import theme from '../../styles';

const setting = {
  scales: {
    // x: {
    //   data: { extract: { fields: ['qDimensionInfo/1', 'qDimensionInfo/2'] } }, expand: 0.1, include: [0],
    // },
    x: { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] }, expand: 0.1 },
    // x: { data: { field: 'qDimensionInfo/1' }, include: [0] },
    // x: { data: { extract: { field: 'qMeasureInfo/0' } }, padding: 0.2 },
    y: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.2 },
  },
  components: [
    axis({ scale: 'x', formatter: { type: 'd3-time', format: '%m/%d/%Y' } }),
    // axis({ scale: 'x', formatter: { type: 'appendToken' } }),
    axis(),
    axis({ scale: 'y' }),
    box({
      orientation: 'horizontal',
      start: { field: 'qMeasureInfo/0' },
      end: { field: 'qMeasureInfo/1' },
      fill: theme.primary,
      stroke: theme.primaryLight,
      // barWidth: 0.8,
    }),
    range({ scale: 'y' }),
    labels({ direction: 'right' }),
    tooltip,
  ],
  interactions: [itooltip, pan({ scale: 'y' })],
};

export default setting;
