import React from 'react';
import PropTypes from 'prop-types';
import withHyperCube from './withHyperCube';
import utility from '../utilities';
import '../styles/index.scss';

const QdtKpiComponent = ({ qData, roundNum }) => (
  <div className="qtd-kpi">
    { roundNum
        && utility.RoundNum(qData.qMatrix[0][0].qNum, true)
    }
    { !roundNum
        && qData.qMatrix[0][0].qText
    }
  </div>
);
QdtKpiComponent.propTypes = {
  qData: PropTypes.object.isRequired,
  roundNum: PropTypes.bool,
};
QdtKpiComponent.defaultProps = {
  roundNum: false,
};

const QdtKpi = withHyperCube(QdtKpiComponent);
QdtKpi.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qHyperCubeDef: PropTypes.object,
  qPage: PropTypes.object,
  roundNum: PropTypes.bool,
};
QdtKpi.defaultProps = {
  cols: null,
  qHyperCubeDef: null,
  roundNum: false,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 1,
  },
};

export default QdtKpi;
