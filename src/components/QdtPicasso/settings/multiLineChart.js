import { Light as defaultTheme } from 'themes';
import merge from 'utils/merge';
import {
  axis, tooltip, line, point, range,
} from './components';
import { itooltip, pan } from './interactions';

const setting = ({ theme: themeProp }) => {
  const theme = merge(defaultTheme, themeProp);
  return {
    scales: {
      y: { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] }, invert: true, expand: 0.2 },
      x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.2 },
    },
    components: [
      { type: 'grid-line', y: 'y' },
      axis(),
      axis({ scale: 'y' }),
      tooltip,
      line({ stroke: theme.primary }),
      point({ displayOrder: 2, fill: theme.primary, stroke: theme.primaryLight }),
      line({
        key: 'line2', displayOrder: 3, y: { field: 'qMeasureInfo/1' }, stroke: theme.secondary,
      }),
      point({
        key: 'point2', displayOrder: 4, y: { field: 'qMeasureInfo/1' }, fill: theme.secondary, stroke: theme.secondaryLight,
      }),
      range(),
    ],
    interactions: [itooltip, pan()],
  };
};

export default setting;
