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
    let visible = [];
    return data.items.map((row) => {
      const left = (this.size.width * row.x) - (data.settings.width / 2);
      const top = (this.size.height * row.y) - (data.settings.height / 2) - data.settings.offset;
      let display = 'inline';
      const p = { w: data.settings.width, h: data.settings.height };
      // Collision detection
      if (visible.length) {
        for (const n of visible) {
          if (
            left < n.left + p.w &&
                left + p.w > n.left &&
                top < n.top + p.h &&
                p.h + top > n.top
          ) {
            display = 'none';
            break;
          }
        }
      }
      if (display === 'inline') visible = [...visible, { left, top }];
      const style = {
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        'font-size': (data.settings.fontSize) ? data.settings.fontSize : '10px',
        color: (data.settings.color) ? data.settings.color : '#000000',
        width: `${data.settings.width}px`,
        'text-align': 'center',
        display,
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
