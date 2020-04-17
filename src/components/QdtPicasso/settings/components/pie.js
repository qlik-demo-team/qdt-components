import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';

const pie = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = {
    key: 'pie',
    type: 'pie',
    displayOrder: 1,
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          num: { field: 'qMeasureInfo/0' },
        },
      },
    },
    settings: {
      slice: {
        arc: { ref: 'num' },
        fill: { scale: 'c' },
        outerRadius: () => 0.9,
        strokeWidth: 1,
        stroke: 'rgba(255, 255, 255, 0.5)',
      },
    },
    brush: {
      trigger: [{
        on: 'tap',
        action: 'toggle',
        contexts: ['select'],
        data: ['qDimension'],
        propagation: 'stop',
        globalPropagation: 'stop',
        touchRadius: 24,
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

export default pie;
