import { format } from 'd3-format';
import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';

const tooltip = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
  format: formatSpec = '.2s',
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = {
    key: 'tooltip',
    type: 'tooltip',
    displayOrder: 10,
    settings: {
      filter: (nodes) => nodes.filter((node) => ['bars', 'range', 'point', 'point2', 'pie', 'rects'].includes(node.key)),
      extract: ({ node }) => {
        const { data, key } = node;
        return { data, key };
      },
      content: ({ h, data }) => {
        let html = '';
        switch (data[0].key) {
          // line, dots
          case 'point':
          case 'point2':
            html = h('div.qdt-tooltip-header', {}, [
              h('div.qdt-tooltip-header-title', {}, `${data[0].data.label}: `),
              h('div.qdt-tooltip-header-measure', {}, `${format('.2s')(data[0].data.y.label).replace(/G/, 'B')}`),
            ]);
            break;
          // Pie
          case 'pie':
            html = h('div.qdt-tooltip-header', {}, [
              h('div.qdt-tooltip-header-title', {}, `${data[0].data.label}: `),
              h('div.qdt-tooltip-header-measure', {}, `${format(formatSpec)(data[0].data.num.label)}`),
            ]);
            break;
          // Barcharts, Gauge
          case 'bars':
          default:
            if (data[0].data.series) { // Stacked
              html = h('div.qdt-tooltip-header', {}, [
                h('div.qdt-tooltip-header-title', { align: 'center', style: { 'border-bottom': '1px solid rgba(255,255,255,0.2)', 'padding-bottom': '5px', display: 'block' } }, `${data[0].data.series.label}`),
                h('div.qdt-tooltip-header-measure', { align: 'center', style: { 'padding-top': '5px' } }, `${data[0].data.label}: ${format(formatSpec)(data[0].data.end.value - data[0].data.start.value)}`),
              ]);
            } else {
              html = h('div.qdt-tooltip-header', {}, [
                h('div.qdt-tooltip-header-title', {}, `${data[0].data.label}: `),
                h('div.qdt-tooltip-header-measure', {}, `${format(formatSpec)(data[0].data.end.label).replace(/G/, 'B')}`),
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
    // formatter: 'formatterGtoB',
  };
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default tooltip;
