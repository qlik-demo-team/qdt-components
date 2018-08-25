const interaction = {
  type: 'hammer',
  gestures: [{
    type: 'Pan',
    options: {
      event: 'range',
      direction: Hammer.DIRECTION_ALL, // Hammer.DIRECTION_HORIZONTAL,
    },
    events: {
      rangestart(e) {
        this.chart.component('rangeX').emit('rangeStart', e);
      },
      rangemove(e) {
        this.chart.component('rangeX').emit('rangeMove', e);
      },
      rangeend(e) {
        this.chart.component('rangeX').emit('rangeEnd', e);
      },
    },
  }],
};

export default interaction;
