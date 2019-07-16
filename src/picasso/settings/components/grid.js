// https://picassojs.com/docs/component-grid-line.html
const component = function component({
  y = 'y',
  x = 'x',
} = {}) {
  const comp = {
    type: 'grid-line',
    x: (x) ? { scale: x } : null,
    y: (y) ? { scale: y } : null,
  };

  return comp;
};

export default component;
