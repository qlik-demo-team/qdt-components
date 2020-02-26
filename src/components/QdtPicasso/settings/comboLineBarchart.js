import merge from '../../../utils/merge';
import {
  axis, box, tooltip, labels, line, point, range,
} from './components';
import { itooltip, pan } from './interactions';
import { Light as defaultTheme } from '../../../themes/Themes';

const setting = ({ theme: themeProp }) => {
  const theme = merge(defaultTheme, themeProp);
  return {
    scales: {
      x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.3 },
      y: { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] }, invert: true, expand: 0.2 },
      c: { data: { field: 'qMeasureInfo/0' }, type: 'color' },
    },
    components: [
      { type: 'grid-line', y: 'y' },
      axis(),
      axis({ scale: 'y' }),
      tooltip,
      box({ fill: theme.primary, stroke: theme.primaryLight }),
      line({
        key: 'line2', displayOrder: 3, y: { field: 'qMeasureInfo/1' }, stroke: theme.secondary,
      }),
      point({
        key: 'point2', displayOrder: 4, y: { field: 'qMeasureInfo/1' }, fill: theme.secondary, stroke: theme.secondaryLight,
      }),
      labels({ displayOrder: 3, direction: 'up' }),
      range(),
    ],
    interactions: [
      itooltip,
      pan(),
    ],
  };
};

export default setting;
