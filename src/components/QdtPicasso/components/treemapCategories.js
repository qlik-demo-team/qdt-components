import * as d3 from 'd3-hierarchy';
import Colors from '../../../themes/Colors';

export default {
  require: ['chart'],
  defaultSettings: {
    settings: {},
    data: {},
  },
  render({ data }) {
    const { width, height } = this.chart.element.getBoundingClientRect();

    const dataset = data.root
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);
    const root = d3.treemap()
      .padding(1)
      .round(true)
      .size([width, height])(dataset);

    // Create Category nnodes for labels
    const parentLabelHeight = 30;
    // console.log(Colors.GREY_80);
    const nodes = root.children.filter((d) => d.children).map((node) => ({
      type: 'rect',
      // data: node.data, x0: node.x0, x1: node.x1, y0: node.y1 - parentLabelHeight, y1: node.y1,
      x: node.x0,
      y: node.y0,
      data: { ...node.data, height: node.height },
      // fill: 'rgba(0,0,0,0)',
      fill: Colors.GREY_80,
      width: node.x1 - node.x0,
      height: parentLabelHeight,
      // height: node.y1 - node.y0,
      _stroke: 'black',
      _strokeWidth: 3,
    }));

    return nodes;
  },
};
