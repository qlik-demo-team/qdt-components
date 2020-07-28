import { Light as defaultTheme } from 'themes';
import merge from 'utils/merge';
// import axis from './components/axis';
// import box from './components/box';
import labels from './components/labels';
import tooltip from './components/tooltip';
import range from './components/range';
import rangePan from './interactions/rangePan';
import tooltipHover from './interactions/tooltipHover';

const Treemap = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
  tooltip: tooltipProp = {},
} = {}) => {
  const theme = merge(defaultTheme, themeProp); // eslint-disable-line
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
            series: { field: 'qMeasureInfo/0', value: (d) => d.qText },
            color: { field: 'qMeasureInfo/1' },
            select: { field: 'qDimensionInfo/0' },
          },
        },
      },
    }],
    scales: {
      c: {
        data: { extract: { field: 'qMeasureInfo/1' } },
        range: theme.range,
        type: 'color',
      },
    },
    components: [
      // axis({
      //   scale: 'y',
      //   formatter: {
      //     type: 'd3-number',
      //     format: '.0%',
      //   },
      // }),
      // axis({
      //   scale: 'x',
      //   formatter: {
      //     type: 'd3-number',
      //     format: '.0%',
      //   },
      // }),
      {
        key: 'treemap',
        type: 'treemap',
        scale: 'c',
        data: { collection: { key: 'span' } },
        brush: {
          trigger: [{
            on: 'tap',
            contexts: ['select'],
            data: ['select'],
          }],
          consume: [{
            context: 'select',
            data: ['select'],
            style: {
              active: {
                opacity: 1,
                strokeWidth: 1,
                stroke: '#FFFFFF',
              },
              inactive: {
                opacity: 0.5,
                strokeWidth: 1,
                stroke: '#FFFFFF',
              },
            },
          }],
        },
      },
      labels({
        displayOrder: 3,
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
                    fill: ({ data }) => ((data && data.depth === 1) ? '#000000' : '#FFFFFF'), // select a color contrasting the containing shape
                    // padding: 30,
                    justify: 0,
                    align: 0,
                    labels: [
                      {
                        fontSize: 10,
                        padding: 10,
                        label: ({ data }) => (data ? data.label : ''),
                      },
                    ],
                  },
                },
              },
            ],
          },
          brush: {
            trigger: [{
              on: 'tap',
              contexts: ['select'],
              data: ['select'],
            }],
            consume: [{
              context: 'select',
              data: ['select'],
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
      }),
      range(),
    ],
    interactions: [rangePan()],
  };
  if (tooltipProp) {
    defaultProperties.components.push(tooltip(merge({}, tooltipProp)));
    defaultProperties.interactions.push(tooltipHover());
  }
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default Treemap;
