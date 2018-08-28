const interaction = function interaction({
  scale = 'x',
} = {}) {
  const inter = {
    type: 'hammer',
    gestures: [{
      type: 'Pan',
      options: {
        event: 'range',
        direction: (scale === 'x') ? Hammer.DIRECTION_HORIZONTAL : Hammer.DIRECTION_VERTICAL, // Hammer.DIRECTION_ALL
      },
      events: {
        rangestart(e) {
          this.chart.component(`${scale}Range`).emit('rangeStart', e);
        },
        rangemove(e) {
          this.chart.component(`${scale}Range`).emit('rangeMove', e);
        },
        rangeend(e) {
          this.chart.component(`${scale}Range`).emit('rangeEnd', e);
        },
      },
    }],
  };

  return inter;
};

export default interaction;
