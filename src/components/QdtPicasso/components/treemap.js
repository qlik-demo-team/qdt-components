import * as d3 from 'd3-hierarchy';

const leafNodes = (nodes) => nodes.reduce((ary, node) => {
  if (Array.isArray(node.children)) {
    ary.push(node); // Add the Category
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
    const parentLabelHeight = 30;

    const dataset = data.root
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);
    const root = d3.treemap()
      // .padding(1)
      .paddingTop(parentLabelHeight)
      .paddingRight(0)
      .paddingInner(1)
      .round(true)
      .size([width, height])(dataset);

    const nodes = leafNodes(root.children);

    // Create Category nnodes for labels
    // const parents = root.children.filter((d) => d.children).map((node) => ({
    //   data: node.data, x0: node.x0, x1: node.x1, y0: node.y1 - parentLabelHeight, y1: node.y1,
    // }));

    const _nodes = nodes.map((node) => ({
      type: 'rect',
      x: node.x0,
      y: node.y0,
      width: node.x1 - node.x0,
      height: (node.depth === 1) ? parentLabelHeight : node.y1 - node.y0,
      fill: (node.depth === 1) ? '#F2F2F2' : this.scale(node.data.color.value),
      // data: { ...node.data, height: node.height, parent: node.parent }, // Circular Ref
      data: {
        ...node.data, height: node.height, parentLabel: node.parent.data.label, depth: node.depth,
      }, //
      _stroke: 'white',
      _strokeWidth: 1,
    }));

    return _nodes;
  },
};
