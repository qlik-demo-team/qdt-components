import { axis, range, tooltip, line, point } from './components';
import { itooltip, pan } from './interactions';
import theme from '../../styles';

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
    line({
      y0: { field: 'qMeasureInfo/0' }, y: { field: 'qMeasureInfo/1' }, area: true, stroke: theme.primary,
    }),
    point({
      displayOrder: 2, y: { field: 'qMeasureInfo/1' }, fill: theme.primary, stroke: theme.primaryLight,
    }),
    line({
      key: 'line2', displayOrder: 3, y: { field: 'qMeasureInfo/0' }, stroke: theme.secondary,
    }),
    point({
      key: 'point2', displayOrder: 4, y: { field: 'qMeasureInfo/0' }, fill: theme.secondary, stroke: theme.secondaryLight,
    }),
  ],
  interactions: [itooltip, pan()],
};

export default setting;
