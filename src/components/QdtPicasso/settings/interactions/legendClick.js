import merge from 'utils/merge';

const legendClick = ({
  properties: propertiesProp = {},
} = {}) => {
  const defaultProperties = {
    type: 'native',
    events: {
      click(e) {
        if (e.srcElement.dataset.componentKey && e.srcElement.dataset.action) {
          this.chart.component(e.srcElement.dataset.componentKey).emit(e.srcElement.dataset.action);
        }
      },
    },
  };
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default legendClick;
