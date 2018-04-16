export default {
  scales: {
    s: {
      data: { field: 'qMeasureInfo/0' },
      expand: 0.2,
      invert: true,
    },
    m: {
      data: { field: 'qMeasureInfo/1' },
      expand: 0.1,
    },
    col: {
      data: { extract: { field: 'qDimensionInfo/0' } },
      type: 'color',
    },
  },
  components: [{
    key: 'y-axis',
    type: 'axis',
    scale: 's',
    dock: 'left',
  }, {
    type: 'legend-cat',
    dock: 'right',
    scale: 'col',
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
    key: 'x-axis',
    type: 'axis',
    scale: 'm',
    dock: 'bottom',
  }, {
    key: 'tooltip',
    type: 'tooltip',
    background: 'white',
  }, {
    key: 'p',
    type: 'domPointImage',
    displayOrder: 1,
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          y: { field: 'qMeasureInfo/0' },
          x: { field: 'qMeasureInfo/1' },
        },
      },
    },
    settings: {
      x: { scale: 'm' },
      y: { scale: 's' },
      color: '#000',
    },
  }, {
    key: 'p',
    type: 'point', // Need this for tooltip to work
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          y: { field: 'qMeasureInfo/0' },
          x: { field: 'qMeasureInfo/1' },
          num: { field: 'qMeasureInfo/0' },
          qMeasure: { field: 'qMeasureInfo/0' },
          qMeasure2: { field: 'qMeasureInfo/1' },
          qDimension: data => data,
        },
      },
    },
    settings: {
      x: { scale: 'm' },
      y: { scale: 's' },
      shape: 'rect',
      size: 0.2,
      opacity: 0,
      fill: { scale: 'col' },
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
  interactions: [
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
