export default {
  scales: {
    c: {
      data: {
        extract: {
          field: 'qDimensionInfo/0',
        },
      },
      type: 'color',
    },
  },
  components: [{
    type: 'legend-cat',
    scale: 'c',
  },
  {
    key: 'tooltip',
    type: 'tooltip',
    background: 'white',
  },
  {
    key: 'pie',
    type: 'pie',
    displayOrder: 1,
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          num: { field: 'qMeasureInfo/0' },
          qDimension: { field: 'qDimensionInfo/0' },
          qMeasure: { field: 'qMeasureInfo/0' },
        },
      },
    },
    settings: {
      slice: {
        arc: { ref: 'num' },
        fill: { scale: 'c' },
        outerRadius: () => 0.9,
        strokeWidth: 1,
        stroke: 'rgba(255, 255, 255, 0.5)',
      },
    },
    brush: {
      trigger: [{
        on: 'tap',
        // action: 'toggle',
        contexts: ['select'],
        // data: ['qDimension'],
        // propagation: 'stop', // 'stop' => prevent trigger from propagating further than the first shape
        // globalPropagation: 'stop', // 'stop' => prevent trigger of same type to be triggered on other components
        touchRadius: 24,
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
  }],
  interactions: [
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

