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
        top: `${(this.size.height * row.y) - (data.settings.height / 2) - 10}px`, // extra 10px for the text
        'text-align': 'center',
        'font-size': '10px',
        color: data.settings.color,
        'background-image': `url("${data.settings.image}")`,
        'background-repeat': 'no-repeat',
        'background-position': 'center bottom',
        width: `${data.settings.width}px`,
        height: `${data.settings.height + 12}px`, // extra 12px for the text
      };
      const res = this.h('div', {
        attrs: {
          class: 'domPointImage',
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
