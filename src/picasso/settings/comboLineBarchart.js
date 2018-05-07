export default {
  scales: {
    x: {
      data: { extract: { field: 'qDimensionInfo/0' } },
      padding: 0.3,
    },
    y: {
      data: { field: 'qMeasureInfo/0' },
      invert: true,
      include: [0],
    },
    y1: {
      data: { field: 'qMeasureInfo/1' },
      invert: true,
      //   padding: 0.3,
      expand: 0.02,
    },
    c: {
      data: { field: 'qMeasureInfo/0' },
      type: 'color',
    },
  },
  components: [{
    type: 'grid-line',
    y: 'y',
  }, {
    type: 'axis',
    dock: 'left',
    scale: 'y',
  }, {
    type: 'axis',
    dock: 'bottom',
    scale: 'x',
  }, {
    key: 'tooltip',
    type: 'tooltip',
    background: 'white',
  }, {
    key: 'verticalBars',
    type: 'box',
    displayOrder: 1,
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          start: 0,
          end: { field: 'qMeasureInfo/0' },
          qDimension: { field: 'qDimensionInfo/0' },
          qMeasure: { field: 'qMeasureInfo/0' },
        },
      },
    },
    settings: {
      major: { scale: 'x' },
      minor: { scale: 'y' },
      box: {
        fill: '#49637A',
        //   fill: { scale: 'c', ref: 'end' },
      },
    },
    brush: {
      trigger: [{
        on: 'tap',
        action: 'toggle',
        contexts: ['highlight', 'select'],
        data: ['qDimension'],
        propagation: 'stop', // 'stop' => prevent trigger from propagating further than the first shape
        globalPropagation: 'stop', // 'stop' => prevent trigger of same type to be triggered on other components
        touchRadius: 24,
      }, {
        on: 'over',
        action: 'set',
        contexts: ['tooltip'],
        data: ['qDimension', 'qMeasure'],
        propagation: 'stop',
      }],
      consume: [{
        context: 'highlight',
        style: {
          active: {
            fill: '#77b62a',
            stroke: '#333',
            strokeWidth: 1,
          },
          inactive: {
            opacity: 0.5,
          },
        },
      }],
    },
  },
  {
    type: 'labels',
    displayOrder: 2, // must be larger than the displayOrder for the 'bars' component
    settings: {
      sources: [{
        component: 'verticalBars',
        selector: 'rect',
        strategy: {
          type: 'bar',
          settings: {
            direction: 'top',
            //   justify: 1,
            labels: [{
              label({ data }) {
                return data ? data.end.label : '';
              },
              placements: [ // label placements in prio order. Label will be placed in the first place it fits into
                { position: 'inside', fill: '#fff' },
                { position: 'outside', fill: '#666' },
              ],
            }],
          },
        },
      }],
    },
  },
  {
    key: 'line1',
    type: 'line',
    displayOrder: 3,
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          v: { field: 'qMeasureInfo/1' },
        },
      },
    },
    settings: {
      coordinates: {
        major: { scale: 'x' },
        minor: { scale: 'y1', ref: 'v' },
      },
      orientation: 'horizontal',
      layers: {
        curve: 'linear',
        show: true,
        line: {
          stroke: '#960000',
          strokeWidth: 2,
          opacity: 1,
        },
      },
    },
  },
  {
    key: 'dot',
    type: 'point',
    displayOrder: 4,
    data: {
      extract: {
        field: 'qDimensionInfo/0',
        props: {
          y: { field: 'qMeasureInfo/1' },
          x: { field: 'qDimensionInfo/0' },
          qDimension: { field: 'qDimensionInfo/0' },
          qMeasure: { field: 'qMeasureInfo/1' },
        },
      },
    },
    settings: {
      x: { scale: 'x' },
      y: { scale: 'y1' },
      shape: 'circle',
      size: 0.2,
      strokeWidth: 0,
      stroke: '#fff',
      opacity: 0.8,
      fill: '#960000',
    },
  }],
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
