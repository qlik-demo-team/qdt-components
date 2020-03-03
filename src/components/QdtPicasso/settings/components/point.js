import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';

const point = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = {
    type: 'point',
    key: 'point',
    displayOrder: 1,
    data: {
      extract: {
        field: { field: 'qDimensionInfo/0' },
        props: {
          x: { field: 'qDimensionInfo/0' },
          y: { field: 'qMeasureInfo/0' },
          num: { field: 'qMeasureInfo/0' },
        },
      },
    },
    settings: {
      x: { scale: 'x' },
      y: { scale: 'y' },
      shape: 'circle',
      size: 0.5,
      strokeWidth: 2,
      stroke: '#FFFFFF',
      opacity: 0.8,
      fill: { scale: 'c' },
    },
    brush: {
      trigger: [{
        on: 'tap',
        contexts: ['select'],
      }],
      consume: [{
        context: 'select',
        style: {
          active: {
            opacity: 1,
          },
          inactive: {
            opacity: 0.5,
          },
        },
      }],
    },
  };
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default point;
