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
} = {}) {
  const comp = {
    type: 'labels',
    key,
    displayOrder,
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
                if (data && component === 'line') myLabel = data.label;
                return myLabel;
              },
              placements: [
                { position: 'inside', fill: insideFill, justify: (direction === 'down') ? 0 : 1 },
                { position: 'outside', fill: outsideFill },
              ],
            }],
          },
        },
      }],
    },
  };

  return comp;
};

export default labels;
