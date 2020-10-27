// https://picassojs.com/docs/component-grid-line.html
import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';

const grid = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
  x = true,
  y = true,
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = { type: 'grid-line' };
  if (x) { defaultProperties.x = { scale: 'x' }; }
  if (y) { defaultProperties.y = { scale: 'y' }; }
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default grid;
