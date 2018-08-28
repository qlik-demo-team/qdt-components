const labels = function labels({
  key = 'labels',
  component = 'bar',
  selector = 'rect',
  displayOrder = 2,
  direction = 'down',
  fontSize = 12,
  type = 'bar',
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
                { position: 'inside', fill: '#fff', justify: (direction === 'down') ? 0 : 1 },
                { position: 'outside', fill: '#666' },
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

