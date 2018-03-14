import React from 'react';
import PropTypes from 'prop-types';

export default class QdtViz extends React.Component {
  static propTypes = {
    qAppPromise: PropTypes.object.isRequired,
    id: PropTypes.string,
    type: PropTypes.oneOf([null, 'barchart', 'boxplot', 'combochart', 'distributionplot', 'gauge', 'histogram', 'kpi', 'linechart', 'piechart', 'pivot-table', 'scatterplot', 'table', 'treemap', 'extension']),
    cols: PropTypes.array,
    options: PropTypes.object,
    width: PropTypes.string,
    height: PropTypes.string,
  }

  static defaultProps = {
    id: null,
    type: null,
    cols: [],
    options: {},
    width: '100%',
    height: '100%',
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
    alert("Viz will mount");
  }

  componentDidMount() {
    this.show();
    alert("mounted");
  }

  componentWillReceiveProps(newProps) {
    if (JSON.stringify(newProps.options) !== JSON.stringify(this.props.options)) {
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
      const qViz = await this.qVizPromise;
      if (qViz) {
        await this.setState({ loading: false });
        qViz.show(this.node);
        console.log("Showing viz");
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
    if (this.state.error) {
      return <div>{this.state.error.message}</div>;
    } else if (this.state.loading) {
      return <div>Loading...</div>;
    }
    const { width, height } = this.props;
    return <div ref={(node) => { this.node = node; }} style={{ width, height }}  onClick={() => {console.log("qdt clicked!");}} />;
  }
}
