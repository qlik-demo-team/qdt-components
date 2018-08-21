export default {
  scales: {
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.2 },
    y: { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] }, invert: true, expand: 0.2 },
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
    settings: {
      labels: {
        show: true,
        mode: 'auto',
      },
      ticks: {
        show: true,
        margin: 0,
        tickSize: 4,
      },
      line: {
        show: true,
      },
      align: 'left',
    },
  }, {
    key: 'lines',
    type: 'line',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          low: { field: 'qMeasureInfo/0' },
          high: { field: 'qMeasureInfo/1' },
          qDimension: { field: 'qDimensionInfo/0' },
          qMeasure: { field: 'qMeasureInfo/1' },
        },
      },
    },
    settings: {
      coordinates: {
        major: { scale: 'x' },
        minor0: { scale: 'y', ref: 'low' },
        minor: { scale: 'y', ref: 'high' },
      },
      orientation: 'horizontal',
      layers: {
        curve: 'linear',
        show: true,
        line: {
          show: true,
          opacity: 1,
          stroke: '#3F8AB3',
          strokeWidth: 2,
        },
        area: {
          show: true,
          fill: '#b4bfc2',
          opacity: 0.8,
        },
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
  }, {
    key: 'point1',
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
        on: 'hover',
        contexts: ['tooltip'],
      }],
      consume: [{
        context: 'tooltip',
        style: {
          background: 'white',
        },
      }],
    },
  }, {
    key: 'point2',
    type: 'point',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          y: { field: 'qMeasureInfo/1' },
          x: { field: 'qDimensionInfo/0' },
          qDimension: { field: 'qDimensionInfo/0' },
          qMeasure: { field: 'qMeasureInfo/1' },
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

