import { xAxis, yAxis, tooltip } from './components';
import { itooltip, pan } from './interactions';

export default {
  scales: {
    x: { data: { extract: { field: 'qDimensionInfo/0' } } },
    y: { data: { field: 'qMeasureInfo/0' }, include: [0], invert: true },
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
        major: { scale: 'x' },
        minor: { scale: 'y' },
        orientation: 'vertical',
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
      key: 'rangeX',
      type: 'brush-range',
      settings: {
        brush: 'select',
        direction: 'horizontal',
        scale: 'x',
        target: {
          component: 'x-axis',
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
              direction: 'down',
              labels: [{
                label({ data }) {
                  return data ? data.end.label : '';
                },
                placements: [
                  { position: 'inside', fill: '#fff' },
                  { position: 'outside', fill: '#666' },
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
