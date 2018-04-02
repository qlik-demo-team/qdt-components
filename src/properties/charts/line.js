const line = {
  scales: {
    y: {
      data: { field: 'qMeasureInfo/0' },
      expand: 0.1,
      min: 0,
    },
    x: {
      data: { extract: { field: 'qDimensionInfo/0' } },
      padding: 0.2,
    },
  },
  components: [{
    type: 'grid-line',
    x: 'x',
  }, {
    type: 'axis',
    dock: 'left',
    scale: 'y',
  }, {
    type: 'axis',
    dock: 'bottom',
    scale: 'x',
  }, {
    key: 'lines',
    type: 'line',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          v: { field: 'qMeasureInfo/0' },
          qMeasure: { field: 'qMeasureInfo/0' },
          qDimension: data => data,
        },
      },
    },
    settings: {
      coordinates: {
        major: { scale: 'x' },
        minor: { scale: 'y', ref: 'v' },
      },
      layers: {
        curve: 'monotone',
        show: true,
        line: {
          strokeWidth: 2,
          stroke: {
            scale: 'color',
            ref: 'id',
          },
          opacity: 1,
        },
      },
    },
    brush: {
      trigger: [{
        on: 'tap',
        action: 'toggle',
        contexts: ['highlight', 'select'],
        data: ['qDimension'],
        propagation: 'stop', // 'stop' => prevent trigger from propagating further than the first shape
        globalPropagation: 'stop', // 'stop' => prevent trigger of same type to be triggered on other components
        touchRadius: 24,
      }],
      consume: [{
        context: 'highlight',
        style: {
          active: {
            fill: '#77b62a',
            stroke: '#333',
            strokeWidth: 1,
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
      key: 'horizontalBars',
      events: {},
    },
  ],
};

export default line;

