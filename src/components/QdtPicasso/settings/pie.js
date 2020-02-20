import merge from 'deepmerge';
import {
  legend, tooltip, pie, labels,
} from './components';
import { itooltip } from './interactions';
import { Light as defaultTheme } from '../../../themes/Themes';

const setting = ({ theme: themeProp }) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  return {
    scales: {
      color: { data: { extract: { field: 'qDimensionInfo/0' } }, type: 'color' },
    },
    components: [
      legend,
      tooltip,
      pie,
      labels({
        component: 'pie', selector: 'path', type: 'slice', direction: 'horizontal',
      }),
    ],
    interactions: [itooltip],
  };
};

export default setting;
