import merge from '../../../utils/merge';
import {
  // axis,
  axis, box, tooltip, range, labels,
} from './components';
import { itooltip, pan } from './interactions';
import { Light as defaultTheme } from '../../../themes/Themes';

const setting = ({ theme: themeProp }) => {
  const theme = merge(defaultTheme, themeProp);
  return {
    scales: {
      x: { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] }, expand: 0.1 },
      y: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.2 },
    },
    components: [
      axis(),
      axis({ scale: 'y' }),
      box({
        orientation: 'horizontal',
        start: { field: 'qMeasureInfo/0' },
        end: { field: 'qMeasureInfo/1' },
        fill: theme.primary,
        stroke: theme.primaryLight,
      }),
      range({ scale: 'y' }),
      labels({ direction: 'right' }),
      tooltip,
    ],
    interactions: [itooltip, pan({ scale: 'y' })],
  };
};

export default setting;
