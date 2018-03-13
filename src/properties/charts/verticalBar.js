const verticalBar = {
  scales: {
    y: {
      data: { field: 'qMeasureInfo/0' },
      invert: true,
      include: [0],
    },
    x: { data: { extract: { field: 'qDimensionInfo/0' } }, padding: 0.3 },
    c: {
      data: { field: 'qMeasureInfo/0' },
      type: 'color',
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
    key: 'verticalBars',
    type: 'box',
    displayOrder: 1,
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          start: 0,
          end: { field: 'qMeasureInfo/0' },
          qMeasure: { field: 'qMeasureInfo/0' },
          qDimension: data => data,
        },
      },
    },
    settings: {
      major: { scale: 'x' },
      minor: { scale: 'y' },
      box: {
        fill: '#49637A',
        //   fill: { scale: 'c', ref: 'end' },
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
  },
  {
    type: 'labels',
    displayOrder: 2, // must be larger than the displayOrder for the 'bars' component
    settings: {
      sources: [{
        component: 'verticalBars',
        selector: 'rect',
        strategy: {
          type: 'bar',
          settings: {
            direction: 'top',
            //   justify: 1,
            labels: [{
              label({ data }) {
                return data ? data.end.label : '';
              },
              placements: [ // label placements in prio order. Label will be placed in the first place it fits into
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
      type: 'native',
      key: 'verticalBars',
      events: {},
    },
  ],
};

export default verticalBar;

