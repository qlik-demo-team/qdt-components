// https://observablehq.com/@miralemd/picasso-js-grouped-bar-chart
import { axis, box, tooltip, labels, range } from './components';
import { itooltip, pan } from './interactions';
import theme from '../../styles';

const setting = {
  scales: {
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.3 },
    y: { data: { field: 'qMeasureInfo/0' }, include: [0], invert: true },
  },
  components: [
    axis(),
    axis({ scale: 'y' }),
    box({ fill: theme.primary, stroke: theme.primaryLight }),
    box({ fill: theme.secondary, stroke: theme.secondaryLight }),
    range(),
    labels(),
    tooltip,
  ],
  interactions: [itooltip, pan()],
};

export default setting;
