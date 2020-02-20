const labels = function labels({
  key = 'labels',
  component = 'bar',
  selector = 'rect',
  displayOrder = 2,
  direction = 'down',
  fontSize = 12,
  type = 'bar',
  insideFill = '#FFFFFF',
  outsideFill = '#666666',
  dock = null,
  justify = (direction === 'down') ? 0 : 1,
} = {}) {
  const comp = {
    type: 'labels',
    key,
    displayOrder,
    dock,
    settings: {
      sources: [{
        component,
        selector,
        strategy: {
          type,
          settings: {
            direction,
            align: 0.5,
            justify: 0,
            fontSize,
            labels: [{
              label({ data }) {
                let myLabel = '';
                if (data && component === 'bar') myLabel = (data.end.label) ? data.end.label : data.end.value; // Stacked barchar has only value
                if (data && component === 'pie') myLabel = `${data.label}: ${data.num.label}`;
                if (data && (component === 'line')) myLabel = data.label;
                if (data && (component === 'bar-labels')) myLabel = `${data.label} (${Math.round(data.metric.value)}%)`; // Mekko
                return myLabel;
              },
              placements: [
                { position: 'inside', fill: insideFill, justify },
                { position: 'outside', fill: outsideFill },
              ],
            }],
          },
        },
      }],
    },
  };

  if (type === 'rows') { // merimekko
    comp.settings.sources[0].strategy.settings = {
      fill: '#FFFFFF',
      labels: [
        {
          label: (d) => (d.data ? `${d.data.label} (${((d.data.end.value - d.data.start.value) * 100).toFixed(2)}%)` : ''),
          // label: (d) => (d.data ? d.data.series.label : ''),
        // }, {
        //   label: (d) => (d.data ? `${((d.data.end.value - d.data.start.value) * 100).toFixed(2)}%` : ''),
        }, {
          label: (d) => (d.data ? (d.data.metric.value).toFixed(0) : ''),
        },
      ],
    };
  }

  return comp;
};

export default labels;
