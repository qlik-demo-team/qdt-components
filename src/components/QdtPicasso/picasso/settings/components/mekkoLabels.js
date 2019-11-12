const mekkoLabels = function mekkoLabels({
  key = 'labels',
  component = 'cell',
  dock = '@cell',
  selector = 'rect',
  displayOrder = 2,
  fontSize = 12,
  type = 'rows',
  insideFill = '#FFFFFF',
  // format = {
  //   formatter: 'd3',
  //   type: 'number',
  //   format: '.0%',
  // },
  // outsideFill = '#666666',
} = {}) {
  const comp = {
    type: 'labels',
    dock,
    key,
    displayOrder,
    settings: {
      sources: [{
        component,
        selector,
        strategy: {
          type,
          settings: {
            fontSize,
            fill: insideFill,
            labels: [{
              label: (d) => (d.data ? d.data.label : ''),
            }, {
              label: (d) => (d.data ? d.formatter()(d.data.end.value - d.data.start.value) : ''),
            }, {
              label: (d) => (d.data ? (d.data.metric.value).toFixed(0) : ''),
            }],
          },
        },
      }],
    },
  };

  return comp;
};

export default mekkoLabels;
