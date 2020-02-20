import merge from 'deepmerge';
import {
  axis, tooltip, legend, point, domPointLabel, range,
} from './components';
import { itooltip, pan, ilegend } from './interactions';
import { Light as defaultTheme } from '../../../themes/Themes';

const component = ({ theme: themeProp }) => {
  const theme = merge(defaultTheme, themeProp);
  return {
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
      legend(),
      domPointLabel,
      point({ x: { field: 'qMeasureInfo/1' } }),
      tooltip,
      range(),
      range({ scale: 'y' }),
    ],
    interactions: [itooltip, pan(), pan({ scale: 'y' }), ilegend],
  };
};

export default component;
