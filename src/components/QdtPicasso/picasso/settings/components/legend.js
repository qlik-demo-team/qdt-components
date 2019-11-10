const component = {
  type: 'legend-cat',
  key: 'legend',
  dock: 'right',
  scale: 'c',
  brush: {
    trigger: [{
      on: 'tap',
      contexts: ['select'],
    }],
    consume: [{
      context: 'select',
      style: {
        active: {
          opacity: 1,
        },
        inactive: {
          opacity: 0.5,
        },
      },
    }],
  },
};

export default component;
