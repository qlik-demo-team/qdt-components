const component = {
  key: 'domPointLabel',
  type: 'domPointLabel',
  displayOrder: 1,
  data: {
    extract: {
      field: 'qDimensionInfo/0',
      props: {
        x: { field: 'qMeasureInfo/1' },
        y: { field: 'qMeasureInfo/0' },
      },
    },
  },
  settings: {
    x: { scale: 'x' },
    y: { scale: 'y' },
    fontSize: '10px',
    color: '#000000',
    offset: 30,
    width: 50,
    height: 10,
  },
};

export default component;
