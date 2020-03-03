import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';

const line = ({ 
  theme: themeProp = {}, 
  properties: propertiesProp = {},
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = {
    type: 'line',
    key: 'line',
    displayOrder: 1,
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          y: { field: 'qMeasureInfo/0' },
          y0: '',
        },
      },
    },
    settings: {
      coordinates: {
        major: { scale: 'x' },
        minor: { scale: 'y', ref: 'y' },
        minor0: { scale: 'y', ref: 'y0' },
      },
      orientation: 'horizontal',
      layers: {
        curve: 'linear',
        show: true,
        line: {
          opacity: 1,
          stroke: theme.primary,
          strokeWidth: 2,
        },
        area: {
          show: false,
          fill: theme.primary,
          opacity: 0.8,
        },
      },
    },
  };
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default line;
