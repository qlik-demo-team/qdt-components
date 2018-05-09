export default {
  collections: [{
    key: 'stacked',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          series: { field: 'qDimensionInfo/1' },
          end: { field: 'qMeasureInfo/0' },
          qDimension: { field: 'qDimensionInfo/0' },
          qMeasure: { field: 'qMeasureInfo/0' },
        },
      },
      stack: {
        stackKey: d => d.value,
        value: d => d.end.value,
      },
    },
  }],
  scales: {
    y: {
      data: {
        collection: {
          key: 'stacked',
        },
      },
      invert: true,
      expand: 0.2,
      min: 0,
    },
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.3 },
    color: { data: { extract: { field: 'qDimensionInfo/1' } }, type: 'color' },
  },
  components: [{
    key: 'y-axis',
    type: 'axis',
    dock: 'left',
    scale: 'y',
  }, {
    key: 'x-axis',
    type: 'axis',
    dock: 'bottom',
    scale: 'x',
  }, {
    type: 'legend-cat',
    scale: 'color',
    dock: 'top',
  }, {
    key: 'tooltip',
    type: 'tooltip',
    background: 'white',
  }, {
    key: 'bars',
    type: 'box',
    data: {
      collection: 'stacked',
    },
    settings: {
      major: { scale: 'x' },
      minor: { scale: 'y', ref: 'end' },
      box: {
        fill: { scale: 'color', ref: 'series' },
      },
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
  }],
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
