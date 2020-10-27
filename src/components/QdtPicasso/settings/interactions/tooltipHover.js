import merge from 'utils/merge';

const tooltipHover = ({
  properties: propertiesProp = {},
} = {}) => {
  const defaultProperties = {
    type: 'native',
    events: {
      mousemove(e) {
        this.chart.component('tooltip').emit('show', e);
      },
      mouseleave() {
        this.chart.component('tooltip').emit('hide');
      },
    },
  };
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default tooltipHover;
