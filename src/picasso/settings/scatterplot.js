import { xAxis, yAxis, tooltip, legend, point, domPointLabel } from './components';
import { itooltip } from './interactions';

const component = {
  scales: {
    x: { data: { field: 'qMeasureInfo/1' }, expand: 0.1 },
    y: { data: { field: 'qMeasureInfo/0' }, expand: 0.2, invert: true },
    color: {
      data: { extract: { field: 'qDimensionInfo/0' } },
      range: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00'],
      type: 'color',
    },
  },
  components: [
    xAxis,
    yAxis,
    legend,
    domPointLabel,
    point,
    tooltip,
  ],
  interactions: [itooltip],
};

export default component;
