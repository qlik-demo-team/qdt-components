export default {
  require: ['resolver'],
  renderer: 'dom',
  defaultSettings: {
    settings: {},
  },
  beforeRender(options) {
    this.size = options.size;
  },
  generatePoints(data) {
    return data.items.map((row) => {
      const style = {
        position: 'absolute',
        left: `${(this.size.width * row.x) - (data.settings.width / 2)}px`,
        top: `${(this.size.height * row.y) - (data.settings.height / 2) - data.settings.offset}px`,
        'font-size': (data.settings.fontSize) ? data.settings.fontSize : '10px',
        color: (data.settings.color) ? data.settings.color : '#000000',
      };
      const res = this.h('div', {
        attrs: {
          class: 'domLabel',
        },
        style,
      }, row.data.label);
      return res;
    });
  },
  render(h, { data }) {
    this.h = h; // snabbdom reference

    const resolved = this.resolver.resolve({
      data,
      settings: this.settings.settings,
      scaled: {
        x: this.size.width,
        y: this.size.height,
      },
    });

    return this.generatePoints(resolved);
  },
};
