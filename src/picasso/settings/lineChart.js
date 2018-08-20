export default {
  scales: {
    y: {
      data: { field: 'qMeasureInfo/0' },
      expand: 0.1,
      invert: true,
    },
    x: {
      data: { extract: { field: 'qDimensionInfo/0' } },
      padding: 0.2,
    },
  },
  components: [{
    type: 'grid-line',
    y: 'y',
  }, {
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
    key: 'tooltip',
    type: 'tooltip',
    background: 'white',
  }, {
    key: 'line',
    type: 'line',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          v: { field: 'qMeasureInfo/0' },
        },
      },
    },
    settings: {
      coordinates: {
        major: { scale: 'x' },
        minor: { scale: 'y', ref: 'v' },
      },
      orientation: 'horizontal',
      layers: {
        curve: 'linear', // https://github.com/d3/d3-shape#curves
        show: true,
        line: {
          opacity: 1,
          stroke: '#3F8AB3',
          strokeWidth: 2,
        },
      },
    },
  }, {
    key: 'p',
    type: 'point',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          y: { field: 'qMeasureInfo/0' },
          x: { field: 'qDimensionInfo/0' },
          qDimension: { field: 'qDimensionInfo/0' },
          qMeasure: { field: 'qMeasureInfo/0' },
        },
      },
    },
    settings: {
      x: { scale: 'x' },
      y: { scale: 'y' },
      shape: 'circle',
      size: 0.2,
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

