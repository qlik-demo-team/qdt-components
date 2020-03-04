import { format } from 'd3-format';
import merge from 'utils/merge';
import { Light as defaultTheme } from 'themes';

const labels = ({
  theme: themeProp = {},
  properties: propertiesProp = {},
  type = 'bar',
  component = 'bars',
  orientation = 'vertical',
  labels: labelsProp = null,
} = {}) => {
  const theme = merge(defaultTheme, themeProp);  //eslint-disable-line
  const defaultProperties = {
    type: 'labels',
    displayOrder: 2,
    settings: {
      sources: [{
        component,
        selector: type === 'bar' ? 'rect' : 'path',
        strategy: {
          type,
          settings: {
            direction: ({ data }) => (
              (type === 'bar' && orientation === 'vertical' && (data && data.end.value > data.start.value ? 'up' : 'down'))
              || (type === 'bar' && orientation === 'horizontal' && (data && data.end.value > data.start.value ? 'right' : 'left'))
              || (type === 'rows' && (data && data.end.value > data.start.value ? 'right' : 'left'))
              || (type === 'slice' && 'rotated')
            ),
            align: 0.5,
            justify: 0,
            fontSize: 9,
            labels: labelsProp || [{
              label: ({ data }) => (
                (type === 'bar' && format('.2s')(data.end.value))
                || (type === 'slice' && `${format('.2s')(data.num.label)}`)
              ),
              placements: [
                { position: 'inside', fill: '#FFFFFF', justify: 1 },
                { position: 'outside', fill: '#666666', justify: 0 },
              ],
            }],
          },
        },
      }],
    },
  };
  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default labels;
