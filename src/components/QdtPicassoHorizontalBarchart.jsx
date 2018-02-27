import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import picasso from 'picasso.js';
import picassoQ from 'picasso-plugin-q';
import '../styles/index.scss';

export default class QdtPicassoHorizontalBarchart extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      cols: PropTypes.array.isRequired,
    }

    @autobind
    static hideTooltip() {
      const elements = document.getElementsByClassName('tooltip');
      if (elements[0]) {
        // document.body.removeChild(elements[0]);
        elements[0].style.display = 'none';
      }
    }

    @autobind
    static showTooltip(data, point) {
      console.log(8);
      console.log(data);
      QdtPicassoHorizontalBarchart.hideTooltip();
      //   const currentTooltip = document.createElement('div');
      const currentTooltip = document.getElementsByClassName('tooltip');
      currentTooltip.style.display = 'inline-block';
      const text = `${data[0].values[0].qText}: ${data[0].values[0]}`;
      currentTooltip.appendChild(document.createTextNode(text));
      currentTooltip.style.position = 'absolute';
      currentTooltip.style.top = '-99999px';
      currentTooltip.style.left = '-99999px';
      currentTooltip.classList.add('tooltip');
      document.body.appendChild(currentTooltip);
      currentTooltip.style.top = `${point.y}px`;
      currentTooltip.style.left = `${(point.x + 5)}px`;
    }

    constructor(props) {
      super(props);

      this.qDoc = null;
      this.pic = null;
      this.settings = {
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
                qMeasure: { field: 'qMeasureInfo/0' },
                qDimension: data => data,
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
              height: 10,
            },
          },
          brush: {
            trigger: [{
              on: 'tap',
              action: 'toggle',
              contexts: ['highlight'],
              propagation: 'stop', // 'stop' => prevent trigger from propagating further than the first shape
              globalPropagation: 'stop', // 'stop' => prevent trigger of same type to be triggered on other components
              touchRadius: 24,
            }, {
              on: 'over',
              action: 'set',
              data: ['qDimension', 'qMeasure'],
              propagation: 'stop',
              contexts: ['tooltip'],
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
                  opacity: 0.8,
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
        //         const d = document.getElementById('tooltip');
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
    }

    componentWillMount() {
      picasso.use(picassoQ);
    }
    componentDidMount() {
      try {
        this.create();
      } catch (error) {
        console.log(error);
      }
    }

    @autobind
    async create() {
      this.qDoc = await this.props.qDocPromise;
      this.update();
      this.qDoc.on('changed', async () => { this.update(); });
    }

    @autobind
    async update() {
      console.log(this.props.cols);
      const obj = {
        qInfo: {
          qType: 'visualization',
          qId: '',
        },
        type: 'picasso-horizontal-barchart',
        // labels: true,
        qHyperCubeDef: {
          qDimensions: [{
            qDef: {
              qFieldDefs: [this.props.cols[0]],
              qSortCriterias: [{
                qSortByAscii: 1,
              }],
            },
          }],
          qMeasures: [{
            qDef: {
              qDef: this.props.cols[1],
              qLabel: 'Avg Case Duration',
            },
            qSortBy: {
              qSortByNumeric: -1,
            },
          }],
          qSuppressZero: false,
          qSuppressMissing: true,
          qInterColumnSortOrder: [1, 0],
          qInitialDataFetch: [{
            qLeft: 0, qTop: 0, qWidth: 2, qHeight: 50,
          }],
        },
      };
      const model = await this.qDoc.createSessionObject(obj);
      const qLayout = await model.getLayout();
      console.log(qLayout);
      const { settings } = this;
      this.pic = picasso.chart({
        element: document.querySelector('#barchart'),
        data: [{
          type: 'q',
          key: 'qHyperCube',
          data: qLayout.qHyperCube,
        }],
        settings,
      });

      this.pic.brush('tooltip').on('update', (data) => {
        console.log(7);
        console.log(data);
        console.log(this.pic);
        if (data.length) {
        //   const s = this.pic.getAffectedShapes('tooltip');
          const s = this.pic.getAffectedShapes('tooltip');
          //   const s = document.getElementsByClassName('tooltip')[0];
          console.log(s);
          const rect = s.element.getBoundingClientRect();
          //   const rect = s.getBoundingClientRect();
          const p = {
            x: s.bounds.x + s.bounds.width + rect.x + 5,
            y: s.bounds.y + (s.bounds.height / 2) + (rect.y - 28),
          };
          QdtPicassoHorizontalBarchart.showTooltip(data, p);
        } else {
          QdtPicassoHorizontalBarchart.hideTooltip();
        }
      });
    }

    render() {
      return (
        <div className="qtd-picasso-horizontal-bar">
          <div id="barchart" />
          <div className="tooltip" />
        </div>
      );
    }
}
