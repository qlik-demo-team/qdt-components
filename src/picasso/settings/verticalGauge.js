export default {
  scales: {
    x: { data: { extract: { field: 'qMeasureInfo/0' } }, include: [1] },
    y: { min: { ref: 'min' }, max: { ref: 'max' }, invert: true },
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
            start: { field: 'qMeasureInfo/3' },
            end: { field: 'qMeasureInfo/4' },
          },
        },
      },
      settings: {
        major: { scale: 'x' },
        minor: { scale: 'y' },
        box: { fill: '#F93F17' },
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
            start: { field: 'qMeasureInfo/1' },
            end: { field: 'qMeasureInfo/2' },
          },
        },
      },
      settings: {
        major: { scale: 'x' },
        minor: { scale: 'y' },
        box: { fill: '#46C646' },
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
              //   position: 'outside',
              fontSize: 18,
              // align: 0.5,
              justify: 0,
              fill: '#FFF',
              //   offset: 50,
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
