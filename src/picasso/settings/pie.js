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
  },
  {
    type: 'labels',
    displayOrder: 2, // must be larger than the displayOrder for the 'pie' component
    settings: {
      sources: [{
        component: 'pie',
        selector: 'path', // select all 'path' shapes from the 'pie' component
        strategy: {
          type: 'slice', // the strategy type
          settings: {
            direction: 'horizontal',
            fontFamily: 'Helvetica',
            fontSize: 14,
            labels: [{
              label({ data }) { // dimension label
                return data ? data.label : '';
              },
              placements: [{
                position: 'info',
                // fill: ({ data }) => '#000', // select a color contrasting the containing slice
                fill: '#000',
              }],
            },
            { // data label
              label({ data }) {
                return data ? data.arc.label : '';
              },
              placements: [
                { position: 'inside', fill: '#fff' },
                { position: 'outside', fill: '#333' },
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

