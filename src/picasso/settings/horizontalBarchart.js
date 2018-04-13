export default {
  scales: {
    y: { data: { extract: { field: 'qDimensionInfo/0' } } },
    x: { data: { field: 'qMeasureInfo/0' } },
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
      data: {
        extract: {
          field: 'qDimensionInfo/0',
          props: {
            start: 0,
            end: { field: 'qMeasureInfo/0' },
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
  ],
  interactions: [
    {
      type: 'hammer',
      gestures: [{
        type: 'Pan',
        options: {
          event: 'range',
          direction: Hammer.DIRECTION_VERTICAL,
        },
        events: {
          rangestart(e) {
            this.chart.component('rangeY').emit('rangeStart', e);
          },
          rangemove(e) {
            this.chart.component('rangeY').emit('rangeMove', e);
          },
          rangeend(e) {
            this.chart.component('rangeY').emit('rangeEnd', e);
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
      },
    },
  ],
};
