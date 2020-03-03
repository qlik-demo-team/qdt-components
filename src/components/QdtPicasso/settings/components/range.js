import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';

const range = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
  scale = 'x',
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = {
    key: 'x-range',
    type: 'brush-range',
    settings: {
      brush: 'select',
      direction: 'horizontal',
      scale: 'x',
      target: {
        component: 'x-axis',
      },
      bubbles: {
        align: 'end',
      },
    },
  };
  if (scale === 'y') {
    defaultProperties.key = 'y-range';
    defaultProperties.settings.direction = 'vertical';
    defaultProperties.settings.scale = 'y';
    defaultProperties.settings.target.component = 'y-axis';
  }
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default range;
