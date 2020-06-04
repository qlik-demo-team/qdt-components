import { Light as defaultTheme } from 'themes';
import merge from 'utils/merge';
import axis from './components/axis';
import legend from './components/legend';
import tooltip from './components/tooltip';
import domPointLabel from './components/domPointLabel';
import point from './components/point';
import range from './components/range';
import tooltipHover from './interactions/tooltipHover';
import rangePan from './interactions/rangePan';
import legendClick from './interactions/legendClick';

const ScatterPlot = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = {
    scales: {
      x: { data: { field: 'qMeasureInfo/1' }, expand: 0.1 },
      y: { data: { field: 'qMeasureInfo/0' }, expand: 0.2, invert: true },
      c: {
        data: { extract: { field: 'qDimensionInfo/0' } },
        // range: theme.palette,
        type: 'color',
      },
    },
    components: [
      axis(),
      axis({ scale: 'y' }),
      point({
        properties: {
          displayOrder: 3,
          data: {
            extract: {
              props: {
                x: { field: 'qMeasureInfo/1' },
                group: { field: 'qDimensionInfo/0' },
              },
            },
          },
          settings: {
            stroke: { scale: 'c', ref: 'group' },
            fill: { scale: 'c', ref: 'group' },
          },
        },
      }),
      domPointLabel({
        properties: {
          displayOrder: 4,
        },
      }),
      legend({
        properties: {
          displayOrder: 5,
        },
      }),
      tooltip(),
      range(),
      range({ scale: 'y' }),
    ],
    interactions: [tooltipHover(), rangePan(), rangePan({ scale: 'y' }), legendClick()],
  };
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default ScatterPlot;
