import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';

const lineArea = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
  showLine = true,
  showArea = true,
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
        },
      },
    },
    settings: {
      coordinates: {
        major: { scale: 'x' },
        minor: { scale: 'y', ref: 'y' },
        minor0: { scale: 'y', fn: (d) => d.scale(0) },
      },
      orientation: 'horizontal',
      layers: {
        curve: 'linear',
        show: true,
        line: {
          show: showLine,
          opacity: 1,
          stroke: theme.palette.primary.main,
          strokeWidth: 2,
        },
        area: {
          show: showArea,
          fill: theme.palette.primary.main,
          opacity: 0.8,
        },
      },
    },
  };
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default lineArea;
