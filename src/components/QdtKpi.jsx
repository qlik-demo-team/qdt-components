import React from 'react';
import PropTypes from 'prop-types';
import QdtObject from './QdtObject';
import '../styles/index.scss';

const QdtKpi = ({ qData }) => {
  const value = qData.qMatrix[0][0].qText;
  return <div className="qtd-kpi">{value}</div>;
};
QdtKpi.propTypes = {
  qData: PropTypes.object.isRequired,
};

const QdtKpiObject = QdtObject(QdtKpi, 'qHyperCube');
QdtKpiObject.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  qProp: PropTypes.object.isRequired,
  qPage: PropTypes.object,
};
QdtKpiObject.defaultProps = {
  componentProps: {},
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 1,
  },
};

export default QdtKpiObject;
