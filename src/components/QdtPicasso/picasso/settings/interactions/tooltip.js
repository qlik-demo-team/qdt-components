const interaction = {
  type: 'native',
  events: {
    mousemove(e) {
      this.chart.component('tooltip').emit('show', e);
    },
    mouseleave() {
      this.chart.component('tooltip').emit('hide');
    },
    // wheel: function w(e) {
    //   if (e) {
    //     const components = this.chart.componentsFromPoint(e);
    //     components.forEach((comp) => {
    //       comp.emit('scroll', e.deltaY);
    //     });
    //     e.preventDefault();
    //   }
    // },
  },
};

export default interaction;
