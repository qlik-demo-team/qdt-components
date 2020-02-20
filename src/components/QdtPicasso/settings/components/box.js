const component = function component({
  key = 'bar',
  displayOrder = 1,
  field = 'qDimensionInfo/0',
  collection = null, // For Stacked bar chart
  orientation = 'vertical',
  fill = '#4477AA',
  strokeWidth = 1,
  stroke = '#D2D2D2',
  start = 0,
  end = { field: 'qMeasureInfo/0' },
  measures = 1, // Group Bar Chart
  type = null,
} = {}) {
  const comp = {
    type: 'box',
    key,
    displayOrder,
    data: {
      extract: {
        field,
        props: {
          start,
          end,
        },
      },
    },
    settings: {
      major: {
        scale: (orientation === 'vertical') ? 'x' : 'y',
        fn(d) {
          if (d.scale.bandwidth) {
            return d.scale(d.datum.value) + (d.scale.bandwidth() / (measures + 1));
          }
          return d.scale(d.datum.value);
        },
      },
      minor: { scale: (orientation === 'vertical') ? 'y' : 'x' },
      orientation,
      box: {
        fill,
        strokeWidth,
        stroke,
        width: 1 / measures,
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

  // If we initiate connection in the schema, we get errors
  if (collection) {
    comp.data = { collection };
    comp.settings.minor = { scale: 'y', ref: 'end' };
  }

  if (type === 'merimekko') {
    comp.settings.major = {
      binStart: {
        scale: 'x',
        fn: (b) => {
          const ss = b.resources.scale('b');
          return b.resources.scale('x')(ss.datum(b.datum.series.value).start.value);
        },
      },
      binEnd: {
        fn: (b) => {
          const ss = b.resources.scale('b');
          return b.resources.scale('x')(ss.datum(b.datum.series.value).end.value);
        },
      },
    };
    comp.brush.trigger[0].data = ['series'];
    comp.settings.minor = { scale: 'y', ref: 'end' };
    if (collection !== 'span') comp.settings.major.ref = 'series';
    if (collection === 'span') {
      comp.dock = 'top';
      comp.preferredSize = () => 24;
      comp.settings.minor = { start: 0, end: 1 };
      delete comp.settings.orientation;
    }
  } else if (type === 'pyramid') {
    comp.data.extract = [
      {
        field: 'qDimensionInfo/0',
        props: {
          idx: 0,
          start: 0,
          end: { field: 'qMeasureInfo/0' },
        },
      },
      {
        field: 'qDimensionInfo/0',
        props: {
          idx: 1,
          start: 0,
          end: { field: 'qMeasureInfo/1' },
        },
      },
    ];
    comp.settings.minor = {
      start: (d) => d.resources.scale('x')(0),
      end: (d) => d.resources.scale('x')(
        d.datum.end.value * (d.datum.idx.value === 1 ? -1 : 1),
      ),
    };
  }

  return comp;
};

export default component;
