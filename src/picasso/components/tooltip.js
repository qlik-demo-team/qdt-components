export default {
  require: ['chart', 'renderer'],
  defaultSettings: {
    background: '#f9f9f9',
    fontSize: '12px',
  },
  renderer: 'dom',
  on: {
    hover(e) { // eslint-disable-line consistent-return
      const {
        clientX, clientY, pageX, pageY,
      } = e;
      const { left, top } = this.chart.element.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;
      let shapes = this.chart.shapesAt({
        x,
        y,
      });
      shapes = shapes.filter(shape => shape.type !== 'text');
      if (!shapes.length) return this.renderer.render([]);
      const target = shapes[shapes.length - 1];
      this.renderer.render(this.buildTooltip(target, pageX, pageY));
    },
  },
  buildTooltip(target, x, y) {
    return (
      this.h(
        'div', {
          style: {
            position: 'fixed',
            'z-index': 1,
            left: `${x}px`,
            top: `${y - 34}px`,
            background: this.settings.background,
            color: '#888',
            display: 'flex',
            'box-shadow': '0px 0px 5px 0px rgba(123, 123, 123, 0.5)',
            'border-radius': '5px',
            padding: '8px',
            'font-size': this.settings.fontSize,
            'font-family': 'Arial',
          },
        },
        `${target.data.label}: ${target.data.value}`,
      )
    );
  },
  render(h) {
    this.h = h;
    return [];
  },
};
