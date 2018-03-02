import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import picasso from 'picasso.js';
import picassoQ from 'picasso-plugin-q';
import '../styles/index.scss';

const tooltipDiv = {
  x: 0, y: 0, w: 0, h: 0,
};
export default class QdtBarchart extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      type: PropTypes.oneOf(['horizontal']),
      cols: PropTypes.array.isRequired,
      options: PropTypes.object,
      width: PropTypes.string,
      height: PropTypes.string,
    //   select: PropTypes.func.isRequired,
    //   beginSelections: PropTypes.func.isRequired,
    //   endSelections: PropTypes.func.isRequired,
    }

    static defaultProps = {
      options: {},
      type: null,
      width: '100%',
      height: '100%',
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
      QdtBarchart.hideTooltip();
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
      this.settings = null;
      if (this.props.type === 'horizontal') {
        this.settings = {
          scales: {
            xScale: {
              data: { field: 'qMeasureInfo/0' },
              expand: 0.1,
              min: 0,
            },
            yScale: {
              data: { extract: { field: 'qDimensionInfo/0' } },
              padding: 0.2,
            },
          },
          components: [{
            type: 'grid-line',
            x: 'xScale',
          }, {
            type: 'axis',
            dock: 'left',
            scale: 'yScale',
            settings: {
              labels: {
                show: true,
                margin: 3,
                maxLengthPx: 150,
                minLengthPx: 100,
                mode: 'auto', // Control how labels arrange themself. Availabe modes are `auto`, `horizontal`, `layered` and `tilted`. When set to `auto` the axis determines the best possible layout in the current context. // Optional
                align: 0.5, // Align act as a slider for the text bounding rect over the item bandwidth, given that the item have a bandwidth. Except when labels are tilted, then the align is a pure align that shifts the position of the label anchoring point. // Optional
                offset: 0, // Offset in pixels along the axis direction. // Optional
              },
              ticks: {
                show: true, // Toggle ticks on/off // Optional
                margin: 0, // Space in pixels between the ticks and the line. // Optional
                tickSize: 4, // Size of the ticks in pixels. // Optional
              },
              line: {
                show: true, // Toggle line on/off // Optional
                align: 'right',
              },
              align: 'right',
            },
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
                //   width: 0.5,
                //   minHeightPx: 50,
              },
            },
            brush: {
              trigger: [{
                on: 'tap',
                action: 'toggle',
                contexts: ['highlight', 'select'],
                data: ['qDimension'],
                //   propagation: 'stop', // 'stop' => prevent trigger from propagating further than the first shape
                //   globalPropagation: 'stop', // 'stop' => prevent trigger of same type to be triggered on other components
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
                    direction: 'right',
                    //   fontFamily: 'Helvetica',
                    //   fontSize: 14,
                    //   align: 0.5,
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
                    QdtBarchart.showTooltip();
                  }
                },
                mouseout() {
                  QdtBarchart.hideTooltip();
                },
              },
            },
          ],
        };
      }
      if (this.props.options) {
        // Alter settings based on options
      }
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
      //   if (!this.pic) {
      this.pic = picasso.chart({
        element: document.querySelector('#qdt-barchart'),
        data: [{
          type: 'q',
          key: 'qHyperCube',
          data: qLayout.qHyperCube,
        }],
        settings,
      });
      //   } else { // UPDATE Breaks the labels
      //     this.pic.update({
      //       data: [{
      //         type: 'q',
      //         key: 'qHyperCube',
      //         data: qLayout.qHyperCube,
      //       }],
      //       settings,
      //     });
      //   }

      this.pic.brush('tooltip').on('update', (data) => {
        if (data.length) {
          QdtBarchart.showTooltip(data);
        } else {
          QdtBarchart.hideTooltip();
        }
      });

      // No data is return if clicked on an inactive rect. How do we deselect?
      this.pic.brush('select').on('update', (data) => {
        if (!this.state.selectionsOn) this.beginSelections();
        if (data && data[0] && data[0].values && data[0].values[0] && data[0].values[0].qElemNumber) this.select(Number(data[0].values[0].qElemNumber));
      });
    }

    @autobind
    beginSelections() {
      //   const { qObject } = this;
      this.setState({ selectionsOn: true });
    //   qObject.beginSelections(['/qHyperCubeDef']);
    }

    @autobind
    async endSelections() {
      //   const { qObject } = this;
      //   qObject.endSelections(qAccept);
      await this.pic.brush('highlight').end();
      await this.pic.brush('select').end();
      this.setState({ selectionsOn: false });
      this.selections = [];
    }

    @autobind
    async select(qElemNumber) {
      //   const { qObject } = this;
      if (this.selections.includes(qElemNumber)) {
        // remove if selected
        this.selections = this.selections.filter(x => x !== qElemNumber);
      } else {
        this.selections = [...this.selections, qElemNumber];
      }
    }

    @autobind
    async confirmSelections() {
      const { qObject } = this;
      await qObject.selectHyperCubeValues('/qHyperCubeDef', 0, this.selections, true); // Occasionally breaks. "Uncaught (in promise) Error: Invalid parameters"
      this.endSelections();
    }

    @autobind
    async cancelSelections() {
      this.endSelections();
    }

    render() {
      const { confirmSelections, cancelSelections } = this;
      const { width, height } = this.props;
      const { selectionsOn } = this.state;
      return (
        <div className="qtd-picasso-horizontal-bar">
          <div className="qdt-barchart-header">
            {selectionsOn &&
              <div className="qdt-barchart-selection">
                <button className="lui-button lui-button--danger" tabIndex={0} key="cancelSelections" onClick={() => cancelSelections()}><span className="lui-icon lui-icon--close" /></button>
                <button className="lui-button lui-button--success" tabIndex={0} key="confirmSelections" onClick={() => confirmSelections()}><span className="lui-icon lui-icon--tick" /></button>
              </div>
            }
          </div>
          <div className="qdt-tooltip" />
          <div id="qdt-barchart" style={{ width, height }} />
        </div>
      );
    }
}
