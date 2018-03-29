// dimension1=Year,  dimension2=Month, measure1=Sales, measure2=margin
const scotterplot = {
  scales: {
    s: {
      data: {
        field: 'qMeasureInfo/0',
      },
      expand: 0.2,
      invert: true,
    },
    m: {
      data: {
        field: 'qMeasureInfo/1',
      },
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
  }, {
    key: 'x-axis',
    type: 'axis',
    scale: 'm',
    dock: 'bottom',
  }, {
    key: 'p',
    type: 'point',
    displayOrder: 1,
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
      shape: 'circle',
      size: () => Math.random(),
      strokeWidth: 2,
      stroke: '#fff',
      opacity: 0.8,
      fill: { scale: 'col' },
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
    displayOrder: 2,
    settings: {
      sources: [{
        component: 'circle',
        selector: 'rect',
        strategy: {
          type: 'bar',
          settings: {
            direction: 'top',
            labels: [{
              label({ data }) {
                return data ? data.end.label : '';
              },
              placements: [
                // { position: 'inside', fill: '#fff' },
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
      key: 'pie',
      events: {},
    },
  ],
};

export default scotterplot;

