// https://picassojs.com/docs/component-axis.html
const component = function component({
  scale = 'x',
  format,
  formatter = null,
} = {}) {
  const comp = {
    type: 'axis',
    key: `${scale}-axis`,
    scale,
    dock: (scale === 'x') ? 'bottom' : 'left',
    format,
    // formatter,
    settings: {
      labels: {
        show: true,
        mode: 'auto',
        align: 0.5,
        // invert: true,
        justify: 0,
      },
      ticks: {
        show: true, // Toggle ticks on/off // Optional
        margin: 0, // Space in pixels between the ticks and the line. // Optional
        tickSize: 4, // Size of the ticks in pixels. // Optional
      },
      line: {
        show: true, // Toggle line on/off // Optional
      },
      paddingStart: 0, // Optional
      /* Padding in direction perpendicular to the axis */
      paddingEnd: 10, // Optional
      /* Set the anchoring point of the axis. Avaialable options are `auto/left/right/bottom/top`. In `auto` the axis determines the best option. The options are restricted based on the axis orientation, a vertical axis may only anchor on `left` or `right` */
      align: 'auto', // Optional
    //   align: 'left', // auto
    },
  };

  if (formatter) comp.formatter = formatter;

  return comp;
};

export default component;
