// https://picassojs.com/docs/component-legend-cat.html
import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';

const legend = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = {
    type: 'legend-cat',
    key: 'legend',
    dock: 'right',
    scale: 'c',
    settings: {
      layout: {
        size: 4,
        direction: 'ltr',
        scrollOffset: 0,
      },
      item: {
        show: true,
        label: {
          wordBreak: 'none',
          maxLines: 2,
          maxWidth: 136,
        },
        shape: {
          type: 'square',
          size: 12,
        },
      },
      title: {
        show: true,
        anchor: 'start',
        wordBreak: 'none',
        maxLines: 2,
        maxWidth: 156,
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

export default legend;
