import {
  axis, tooltip, labels, range, box,
} from './components'; // box
import { itooltip, pan } from './interactions';
import theme from '../../styles';

const setting = {
  scales: {
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.3 },
    y: { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] }, include: [0], invert: true },
  },
  components: [
    axis(),
    axis({ scale: 'y' }),
    box({
      displayOrder: 0, measures: 2, end: { field: 1 }, fill: theme.primary, stroke: theme.primaryLight,
    }),
    box({
      displayOrder: 1, measures: 2, end: { field: 2 }, fill: theme.secondary, stroke: theme.secondaryLight,
    }),
    range(),
    labels(),
    tooltip,
  ],
  interactions: [itooltip, pan()],
};

export default setting;
