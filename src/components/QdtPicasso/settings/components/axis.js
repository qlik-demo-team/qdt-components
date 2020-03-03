// https://picassojs.com/docs/component-axis.html
import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';

const axis = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
  scale = 'x',
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = {
    type: 'axis',
    key: 'x-axis',
    scale: 'x',
    dock: 'bottom',
    settings: {
      labels: {
        show: true,
        mode: 'auto',
        align: 0.5,
        justify: 0,
      },
      ticks: {
        show: true,
        margin: 0,
        tickSize: 4,
      },
      line: {
        show: true,
      },
      paddingStart: 0,
      paddingEnd: 10,
      align: 'auto',
    },
  };
  if (scale === 'y') {
    defaultProperties.key = 'y-axis';
    defaultProperties.scale = 'y';
    defaultProperties.dock = 'left';
  }
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default axis;
