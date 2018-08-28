import { legend, tooltip, pie, labels } from './components';
import { itooltip } from './interactions';

const setting = {
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

export default setting;
