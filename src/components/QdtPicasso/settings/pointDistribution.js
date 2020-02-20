import merge from 'deepmerge';
import {
  axis, tooltip, point, range,
} from './components';
import { itooltip, pan } from './interactions';
import { Light as defaultTheme } from '../../../themes/Themes';

const _point = point({
  field: 'qDimensionInfo/1',
  size: { scale: 's' },
  x: { field: 'qMeasureInfo/1' },
  fill: { scale: 'c', ref: 'group' },
});
_point.data.extract.props.size = { field: 'qMeasureInfo/0' };
_point.data.extract.props.group = { field: 'qDimensionInfo/0' };
_point.settings.y = { scale: 'y', ref: 'group' };
_point.data.extract.props.d = { field: 'qDimensionInfo/0' }; // Need to add a new prop for selections to work
_point.brush.trigger[0].data = ['d'];
_point.brush.consume[0].data = ['d'];
delete _point.data.extract.props.num;
const setting = ({ theme: themeProp }) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  return {
    scales: {
      y: { data: { extract: { field: 'qDimensionInfo/0' } } },
      x: { data: { extract: { field: 'qMeasureInfo/1' } }, expand: 0.1 }, // m
      s: { data: { extract: { field: 'qMeasureInfo/0' } } },
      c: { data: { extract: { field: 'qDimensionInfo/0' } }, type: 'color' },
    },
    components: [
      { type: 'grid-line', y: 'y' },
      axis(),
      axis({ scale: 'y' }),
      _point,
      tooltip,
      range(),
    ],
    interactions: [itooltip, pan()],
  };
};

export default setting;
