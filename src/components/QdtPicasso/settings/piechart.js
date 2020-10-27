import legend from './components/legend';
import tooltip from './components/tooltip';
import pie from './components/pie';
import labels from './components/labels';
import tooltipHover from './interactions/tooltipHover';

const pieChart = () => ({
  scales: {
    c: { data: { extract: { field: 'qDimensionInfo/0' } }, type: 'color' },
  },
  components: [
    legend(),
    tooltip(),
    pie(),
    labels({
      component: 'pie', selector: 'path', type: 'slice', direction: 'horizontal',
    }),
  ],
  interactions: [tooltipHover()],
});

export default pieChart;
