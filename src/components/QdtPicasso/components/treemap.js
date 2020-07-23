import * as d3 from 'd3-hierarchy';

const leafNodes = (nodes) => nodes.reduce((ary, node) => {
  if (Array.isArray(node.children)) {
    ary.push(...leafNodes(node.children));
    return ary;
  }
  ary.push(node);
  return ary;
}, []);

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

    const nodes = leafNodes(root.children);

    return nodes.map((node) => ({
      type: 'rect',
      x: node.x0,
      y: node.y0,
      width: node.x1 - node.x0,
      height: node.y1 - node.y0,
      fill: this.scale(node.data.color.value),
      // data: { ...node.data, height: node.height, parent: node.parent }, // Circular Ref
      data: { ...node.data, height: node.height, parentLabel: node.parent.data.label },
      _stroke: 'white',
      _strokeWidth: 1,
    }));
  },
};
