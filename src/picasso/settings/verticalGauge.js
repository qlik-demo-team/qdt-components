export default {
  scales: {
    x: { data: { extract: { field: 'qMeasureInfo/0' } }, include: [1] },
    y: { min: 0, max: 100, invert: true },
  },
  components: [
    {
      key: 'y-axis',
      type: 'axis',
      scale: 'y',
      dock: 'left',
    },
    {
      type: 'box', // Overall box
      key: 'box',
      displayOrder: 1,
      data: {
        extract: {
          field: 'qMeasureInfo/0',
          props: {
            start: 0,
            end: 100,
          },
        },
      },
      settings: {
        major: { scale: 'x' },
        minor: { scale: 'y' },
        box: {
          fill: '#EEEEEE',
          strokeWidth: 1,
          stroke: '#b7b7b7',
        },
        orientation: 'vertical',
      },
    },
    {
      type: 'box', // Inner Green Box with Range Limits
      key: 'range',
      displayOrder: 2,
      data: {
        extract: {
          field: 'qMeasureInfo/0',
          props: {
            start: 0,
            end: { field: 'qMeasureInfo/0' },
          },
        },
      },
      settings: {
        major: { scale: 'x' },
        minor: { scale: 'y' },
        box: {
          fill: '#4477AA',
          strokeWidth: 1,
          stroke: '#b7b7b7',
        },
        orientation: 'vertical',
      },
    },
    {
      type: 'box', // Indicator Line
      key: 'line',
      displayOrder: 3,
      data: {
        extract: {
          field: 'qMeasureInfo/0',
          props: {
            start: { field: 'qMeasureInfo/0' },
            end: { field: 'qMeasureInfo/0' },
          },
        },
      },
      settings: {
        major: { scale: 'x' },
        minor: { scale: 'y' },
        box: { fill: '#FFFFFF' },
        orientation: 'vertical',
      },
    },
    {
      type: 'labels',
      displayOrder: 4,
      settings: {
        sources: [{
          component: 'line',
          selector: 'rect',
          strategy: {
            type: 'bar',
            settings: {
              direction: 'up',
              fontSize: 18,
              justify: 0,
              fill: '#4f4f4f',
              labels: [{
                label({ data }) {
                  return (data && data.label) ? data.label : '';
                },
                placements: [
                  { position: 'outside' },
                  { position: 'inside' },
                ],
              }],
            },
          },
        }],
      },
    },

  ],
};
