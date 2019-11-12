const columnLabels = function columnLabels({
  key = 'labels',
  component = 'bar-labels',
  dock = '@bar-labels',
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
              linkData({ node }) { return node.data; },
              label: (d) => {
                if (!d.data) { return ''; }
                return `${d.data.series.label} (${d.formatter()(d.data.end.value - d.data.start.value)})`;
              },
            },
            {
              linkData({ node }) { return node.data; }, label: (d) => (d.data ? `${d.data.metric.label}` : ''),
            }],
          },
        },
      }],
    },
  };

  return comp;
};

export default columnLabels;
