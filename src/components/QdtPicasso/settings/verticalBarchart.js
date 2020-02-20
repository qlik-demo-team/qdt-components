import merge from 'deepmerge';
import {
  axis, box, tooltip, labels, range, grid,
} from './components';
import { itooltip, pan } from './interactions';
import { Light as defaultTheme } from '../../../themes/Themes';

const setting = ({ theme: themeProp }) => {
  const theme = merge(defaultTheme, themeProp);
  return {
    scales: {
      x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.3 },
      y: { data: { field: 'qMeasureInfo/0' }, include: [0], invert: true },
    },
    components: [
      axis(),
      axis({ scale: 'y' }),
      grid({ x: null }),
      box({ fill: theme.primary, stroke: theme.primaryLight }),
      range(),
      labels(),
      tooltip,
    ],
    interactions: [itooltip, pan()],
  };
};

export default setting;
