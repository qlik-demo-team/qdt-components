import picasso from 'picasso.js';
import {
  axis, box, tooltip, range, labels,
} from './components';
import { itooltip, pan } from './interactions';
import theme from '../../../../styles';

picasso.formatter.remove('abs');
picasso.formatter('abs', () => {
  const f = (v) => Math.abs(v);
  return f;
});

const setting = {
  scales: {
    x: { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] }, expand: 0.3 }, // pop
    y: { data: { extract: { field: 'qDimensionInfo/0' } }, invert: true, min: ({ data }) => -Math.max(...data.fields.map((f) => f.max())) * 1.3 },
    c: { type: 'color', range: [theme.primary, theme.secondary] },
  },
  components: [
    axis({ formatter: { type: 'abs' } }),
    axis({ scale: 'y' }),
    box({
      orientation: 'horizontal',
      type: 'pyramid',
      fill(d) {
        return d.resources.scale('c')(d.datum.idx.value);
      },
    }),
    range({ scale: 'y' }),
    labels({ direction: 'right' }),
    tooltip,
  ],
  interactions: [itooltip, pan({ scale: 'y' })],
};

export default setting;
