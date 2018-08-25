const component = {
  key: 'point',
  type: 'point',
  data: {
    extract: {
      field: 'qDimensionInfo/0',
      props: {
        x: { field: 'qMeasureInfo/1' },
        y: { field: 'qMeasureInfo/0' },
        num: { field: 'qMeasureInfo/0' },
        qDimension: { field: 'qDimensionInfo/0' },
        qMeasure: { field: 'qMeasureInfo/0' },
        qMeasure2: { field: 'qMeasureInfo/1' },
      },
    },
  },
  settings: {
    x: { scale: 'x' },
    y: { scale: 'y' },
    shape: 'circle',
    size: 0.5,
    strokeWidth: 2,
    stroke: '#fff',
    opacity: 0.8,
    fill: { scale: 'color' },
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

export default component;
