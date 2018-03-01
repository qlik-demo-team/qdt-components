import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import picasso from 'picasso.js';
import picassoQ from 'picasso-plugin-q';
import '../styles/index.scss';

const tooltipDiv = {
  x: 0, y: 0, w: 0, h: 0,
};
export default class QdtPicassoHorizontalBarchart extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      cols: PropTypes.array.isRequired,
    //   select: PropTypes.func.isRequired,
    //   beginSelections: PropTypes.func.isRequired,
    //   endSelections: PropTypes.func.isRequired,
    }

    @autobind
    static hideTooltip() {
      const elements = document.getElementsByClassName('qdt-tooltip');
      if (elements[0]) {
        elements[0].style.display = 'none';
      }
    }

    @autobind
    static showTooltip(data) {
      QdtPicassoHorizontalBarchart.hideTooltip();
      const currentTooltip = document.getElementsByClassName('qdt-tooltip')[0];
      currentTooltip.style.display = 'inline-block';
      if (data) {
        const text = `${data[0].values[0].qText}: ${data[1].values[0]}`;
        currentTooltip.innerHTML = text;
        const rect = currentTooltip.getBoundingClientRect();
        tooltipDiv.w = rect.width;
        tooltipDiv.h = rect.height;
      }
      currentTooltip.style.position = 'absolute';
      currentTooltip.style.top = `${tooltipDiv.y - tooltipDiv.h - 10}px`;
      currentTooltip.style.left = `${(tooltipDiv.x - (tooltipDiv.w / 2))}px`;
    }

    constructor(props) {
      super(props);

      this.state = {
        // qDoc: null,
        // qObject: null,
        selectionsOn: false,
      };

      this.qDoc = null;
      this.qObject = null;
      this.selectionsOn = false;
      this.selections = [];
      this.pic = null;
      this.mouseX = 0;
      this.mouseY = 0;
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
              fill: '#49637A',
              strokeWidth: 1,
              stroke: '#3d5266',
              height: 10,
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
        interactions: [
          {
            type: 'native',
            key: 'here',
            events: {
              mousemove(e) { // key should point to a native event
                tooltipDiv.x = e.pageX;
                tooltipDiv.y = e.pageY;
                if (e.target.id !== 'qdt-barchart') {
                  QdtPicassoHorizontalBarchart.showTooltip();
                }
              },
              mouseout() {
                QdtPicassoHorizontalBarchart.hideTooltip();
              },
            },
          },
        ],
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
    }

    @autobind
    async update() {
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
      this.qObject = await this.qDoc.createSessionObject(obj);
      this.qObject.on('changed', async () => { this.update(); });
      const qLayout = await this.qObject.getLayout();
      //   const qPage = {
      //     qTop: 0,
      //     qLeft: 0,
      //     qWidth: 10,
      //     qHeight: 100,
      //   };
      //   const qLayout = await this.qObject.getHyperCubeData('/qHyperCubeDef', [qPage]); // eslint-disable-line max-lenyout);
      const { settings } = this;
      this.pic = picasso.chart({
        element: document.querySelector('#qdt-barchart'),
        data: [{
          type: 'q',
          key: 'qHyperCube',
          data: qLayout.qHyperCube,
        }],
        settings,
      });

      this.pic.brush('tooltip').on('update', (data) => {
        if (data.length) {
          QdtPicassoHorizontalBarchart.showTooltip(data);
        } else {
          QdtPicassoHorizontalBarchart.hideTooltip();
        }
      });

      this.pic.brush('select').on('update', (data) => {
        if (!this.state.selectionsOn) {
          this.beginSelections();
        }
        this.select(Number(data[0].values[0].qElemNumber));
      });
    }

    @autobind
    beginSelections() {
      //   const { qObject } = this;
      this.setState({ selectionsOn: true });
    //   qObject.beginSelections(['/qHyperCubeDef']);
    }

    @autobind
    endSelections() {
      //   const { qObject } = this;
      //   qObject.endSelections(qAccept);
      this.setState({ selectionsOn: false });
    }

    @autobind
    async select(qElemNumber) {
    //   const { qObject } = this;
      this.selections = [...this.selections, qElemNumber];
    //   qObject.selectHyperCubeValues('/qHyperCubeDef', dimIndex, [qElemNumber], true);
    }

    @autobind
    async confirmSelections() {
      const { qObject } = this;
      await qObject.selectHyperCubeValues('/qHyperCubeDef', 0, this.selections, true);
      this.endSelections();
    }

    @autobind
    async cancelSelections() {
      this.selections = [];
      this.pic.brush('highlight').end();
      this.endSelections();
    }

    render() {
      const { confirmSelections, cancelSelections } = this;
      const { selectionsOn } = this.state;
      console.log(selectionsOn);
      return (
        <div className="qtd-picasso-horizontal-bar">
          {selectionsOn &&
            <div className="qdt-barchart-selection">
              <button className="lui-button" tabIndex={0} key="confirmSelections" onClick={() => confirmSelections()}><span className="lui-icon lui-icon--tick" /></button>
              <button className="lui-button" tabIndex={0} key="cancelSelections" onClick={() => cancelSelections()}><span className="lui-icon lui-icon--remove" /></button>
            </div>
            }
          <div id="qdt-barchart" />
          <div className="qdt-tooltip" />
        </div>
      );
    }
}
