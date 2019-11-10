const component = {
  key: 'tooltip',
  type: 'tooltip',
  displayOrder: 10,
  settings: {
    // Since we only want to target the point marker
    filter: (nodes) => nodes.filter((node) => node.key === 'bar'
      || node.key === 'range'
      || node.key === 'point'
      || node.key === 'point2'
      || node.key === 'pie'),
    //   node.key === 'legend');
    // Create the data model
    extract: ({ node, resources }) => {
      const formatterFn = resources.formatter({ type: 'd3-number', format: '.2s' });
      const dataProps = Object.keys(node.data)
        .filter((key) => key !== 'value'
          && key !== 'label'
          && key !== 'source'
          //   key !== 'legend' &&
          && key !== 'x'
          && key !== 'y'
          && key !== 'start')
        .map((key) => {
          const { label, end, value } = node.data[key]; // Series for Stacked Barchart
          let myValue = (label) || value; // Value si for the Stacked bar
          const myLabel = (node.data[key].source && node.data[key].source.field) ? node.data[key].source.field : '';
          if (end) {
            const { value: evalue } = end;
            if (evalue) myValue = evalue;
          }
          if (Number.isNaN(myValue)) myValue = formatterFn(myValue);
          return ({
            label: myLabel,
            value: myValue,
          });
        });
      return {
        title: node.data.label,
        color: node.attrs.fill,
        props: dataProps,
      };
    },
    // Generate virtual nodes
    content: ({ h, data }) => {
      let html = '';
      if (data.length && data[0].props.length === 1) { // Single Barchart
        html = h('div.qdt-tooltip-header', {}, [
          h('div.qdt-tooltip-header-box', {
            style: { backgroundColor: data[0].color },
          }, ''),
          h('div.qdt-tooltip-header-title', {}, `${data[0].title}: `),
          h('div.qdt-tooltip-header-measure', {}, `${data[0].props[0].value}`),
        ]);
      } else if (data.length && data[0].props.length === 2) {
        html = h('div.qdt-tooltip-header', {}, [
          h('div.qdt-tooltip-header-box', {
            style: { backgroundColor: data[0].color },
          }, ''),
          h('div.qdt-tooltip-header-title', {}, `${data[0].props[0].value}: `),
          h('div.qdt-tooltip-header-measure', {}, `${data[0].props[1].value}`),
        ]);
      }
      return h('div', { display: 'table' }, html);
    },
    afterShow({ element }) {
      const e = element;
      e.children[0].style.opacity = 1;
      e.children[1].style.opacity = 1;
      // debugger;
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
