const component = function component({
  scale = 'x',
} = {}) {
  const comp = {
    key: `${scale}Range`,
    type: 'brush-range',
    settings: {
      brush: 'select',
      direction: (scale === 'x') ? 'horizontal' : 'vertical',
      scale,
      target: {
        component: `${scale}-axis`,
      },
      bubbles: {
        align: 'start',
      },
    },
  };

  return comp;
};

export default component;
