export default {
  scales: {
    x: { data: { extract: { field: 'qDimensionInfo/0' } } },
    y: { data: { field: 'qMeasureInfo/0' }, include: [0], invert: true },
  },
  components: [
    {
      key: 'x-axis',
      type: 'axis',
      scale: 'x',
      dock: 'bottom',
    },
    {
      key: 'y-axis',
      type: 'axis',
      scale: 'y',
      dock: 'left',
    },
    {
      key: 'tooltip',
      type: 'tooltip',
      background: 'white',
    },
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
  ],
  interactions: [
    {
      type: 'hammer',
      gestures: [{
        type: 'Pan',
        options: {
          event: 'range',
          direction: Hammer.DIRECTION_HORIZONTAL,
        },
        events: {
          rangestart(e) {
            this.chart.component('rangeX').emit('rangeStart', e);
          },
          rangemove(e) {
            this.chart.component('rangeX').emit('rangeMove', e);
          },
          rangeend(e) {
            this.chart.component('rangeX').emit('rangeEnd', e);
          },
        },
      }],
    },
    {
      type: 'native',
      events: {
        mousemove(e) {
          this.chart.component('tooltip').emit('hover', e);
        },
        mouseout(e) {
          this.chart.component('tooltip').emit('leave', e);
        },
      },
    },
  ],
};
