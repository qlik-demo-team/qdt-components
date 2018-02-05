import React from 'react';
import PropTypes from 'prop-types';
// import autobind from 'autobind-decorator';
import Hypercube from '../utilities/Hypercube';
import '../styles/index.scss';

export default class QdtKpi extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      qMeasure: PropTypes.string.isRequired,
    }

    constructor(props) {
      super(props);

      this.state = {
        kpi: null,
      };
    }

    async componentWillMount() {
      const kpi = await Hypercube(this.props.qDocPromise, [], [this.props.qMeasure], 1);
      this.setState({ kpi: kpi[0][0].qText });
    }

    render() {
      const { kpi } = this.state;
      return (
        <div className="qtd-kpi">{kpi}</div>
      );
    }
}
