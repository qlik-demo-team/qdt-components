const pie = {
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
  }, {
    key: 'pie',
    type: 'pie',
    displayOrder: 1,
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          num: { field: 'qMeasureInfo/0' },
          qMeasure: { field: 'qMeasureInfo/0' },
          qDimension: data => data,
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
        action: 'toggle',
        contexts: ['highlight', 'select'],
        data: ['qDimension'],
        propagation: 'stop', // 'stop' => prevent trigger from propagating further than the first shape
        globalPropagation: 'stop', // 'stop' => prevent trigger of same type to be triggered on other components
        touchRadius: 24,
      }, {
        on: 'over',
        action: 'set',
        contexts: ['tooltip'],
        data: ['qDimension', 'qMeasure'],
        propagation: 'stop',
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
      key: 'pie',
      events: {},
    },
  ],
};

export default pie;

