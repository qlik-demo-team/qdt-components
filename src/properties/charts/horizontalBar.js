const horizontalBar = {
  scales: {
    x: {
      data: { field: 'qMeasureInfo/0' },
      expand: 0.1,
      min: 0,
    },
    y: {
      data: { extract: { field: 'qDimensionInfo/0' } },
      padding: 0.2,
    },
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
    settings: {
      labels: {
        show: true,
        margin: 3,
        maxLengthPx: 150,
        minLengthPx: 100,
        mode: 'auto', // Control how labels arrange themself. Availabe modes are `auto`, `horizontal`, `layered` and `tilted`. When set to `auto` the axis determines the best possible layout in the current context. // Optional
        align: 0.5, // Align act as a slider for the text bounding rect over the item bandwidth, given that the item have a bandwidth. Except when labels are tilted, then the align is a pure align that shifts the position of the label anchoring point. // Optional
        offset: 0, // Offset in pixels along the axis direction. // Optional
      },
      ticks: {
        show: true, // Toggle ticks on/off // Optional
        margin: 0, // Space in pixels between the ticks and the line. // Optional
        tickSize: 4, // Size of the ticks in pixels. // Optional
      },
      line: {
        show: true, // Toggle line on/off // Optional
        align: 'right',
      },
      align: 'right',
    },
  }, {
    type: 'axis',
    dock: 'bottom',
    scale: 'x',
  }, {
    key: 'horizontalBars',
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
      orientation: 'horizontal',
      major: { scale: 'y' },
      minor: { scale: 'x' },
      box: {
        fill: '#49637A',
        strokeWidth: 1,
        stroke: '#3d5266',
        //   fill: { scale: 'c', ref: 'end' },
        //   width: 0.5,
        //   minHeightPx: 50,
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
    displayOrder: 2,
    settings: {
      sources: [{
        component: 'horizontalBars',
        selector: 'rect',
        strategy: {
          type: 'bar',
          settings: {
            direction: 'right',
            // fontFamily: 'Helvetica',
            // fontSize: 14,
            // align: 0.5,
            // justify: 1,
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
      key: 'horizontalBars',
      events: {},
    },
  ],
};

export default horizontalBar;

