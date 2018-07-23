import React from 'react';
import PropTypes from 'prop-types';
import utility from '../utilities/';
import Preloader from '../utilities/Preloader';

export default class QdtViz extends React.Component {
  static propTypes = {
    qAppPromise: PropTypes.object.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
  }

  static defaultProps = {
    width: '100%',
    height: '100%',
  }

  constructor(props) {
    super(props);

    this.uid = utility.Uid(8);
    this.state = {
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.create();
  }

  async create() {
    try {
      const { qAppPromise } = this.props;
      const qApp = await qAppPromise;
      qApp.getObject(this.uid, 'CurrentSelections');
      await this.setState({ loading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { width, height } = this.props;
    if (this.state.error) {
      return <div>{this.state.error.message}</div>;
    } else if (this.state.loading) {
      const paddingTop = (parseInt(height, 0)) ? (height / 2) - 10 : 0;
      return <Preloader width={width} height={height} paddingTop={paddingTop} />;
    }
    return <div style={{ width, height }} id={this.uid} />;
  }
}
