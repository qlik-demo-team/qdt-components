import { Light as defaultTheme } from 'themes';
import merge from 'utils/merge';
import axis from './components/axis';
// import box from './components/box';
import labels from './components/labels';
import tooltip from './components/tooltip';
import range from './components/range';
import rangePan from './interactions/rangePan';
import tooltipHover from './interactions/tooltipHover';

const Treemap = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
} = {}) => {
  const theme = merge(defaultTheme, themeProp);
  const defaultProperties = {
    collections: [{
      key: 'span',
      data: {
        hierarchy: {
          label(datum) {
            return datum.qText ? datum.qText : '';
          },
          value(datum) {
            return datum.qValues.length ? datum.qValues[0].qNum : 0;
          },
          props: {
            series: { field: 'qDimensionInfo/0' },
            color: {
              field: 'qDimensionInfo/0',
            },
          },
        },
      },
    }],
    scales: {
      c: {
        data: { extract: { field: 'qDimensionInfo/0' } },
        range: theme.range,
        type: 'color',
      },
    },
    components: [
      axis({
        scale: 'y',
        formatter: {
          type: 'd3-number',
          format: '.0%',
        },
      }),
      axis({
        scale: 'x',
        formatter: {
          type: 'd3-number',
          format: '.0%',
        },
      }), {
        key: 'treemap',
        type: 'treemap',
        scale: 'c',
        data: { collection: { key: 'span' } },
        brush: {
          trigger: [{
            on: 'tap',
            contexts: ['select'],
            data: ['series'],
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
      },
      labels({
        displayOrder: 2,
        properties: {

          settings: {
            sources: [
              {
                component: 'treemap',
                selector: 'rect',
                strategy: {
                  type: 'rows',
                  settings: {
                    fontSize: 14,
                    // fill: ({ data }) => '#333', // select a color contrasting the containing shape
                    fill: () => '#FFFFFF', // select a color contrasting the containing shape
                    padding: 4,
                    justify: 0,
                    align: 0,
                    labels: [
                      {
                        fontSize: 14,
                        label({ data }) {
                          // group dimension label
                          // return data ? data.parent.data.label : '';
                          return data ? data.parentLabel : '';
                        },
                      },
                      {
                        fontSize: 12,
                        label({ data }) {
                          // rectangel dimension label
                          return data ? data.label : '';
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
        labels: [
          {
            fontSize: 14,
            label({ data }) {
              // group dimension label
              // return data ? data.parent.data.label : '';
              return data ? data.parentLabel : '';
            },
          },
          {
            fontSize: 12,
            label({ data }) {
              // rectangel dimension label
              return data ? data.label : '';
            },
          },
        ],
      }),
      range(),
      tooltip(),
    ],
    interactions: [tooltipHover(), rangePan()],
  };
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default Treemap;
