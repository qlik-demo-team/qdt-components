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
    dock: 'right',
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
  }, {
    key: 'tooltip',
    type: 'tooltip',
    background: 'white',
  }, {
    type: 'pie',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          num: { field: 'qMeasureInfo/0' },
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
  }],
  interactions: [{
    type: 'native',
    events: {
      mousemove(e) {
        this.chart.component('tooltip').emit('hover', e);
      },
    },
  }],
};
