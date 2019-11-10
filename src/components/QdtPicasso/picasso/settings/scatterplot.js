import {
  axis, tooltip, legend, point, domPointLabel, range,
} from './components';
import { itooltip, pan } from './interactions';
import theme from '../../../../styles';

const component = {
  scales: {
    x: { data: { field: 'qMeasureInfo/1' }, expand: 0.1 },
    y: { data: { field: 'qMeasureInfo/0' }, expand: 0.2, invert: true },
    c: {
      data: { extract: { field: 'qDimensionInfo/0' } },
      range: theme.palette,
      type: 'color',
    },
  },
  components: [
    axis(),
    axis({ scale: 'y' }),
    legend,
    domPointLabel,
    point({ x: { field: 'qMeasureInfo/1' } }),
    tooltip,
    range(),
    range({ scale: 'y' }),
  ],
  interactions: [itooltip, pan(), pan({ scale: 'y' })],
};

export default component;
