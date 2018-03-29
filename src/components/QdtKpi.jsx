import React from 'react';
import PropTypes from 'prop-types';
import withHyperCube from './withHyperCube';
import '../styles/index.scss';

const QdtKpiComponent = ({ qData, options }) => {
  const value = (options.precision) ? Number.parseFloat(qData.qMatrix[0][0].qNum).toFixed(options.precision) : qData.qMatrix[0][0].qText;
  return <div className="qtd-kpi">{value}</div>;
};
QdtKpiComponent.propTypes = {
  qData: PropTypes.object.isRequired,
  options: PropTypes.object,
};
QdtKpiComponent.defaultProps = {
  options: null,
};

const QdtKpi = withHyperCube(QdtKpiComponent);
QdtKpi.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qHyperCubeDef: PropTypes.object,
  qPage: PropTypes.object,
  options: PropTypes.object,
};
QdtKpi.defaultProps = {
  cols: null,
  qHyperCubeDef: null,
  options: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 1,
  },
};

export default QdtKpi;
