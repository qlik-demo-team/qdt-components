import React from 'react';
import PropTypes from 'prop-types';
import picasso from 'picasso.js';
// import picassoQ from 'picasso-plugin-q';
import QdtObject from './QdtObject';
import '../styles/index.scss';

// const data = [{
//   type: 'matrix',
//   data: [
//     ['Month', 'Sales'],
//     ['Jan', 8357],
//     ['Feb', 4610],
//     ['Mar', 3720],
//     ['Apr', 2961],
//     ['May', 1378],
//     ['June', 9137],
//     ['July', 8802],
//     ['Aug', 7707],
//     ['Sep', 7894],
//     ['Oct', 7221],
//     ['Nov', 4432],
//     ['Dec', 5403],
//   ],
// }];


const QdtPicassoHorizontalBar = ({ qData, qLayout }) => {
  console.log(90);
  //   console.log(qData);
//   qLayout.qHyperCube.qDataPages.push(qData);
  const data = {...qLayout, qDataPages: [qData]};
  console.log(qLayout);
  //   console.log(data);
  //   console.log(picasso);
  //   picasso.use(picassoQ);
  //   if (!pic) {
  const settings = {
    scales: {
      xScale: {
        data: { field: 'qMeasureInfo/0' },
      },
      yScale: {
        data: { extract: { field: 'qDimensionInfo/0' } },
        padding: 0.1,
      },
    },
    components: [{
      type: 'axis',
      dock: 'left',
      scale: 'yScale',
    }, {
      type: 'axis',
      dock: 'bottom',
      scale: 'xScale',
    }, {
      key: 'bars',
      type: 'box',
      displayOrder: 1,
      data: {
        extract: {
          field: 'qDimensionInfo/0',
          props: {
            start: 0,
            end: { field: 'qMeasureInfo/0' },
          },
        },
      },
      settings: {
        orientation: 'horizontal',
        major: { scale: 'yScale' },
        minor: { scale: 'xScale' },
        box: {
          fill: '#a0a0a0',
          strokeWidth: 1,
          stroke: 'rgba(0, 0, 0, 0.2)',
        },
      },
      brush: {
        trigger: [{
          on: 'tap',
          action: 'toggle',
          contexts: ['highlight', 'selection', 'tooltip'],
          propagation: 'stop', // 'stop' => prevent trigger from propagating further than the first shape
          globalPropagation: 'stop', // 'stop' => prevent trigger of same type to be triggered on other components
          touchRadius: 24,
        }],
        consume: [{
          context: 'highlight',
          style: {
            active: {
              fill: 'red',
              stroke: '#333',
              strokeWidth: 2,
            },
            inactive: {
              opacity: 0.3,
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
          component: 'bars',
          selector: 'rect', // select all 'rect' shapes from the 'bars' component
          strategy: {
            type: 'bar', // the strategy type
            settings: {
              direction({ data }) { // data argument is the data bound to the shape in the referenced component
                // console.log(4);
                // console.log(data);
                return data && data.end.value > data.start.value ? 'right' : 'left';
              },
              fontFamily: 'Helvetica',
              fontSize: 14,
              align: 0.5,
              justify: 1,
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
    }],
    // interactions: [
    //   {
    //     type: 'native',
    //     key: 'here',
    //     enable() { // bool or function
    //       this.chart;
    //       return true;
    //     },
    //     events: {
    //       mouseover(e) {
    //         const label = e.target.attributes.getNamedItem('data-label');
    //         const value = e.target.attributes.getNamedItem('data-value');
    //         if (label && value) {
    //           generateTooltip({
    //             x: e.pageX,
    //             y: e.pageY,
    //             label: label.value,
    //             value: value.value,
    //           });
    //         }
    //       },
    //       mousemove(e) { // key should point to a native event
    //         const label = e.target.attributes.getNamedItem('data-label');
    //         const value = e.target.attributes.getNamedItem('data-value');
    //         if (label && value) {
    //           generateTooltip({
    //             x: e.pageX,
    //             y: e.pageY,
    //             label: label.value,
    //             value: value.value,
    //           });
    //         }
    //       },
    //       mouseout(e) {
    //         const d = document.getElementById('qdt-tooltip');
    //         d.style.visibility = 'hidden';
    //       },
    //       mousedown(e) {
    //         if (e.target.attributes.getNamedItem('data-label') && e.target.attributes.getNamedItem('data-value')) {
    //           console.log(e.target.attributes.getNamedItem('data-label').value);
    //           console.log(e.target.attributes.getNamedItem('data-value').value);
    //         }
    //       },
    //     },
    //   },
    // ],
  };

  setTimeout(() => {
    picasso.chart({
      element: document.querySelector('#barchart'),
      //   data,
      data: [{
        type: 'q',
        key: 'qHyperCube',
        data: qLayout.qHyperCube,
      }],
      settings,
    });
  }, 1000);
  //   }
  return <div className="qtd-picasso-horizontal-bar"><div id="barchart" /></div>;
};
QdtPicassoHorizontalBar.propTypes = {
  qData: PropTypes.object.isRequired,
  qLayout: PropTypes.object.isRequired,
};

const QdtPicassoHorizontalBarObject = QdtObject(QdtPicassoHorizontalBar, 'qHyperCube');
QdtPicassoHorizontalBarObject.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  options: PropTypes.object,
  qPage: PropTypes.object,
};
QdtPicassoHorizontalBarObject.defaultProps = {
  cols: [],
  options: {},
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 3,
    qHeight: 1000,
  },
};

export default QdtPicassoHorizontalBarObject;
