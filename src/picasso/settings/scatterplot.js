import { axis, tooltip, legend, point, domPointLabel, range } from './components';
import { itooltip, pan } from './interactions';

const component = {
  scales: {
    x: { data: { field: 'qMeasureInfo/1' }, expand: 0.1 },
    y: { data: { field: 'qMeasureInfo/0' }, expand: 0.2, invert: true },
    c: {
      data: { extract: { field: 'qDimensionInfo/0' } },
      range: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00'],
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
