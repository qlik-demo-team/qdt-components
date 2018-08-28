// https://picassojs.com/docs/component-axis.html
const component = function component({
  scale = 'x',
} = {}) {
  const comp = {
    type: 'axis',
    key: `${scale}-axis`,
    scale,
    dock: (scale === 'x') ? 'bottom' : 'left',
    settings: {
      labels: {
        show: true,
        mode: 'auto',
      },
      ticks: {
        show: true, // Toggle ticks on/off // Optional
        margin: 0, // Space in pixels between the ticks and the line. // Optional
        tickSize: 4, // Size of the ticks in pixels. // Optional
      },
      line: {
        show: true, // Toggle line on/off // Optional
      },
      align: 'left', // auto
    },
  };

  return comp;
};

export default component;

