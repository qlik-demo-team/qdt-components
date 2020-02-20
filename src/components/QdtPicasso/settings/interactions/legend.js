const interaction = {
  type: 'native',
  events: {
    click(e) {
      if (e.srcElement.dataset.componentKey && e.srcElement.dataset.action) {
        this.chart.component(e.srcElement.dataset.componentKey).emit(e.srcElement.dataset.action);
      }
    },
  },
};

export default interaction;
