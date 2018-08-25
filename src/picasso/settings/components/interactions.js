const interactions = {
  tooltip: {
    type: 'native',
    events: {
      mousemove(e) {
        this.chart.component('tooltip').emit('show', e);
      },
      mouseleave() {
        this.chart.component('tooltip').emit('hide');
      },
      wheel: function w(e) {
        if (e) {
          const components = this.chart.componentsFromPoint(e);
          components.forEach((comp) => {
            comp.emit('scroll', e.deltaY);
          });
          e.preventDefault();
        }
      },
    },
  },
  pan: {
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
  },
};

export default interactions;
