import React from 'react';
import PropTypes from 'prop-types';
import withHyperCube from './withHyperCube';
import '../styles/index.scss';

const QdtKpiComponent = ({ qData }) => {
  const value = qData.qMatrix[0][0].qText;
  return <div className="qtd-kpi">{value}</div>;
};
QdtKpiComponent.propTypes = {
  qData: PropTypes.object.isRequired,
};

const QdtKpi = withHyperCube(QdtKpiComponent);
QdtKpi.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qHyperCubeDef: PropTypes.object,
  qPage: PropTypes.object,
};
QdtKpi.defaultProps = {
  cols: null,
  qHyperCubeDef: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 1,
  },
};

export default QdtKpi;
