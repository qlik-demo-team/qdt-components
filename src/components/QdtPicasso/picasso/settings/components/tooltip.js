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
      || node.key === 'pie'
      || node.key === 'rects'), // Mekko
    // Create the data model
    extract: ({ node }) => { // resources
      const { data, key } = node;
      // console.log(data, key);
      // const formatterFn = resources.formatter({ type: 'd3-number', format: '.2s' });
      // const dataProps = Object.keys(node.data)
      //   .filter((key) => key !== 'value'
      //     && key !== 'label'
      //     && key !== 'source'
      //     //   key !== 'legend' &&
      //     && key !== 'x'
      //     && key !== 'y')
      //   .map((key) => {
      //     const {
      //       label, end, value, start,
      //     } = node.data[key]; // Series for Stacked Barchart
      //     let myValue = (label) || value; // Value si for the Stacked bar
      //     const myLabel = (node.data[key].source && node.data[key].source.field) ? node.data[key].source.field : key;
      //     if (end) {
      //       const { value: evalue } = end;
      //       if (evalue) myValue = evalue;
      //     }
      //     if (start) {
      //       const { value: evalue } = start;
      //       if (evalue) myValue = evalue;
      //     }
      //     if (Number.isNaN(myValue)) myValue = formatterFn(myValue);
      //     return ({
      //       label: myLabel,
      //       value: myValue,
      //     });
      //   });
      // return {
      //   title: node.data.label,
      //   color: node.attrs.fill,
      //   props: dataProps,
      // };
      return { data, key };
    },
    // Generate virtual nodes
    content: ({ h, data }) => {
      let html = '';
      switch (data[0].key) {
        // line, dots
        case 'point':
        case 'point2':
          html = h('div.qdt-tooltip-header', {}, [
            h('div.qdt-tooltip-header-title', {}, `${data[0].data.label}: `),
            h('div.qdt-tooltip-header-measure', {}, `${data[0].data.y.label}`),
          ]);
          break;
        // Pie
        case 'pie':
          html = h('div.qdt-tooltip-header', {}, [
            h('div.qdt-tooltip-header-title', {}, `${data[0].data.label}: `),
            h('div.qdt-tooltip-header-measure', {}, `${data[0].data.num.label}`),
          ]);
          break;
        // Barcharts, Gauge
        case 'bar':
        default:
          if (data[0].data.series) { // Stacked
            html = h('div.qdt-tooltip-header', {}, [
              h('div.qdt-tooltip-header-title', { align: 'center', style: { 'border-bottom': '1px solid rgba(255,255,255,0.2)', 'padding-bottom': '5px', display: 'block' } }, `${data[0].data.label}`),
              h('div.qdt-tooltip-header-measure', { align: 'center', style: { 'padding-top': '5px' } }, `${data[0].data.series.label}: ${data[0].data.end.value}`),
            ]);
          } else {
            html = h('div.qdt-tooltip-header', {}, [
              h('div.qdt-tooltip-header-title', {}, `${data[0].data.label}: `),
              h('div.qdt-tooltip-header-measure', {}, `${data[0].data.end.label}`),
            ]);
          }
          break;
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
