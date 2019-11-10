import React from 'react';
import PropTypes from 'prop-types';
import useHyperCube from '../../hooks/useHyperCube';
import utility from '../../utilities';
import '../../styles/index.scss';

const QdtKpi = ({
  qDocPromise, cols, qPage, roundNum,
}) => {
  const { qData } = useHyperCube({ qDocPromise, cols, qPage });
  return (
    <>
      { qData
        && (
        <div className="qdt-kpi">
          { roundNum
              && utility.RoundNum(qData.qMatrix[0][0].qNum, true)}
          { !roundNum
              && qData.qMatrix[0][0].qText}
        </div>
        )}
    </>
  );
};

QdtKpi.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qPage: PropTypes.object,
  roundNum: PropTypes.bool,
};
QdtKpi.defaultProps = {
  cols: null,
  roundNum: false,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 1,
  },
};

export default QdtKpi;
