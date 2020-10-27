import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';

const box = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
  orientation = 'vertical',
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const majorScale = (orientation === 'vertical' && 'x') || (orientation === 'horizontal' && 'y') || null;
  const minorScale = (orientation === 'vertical' && 'y') || (orientation === 'horizontal' && 'x') || null;
  const defaultProperties = {
    type: 'box',
    key: 'bars',
    displayOrder: 1,
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          start: 0,
          end: { field: 'qMeasureInfo/0' },
        },
      },
    },
    settings: {
      major: { scale: majorScale },
      minor: { scale: minorScale, ref: 'end' },
      orientation,
      box: {
        fill: theme.palette.primary.main,
        stroke: theme.palette.primary.light,
        strokeWidth: 1,
        width: 1,
      },
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

export default box;
