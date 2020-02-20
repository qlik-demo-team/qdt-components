// https://picassojs.com/docs/component-legend-cat.html
const component = function component({
  type = 'legend-cat',
  scale = 'c',
  dock = 'right',
  key = 'legend',
} = {}) {
  const comp = {
    type,
    key,
    dock,
    scale,
    settings: {
      layout: { // Optional
        /* Maximum number of columns (vertical) or rows (horizontal) */
        size: 1, // Optional
        /* Layout direction. Either `'ltr'` or `'rtl'` */
        direction: 'ltr', // Optional
        /* Initial scroll offset */
        scrollOffset: 0, // Optional
      },
      /* Settings applied per item */
      item: { // Optional
        /* Whether to show the current item */
        show: true, // Optional
        label: { // Optional
          /* Word break rule, how to apply line break if label text overflows its maxWidth property. Either `'break-word'` or `'break-all'` */
          wordBreak: 'none', // Optional
          /* Max number of lines allowed if label is broken into multiple lines (only applicable with wordBreak) */
          maxLines: 2, // Optional
          /* Maximum width of label, in px */
          maxWidth: 136, // Optional
        },
        shape: { // Optional
          type: 'square', // Optional
          size: 12, // Optional
        },
      },
      title: { // Optional
        /* Whether to show the title */
        show: true, // Optional
        /* Title text. Defaults to the title of the provided data field */
        // text: /* string */, // Optional
        /* Horizontal alignment of the text. Allowed values are `'start'`, `'middle'` and `'end'` */
        anchor: 'start',
        /* Word break rule, how to apply line break if label text overflows its maxWidth property. Either `'break-word'` or `'break-all'` */
        wordBreak: 'none', // Optional
        /* Max number of lines allowed if label is broken into multiple lines, is only appled when `wordBreak` is not set to `'none'` */
        maxLines: 2, // Optional
        /* Maximum width of title, in px */
        maxWidth: 156, // Optional
      },
      navigation: { // Optional
        button: { // Optional
          // class: {
          //   'my-button': true,
          // },
          // content(h, state) {
          //   return h('span', {
          //     class: {
          //       [`arrow-${state.direction}`]: true,
          //     },
          //   });
          // },
        },
        /* Whether the button should be disabled or not */
        disabled: false, // Optional
      },
    },
    brush: {
      trigger: [{
        on: 'tap',
        contexts: ['select'],
      }],
      consume: [{
        context: 'select',
        style: {
          active: {
            opacity: 1,
          },
          inactive: {
            opacity: 0.5,
          },
        },
      }],
    },
  };

  return comp;
};

export default component;
