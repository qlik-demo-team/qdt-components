import React from 'react';
import PropTypes from 'prop-types';
// import autobind from 'autobind-decorator';
import Hypercube from '../utilities/Hypercube';
import '../styles/index.scss';

export default class QdtKpi extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      qMeasure: PropTypes.string.isRequired,
      listenToSelections: PropTypes.bool,
    }

    static defaultProps = {
      listenToSelections: false,
    }

    constructor(props) {
      super(props);

      this.state = {
        kpi: null,
      };
    }

    async componentWillMount() {
      const qDoc = await this.props.qDocPromise;
      let kpi = await Hypercube(qDoc, [], [this.props.qMeasure], 1, 0);
      this.setState({ kpi: kpi[0][0].qText });
      if (this.props.listenToSelections) {
        qDoc.on('changed', async () => {
          kpi = await Hypercube(qDoc, [], [this.props.qMeasure], 1, 0, this.props.listenToSelections);
          this.setState({ kpi: kpi[0][0].qText });
        });
      }
    }

    render() {
      const { kpi } = this.state;
      return (
        <div className="qtd-kpi">{kpi}</div>
      );
    }
}
