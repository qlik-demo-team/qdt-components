const component = function component({
  key = 'line',
  displayOrder = 1,
  field = 'qDimensionInfo/0',
  strokeWidth = 2,
  stroke = '#4477AA',
  fill = '#4477AA',
  y = { field: 'qMeasureInfo/0' },
  y0 = '', // For the rangeArea chart. null breaks!!
  minor = { scale: 'y', ref: 'y' },
  area = false,
} = {}) {
  const comp = {
    type: 'line',
    key,
    displayOrder,
    data: {
      extract: {
        field,
        props: {
          y,
          y0,
        },
      },
    },
    settings: {
      coordinates: {
        major: { scale: 'x' },
        minor,
        minor0: (y0) ? { scale: 'y', ref: 'y0' } : null,
      },
      orientation: 'horizontal',
      layers: {
        curve: 'linear',
        show: true,
        line: {
          opacity: 1,
          stroke,
          strokeWidth,
        },
        area: {
          show: area,
          fill,
          opacity: 0.8,
        },
      },
    },
  };

  return comp;
};

export default component;
