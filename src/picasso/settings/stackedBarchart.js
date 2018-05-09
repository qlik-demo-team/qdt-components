// year = Case Owner Group = qDimensionInfo/1
// month = Date.autoCalendar.YearMonth = qDimensionInfo/0
// sales = qMeasureInfo/0
export default {
  collections: [{
    key: 'stacked',
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          series: { field: 'qDimensionInfo/1' },
          end: { field: 'qMeasureInfo/0' },
        },
      },
      stack: {
        stackKey: d => d.value,
        value: d => d.end.value,
      },
    },
  }],
  scales: {
    y: {
      data: {
        collection: {
          key: 'stacked',
        },
      },
      invert: true,
      expand: 0.2,
      min: 0,
    },
    x: { data: { field: 'qDimensionInfo/0' }, padding: 0.3 },
    color: { data: { extract: { field: 'qDimensionInfo/1' } }, type: 'color' },
  },
  components: [
    {
      key: 'x-axis',
      type: 'axis',
      scale: 'x',
      dock: 'bottom',
    },
    {
      key: 'y-axis',
      type: 'axis',
      scale: 'y',
      dock: 'left',
    },
    {
      type: 'legend-cat',
      scale: 'color',
      dock: 'top',
    },
    {
      key: 'tooltip',
      type: 'tooltip',
      background: 'white',
    },
    {
      type: 'box',
      key: 'bars',
      displayOrder: 1,
      data: {
        collection: 'stacked',
      },
      settings: {
        major: { scale: 'x' },
        minor: { scale: 'y', ref: 'end' },
        box: {
          fill: { scale: 'color', ref: 'series' },
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
    },
    {
      key: 'rangeY',
      type: 'brush-range',
      settings: {
        brush: 'select',
        direction: 'vertical',
        scale: 'y',
        target: {
          component: 'y-axis',
        },
        bubbles: {
          align: 'start',
        },
      },
    },
    {
      type: 'labels',
      displayOrder: 2,
      settings: {
        sources: [{
          component: 'bars',
          selector: 'rect',
          strategy: {
            type: 'bar',
            settings: {
              direction: 'right',
              labels: [{
                label({ data }) {
                  return data ? data.end.label : '';
                },
                placements: [
                  { position: 'inside', justify: 1, fill: '#fff' },
                  { position: 'outside', justify: 0, fill: '#666' },
                ],
              }],
            },
          },
        }],
      },
    },
  ],
  interactions: [
    {
      type: 'hammer',
      gestures: [{
        type: 'Pan',
        options: {
          event: 'range',
          direction: Hammer.DIRECTION_VERTICAL,
        },
        events: {
          rangestart(e) {
            this.chart.component('rangeY').emit('rangeStart', e);
          },
          rangemove(e) {
            this.chart.component('rangeY').emit('rangeMove', e);
          },
          rangeend(e) {
            this.chart.component('rangeY').emit('rangeEnd', e);
          },
        },
      }],
    },
    {
      type: 'native',
      events: {
        mousemove(e) {
          this.chart.component('tooltip').emit('hover', e);
        },
        mouseout(e) {
          this.chart.component('tooltip').emit('leave', e);
        },
      },
    },
  ],
};
