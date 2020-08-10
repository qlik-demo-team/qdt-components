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
  point: pointProp = {},
  pointImage: pointImageProp = null,
  labels: labelsProp = {},
  legend: legendProp = {},
  tooltip: tooltipProp = {},
  range: rangeProp = {},
  xAxis: xAxisProp = {},
  yAxis: yAxisProp = {},
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
    components: [],
    interactions: [],
  };

  if (xAxisProp) defaultProperties.components.push(axis(merge({ scale: 'x' }, xAxisProp)));
  if (yAxisProp) defaultProperties.components.push(axis(merge({ scale: 'y' }, yAxisProp)));

  defaultProperties.components.push(
    point(
      merge({
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
      }, pointProp),
    ),
  );

  if (pointImageProp) {
    defaultProperties.components.push(
      point(
        merge({
          properties: {
            type: 'domPointImage',
            key: 'point2',
            displayOrder: 4,
            data: {
              extract: {
                props: {
                  x: { field: 'qMeasureInfo/1' },
                  group: { field: 'qDimensionInfo/0' },
                },
              },
            },
            settings: {
              image: 'https://webapps.qlik.com/qdt-components/plain-html/emoji_smiley.png',
              width: 32,
              height: 32,
            },
          },
        }, pointImageProp),
      ),
    );
  }

  if (labelsProp) {
    defaultProperties.components.push(
      domPointLabel(
        merge({
          properties: {
            displayOrder: 5,
          },
        }, labelsProp),
      ),
    );
  }

  if (legendProp) {
    defaultProperties.components.push(
      legend(
        merge({
          properties: {
            displayOrder: 6,
          },
        }, legendProp),
      ),
    );
    defaultProperties.interactions.push(legendClick());
  }

  if (tooltipProp) {
    defaultProperties.components.push(tooltip(merge({}, tooltipProp)));
    defaultProperties.interactions.push(tooltipHover());
  }

  if (rangeProp) {
    defaultProperties.components.push(range());
    defaultProperties.components.push(range({ scale: 'y' }));
    defaultProperties.interactions.push(rangePan());
    defaultProperties.interactions.push(rangePan({ scale: 'y' }));
  }

  const properties = merge(defaultProperties, propertiesProp);
  return properties;
};

export default ScatterPlot;
