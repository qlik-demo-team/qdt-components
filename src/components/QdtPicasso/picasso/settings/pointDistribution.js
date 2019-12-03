import {
  axis, tooltip, point, range,
} from './components';
import { itooltip, pan } from './interactions';

const _point = point({
  field: 'qDimensionInfo/1',
  size: { scale: 's' },
  x: { field: 'qMeasureInfo/1' },
  fill: { scale: 'c', ref: 'group' },
});
_point.data.extract.props.size = { field: 'qMeasureInfo/0' };
_point.data.extract.props.group = { field: 'qDimensionInfo/0' };
_point.settings.y = { scale: 'y', ref: 'group' };
delete _point.data.extract.props.num;
const setting = {
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

export default setting;
