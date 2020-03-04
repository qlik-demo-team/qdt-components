import merge from 'utils/merge';

const rangePan = ({
  properties: propertiesProp = {},
  scale = 'x',
} = {}) => {
  const defaultProperties = {
    type: 'hammer',
    gestures: [{
      type: 'Pan',
      options: {
        event: 'range',
        direction: Hammer.DIRECTION_HORIZONTAL,
      },
      events: {
        rangestart(e) {
          this.chart.component(`${scale}-range`).emit('rangeStart', e);
        },
        rangemove(e) {
          this.chart.component(`${scale}-range`).emit('rangeMove', e);
        },
        rangeend(e) {
          this.chart.component(`${scale}-range`).emit('rangeEnd', e);
        },
      },
    }],
  };
  if (scale === 'y') {
    defaultProperties.gestures[0].options.direction = Hammer.DIRECTION_VERTICAL;
  }
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default rangePan;
