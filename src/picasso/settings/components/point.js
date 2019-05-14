const component = function component({
  key = 'point',
  displayOrder = 1,
  field = 'qDimensionInfo/0',
  x = { field: 'qDimensionInfo/0' },
  y = { field: 'qMeasureInfo/0' },
  size = 0.5,
  strokeWidth = 2,
  stroke = '#fff',
  fill = { scale: 'c' },
} = {}) {
  const comp = {
    type: 'point',
    key,
    displayOrder,
    data: {
      extract: {
        field,
        props: {
          x,
          y,
          num: { field: 'qMeasureInfo/0' },
        },
      },
    },
    settings: {
      x: { scale: 'x' },
      y: { scale: 'y' },
      shape: 'circle',
      size,
      strokeWidth,
      stroke,
      opacity: 0.8,
      fill,
    },
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

  return comp;
};

export default component;
