import { xAxis, yAxis, tooltip } from './components';
import { itooltip, pan } from './interactions';

export default {
  scales: {
    x: { data: { field: 'qMeasureInfo/0' }, include: [0] },
    y: { data: { extract: { field: 'qDimensionInfo/0' } } },
  },
  components: [
    xAxis,
    yAxis,
    {
      type: 'box',
      key: 'bars',
      displayOrder: 1,
      data: {
        extract: {
          field: 'qDimensionInfo/0',
          props: {
            start: 0,
            end: { field: 'qMeasureInfo/0' },
            qDimension: { field: 'qDimensionInfo/0' },
            qMeasure: { field: 'qMeasureInfo/0' },
          },
        },
      },
      settings: {
        major: { scale: 'y' },
        minor: { scale: 'x' },
        orientation: 'horizontal',
      },
      brush: {
        trigger: [{
          on: 'tap',
          contexts: ['select'],
        }],
        consume: [{
          context: 'select',
          style: {
            active: {
              opacity: 1,
            },
            inactive: {
              opacity: 0.5,
            },
          },
        }],
      },
    },
    {
      key: 'rangeY',
      type: 'brush-range',
      settings: {
        brush: 'select',
        direction: 'vertical',
        scale: 'y',
        target: {
          component: 'y-axis',
        },
        bubbles: {
          align: 'start',
        },
      },
    },
    {
      type: 'labels',
      displayOrder: 2,
      settings: {
        sources: [{
          component: 'bars',
          selector: 'rect',
          strategy: {
            type: 'bar',
            settings: {
              direction: 'right',
              labels: [{
                label({ data }) {
                  return data ? data.end.label : '';
                },
                placements: [
                  { position: 'inside', justify: 1, fill: '#fff' },
                  { position: 'outside', justify: 0, fill: '#666' },
                ],
              }],
            },
          },
        }],
      },
    },
    tooltip,
  ],
  interactions: [itooltip, pan],
};
