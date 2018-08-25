const component = {
  key: 'tooltip',
  type: 'tooltip',
  displayOrder: 10,
  settings: {
    // Since we only want to target the point marker
    filter: nodes => nodes.filter(node => node.key === 'point' || node.key === 'bars'),
    // Create the data model
    extract: ({ node, resources }) => {
      const formatterFn = resources.formatter({ type: 'd3-number', format: '.2s' });
      const dataProps = Object.keys(node.data)
        .filter(key => key !== 'value' &&
            key !== 'label' &&
            key !== 'source' &&
            key !== 'num' &&
            key !== 'x' &&
            key !== 'y' &&
            key !== 'start' &&
            key !== 'end')
        .map(key => ({
        //   label: node.data[key].source.field,
          label: node.data[key].label,
          value: Number.isNaN(node.data[key].value) ? node.data[key].value : formatterFn(node.data[key].value),
        }));
      return {
        title: `${node.data.label}: ${node.data.value}`,
        color: node.attrs.fill,
        props: dataProps,
      };
    },
    // Generate virtual nodes
    content: ({ h, data }) => {
      const rows = [];
      data.forEach((node) => {
        const title = h('th', {
          attrs: { colspan: 2 },
          style: { fontWeight: 600, 'text-align': 'center', backgroundColor: node.color },
        }, node.title);

        rows.push(title);

        node.props.forEach((prop) => {
          const cells = [
            h('td', {}, `${prop.label}:`),
            h('td', { style: { 'text-align': 'right' } }, prop.value),
          ];
          rows.push(h('tr', {}, cells));
        });
      });

      return h('div', { display: 'table' }, rows);
    },
    afterShow({ element }) {
      const e = element;
      e.children[0].style.opacity = 1;
      e.children[1].style.opacity = 1;
    },
    onHide({ element }) {
      const e = element;
      e.children[0].style.opacity = 0;
      e.children[1].style.opacity = 0;
    },
    placement: {
      type: 'pointer',
      area: 'target',
    },
  },
  style: {
    content: {
      'border-spacing': '4px',
      opacity: 0,
      transition: 'opacity 150ms ease-in',
    },
    arrow: {
      opacity: 0,
      transition: 'opacity 150ms ease-in',
    },
  },
};

export default component;
