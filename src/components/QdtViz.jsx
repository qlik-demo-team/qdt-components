import React from 'react';
import PropTypes from 'prop-types';
import Preloader from '../utilities/Preloader';
import QdtButton from './QdtButton';

export default class QdtViz extends React.Component {
  static propTypes = {
    qAppPromise: PropTypes.object.isRequired,
    id: PropTypes.string,
    type: PropTypes.oneOf([null, 'barchart', 'boxplot', 'combochart', 'distributionplot', 'gauge', 'histogram', 'kpi', 'linechart', 'piechart', 'pivot-table', 'scatterplot', 'table', 'treemap', 'extension']),
    cols: PropTypes.array,
    options: PropTypes.object,
    noSelections: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    minWidth: PropTypes.string,
    minHeight: PropTypes.string,
    exportData: PropTypes.bool,
    exportDataTitle: PropTypes.string,
    exportDataOptions: PropTypes.object,
    exportImg: PropTypes.bool,
    exportImgTitle: PropTypes.string,
    exportImgOptions: PropTypes.object,
    exportPdf: PropTypes.bool,
    exportPdfTitle: PropTypes.string,
    exportPdfOptions: PropTypes.object,
  }

  static defaultProps = {
    id: null,
    type: null,
    cols: [],
    options: {},
    noSelections: false,
    width: '100%',
    height: '100%',
    minWidth: 'auto',
    minHeight: 'auto',
    exportData: false,
    exportDataTitle: 'Export Data',
    exportDataOptions: { format: 'CSV_T', state: 'P' },
    exportImg: false,
    exportImgTitle: 'Export Image',
    exportImgOptions: { width: 300, height: 400, format: 'JPG' },
    exportPdf: false,
    exportPdfTitle: 'Export Pdf',
    exportPdfOptions: { documentSize: 'A4', orientation: 'landscape', aspectRatio: 2 },
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
    };
  }

  componentWillMount() {
    this.qVizPromise = this.create();
  }

  componentDidMount() {
    this.show();
  }

  componentWillReceiveProps(newProps) {
    const options = this.props;
    if (JSON.stringify(newProps.options) !== JSON.stringify(options)) {
      this.setOptions(newProps.options);
    }
  }

  componentWillUnmount() {
    this.close();
  }

  async setOptions(options) {
    try {
      const qViz = await this.qVizPromise;
      qViz.setOptions(options);
    } catch (error) {
      this.setState({ error });
    }
  }

  async create() {
    try {
      const {
        qAppPromise, id, type, cols, options,
      } = this.props;
      const qApp = await qAppPromise;
      const qVizPromise = id ? qApp.visualization.get(id) : qApp.visualization.create(type, cols, options); // eslint-disable-line max-len
      return qVizPromise;
    } catch (error) {
      this.setState({ error });
      return undefined;
    }
  }

  async show() {
    try {
      const { noSelections } = this.props;
      const qViz = await this.qVizPromise;
      if (qViz) {
        await this.setState({ loading: false });
        qViz.show(this.node, { noSelections });
      } else {
        throw new Error('Please specify a qConfig global variable');
      }
    } catch (error) {
      this.setState({ error });
    }
  }

  async close() {
    try {
      const qViz = await this.qVizPromise;
      qViz.close();
    } catch (error) {
      this.setState({ error });
    }
  }

  async resize() {
    const qViz = await this.qVizPromise;
    qViz.resize();
  }

  render() {
    const {
      width, height, minWidth, minHeight, exportData, exportDataTitle, exportDataOptions, exportImg, exportImgTitle, exportImgOptions, exportPdf, exportPdfTitle, exportPdfOptions,
    } = this.props;
    const { error, loading } = this.state;
    if (error) {
      return <div>{error.message}</div>;
    } if (loading) {
    //   return <div>Loading...</div>;
      const paddingTop = (parseInt(height, 0)) ? (height / 2) - 10 : 0;
      return <Preloader width={width} height={height} paddingTop={paddingTop} />;
    }
    const btnStyle = { display: 'inline-block', paddingRight: 20, paddingTop: 15 };
    return (
      <div>
        <div
          ref={(node) => { this.node = node; }}
          style={{
            width, height, minWidth, minHeight,
          }}
        />
        {exportData
          && (
          <div style={btnStyle}>
            <QdtButton type="exportData" qVizPromise={this.qVizPromise} title={exportDataTitle} options={exportDataOptions} />
          </div>
          )}
        {exportImg
          && (
          <div style={btnStyle}>
            <QdtButton type="exportImg" qVizPromise={this.qVizPromise} title={exportImgTitle} options={exportImgOptions} />
          </div>
          )}
        {exportPdf
          && (
          <div style={btnStyle}>
            <QdtButton type="exportPdf" qVizPromise={this.qVizPromise} title={exportPdfTitle} options={exportPdfOptions} />
          </div>
          )}
      </div>
    );
  }
}
