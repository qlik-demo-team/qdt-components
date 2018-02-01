import React from 'react';
import PropTypes from 'prop-types';

export default class QdtViz extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.oneOf([null, 'barchart', 'boxplot', 'combochart', 'distributionplot', 'gauge', 'histogram', 'kpi', 'linechart', 'piechart', 'pivot-table', 'scatterplot', 'table', 'treemap', 'extension']),
    cols: PropTypes.array,
    options: PropTypes.object,
    width: PropTypes.string,
    height: PropTypes.string,
    qAppPromise: PropTypes.object,
  }

  static defaultProps = {
    id: null,
    type: null,
    cols: [],
    options: {},
    width: '100%',
    height: '400px',
    qAppPromise: null,
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

  componentWillUnmount() {
    this.close();
  }

  async create() {
    try {
      const {
        id, type, cols, options,
      } = this.props;
      const qApp = await this.props.qAppPromise;
      const qVizPromise = id ? qApp.visualization.get(id) : qApp.visualization.create(type, cols, options); // eslint-disable-line max-len
      return qVizPromise;
    } catch (error) {
      this.setState({ error });
      return undefined;
    }
  }

  async show() {
    try {
      const qViz = await this.qVizPromise;
      if (qViz) {
        await this.setState({ loading: false });
        qViz.show(this.node);
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

  render() {
    if (this.state.error) {
      return <div>{this.state.error.message}</div>;
    } else if (this.state.loading) {
      return <div>Loading...</div>;
    }
    const { width, height } = this.props;
    return <div ref={(node) => { this.node = node; }} style={{ width, height }} />;
  }
}
