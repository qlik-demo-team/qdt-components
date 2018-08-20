export default {
  scales: {
    y: { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1'] }, invert: true, expand: 0.2 },
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.2 },
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
        show: true, // Toggle ticks on/off // Optional
        margin: 0, // Space in pixels between the ticks and the line. // Optional
        tickSize: 4, // Size of the ticks in pixels. // Optional
      },
      line: {
        show: true, // Toggle line on/off // Optional
      },
      align: 'left',
    },
  }, {
    key: 'tooltip',
    type: 'tooltip',
    background: 'white',
  }, {
    key: 'line1',
    type: 'line',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          y: { field: 'qMeasureInfo/0' },
        },
      },
    },
    settings: {
      coordinates: {
        major: { scale: 'x' },
        minor: { scale: 'y', ref: 'y' },
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
    key: 'line2',
    type: 'line',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          y: { field: 'qMeasureInfo/1' },
        },
      },
    },
    settings: {
      coordinates: {
        major: { scale: 'x' },
        minor: { scale: 'y', ref: 'y' },
      },
      orientation: 'horizontal',
      layers: {
        curve: 'linear', // https://github.com/d3/d3-shape#curves
        show: true,
        line: {
          opacity: 1,
          stroke: '#CC6677',
          strokeWidth: 2,
        },
      },
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
      fill: '#CC6677',
    },
    brush: {
      trigger: [{
        on: 'tap',
        contexts: ['select'],
      }],
      consume: [{
        context: 'select',
        style: {
          active: { opacity: 1 },
          inactive: { opacity: 0.5 },
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

