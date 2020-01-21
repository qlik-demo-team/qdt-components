/**
 * @name QdtSequencer
 * @param {array} cols - Dimension for the data to cycle through
 * @param {number} delay [5] - Loop through the results in given seconds.
 * @param {bool} selectRow [false] - If we want each cycled row to be selected.
 * @param {number} keyCode [null] - If we want to control the sequencer with a key stroke. Toggles play.
 * @param {bool} navigation [true] - If we want to show / hide the navigation and use only key strokes
 * @description
 * Loop through a dimension and make selections.
*/

import React from 'react';
import PropTypes from 'prop-types';
import useListObject from '../../hooks/useListObject';
import useSequencer from '../../hooks/useSequencer';
import '../../styles/index.scss';

const QdtSequencer = ({
  qDocPromise, cols, qPage, delay, selectRow, keyCode, navigation, toggleSelections,
}) => {
  const {
    qLayout, qData, select, clearSelections,
  } = useListObject({ qDocPromise, cols, qPage });
  const {
    currentRowIndex, play, startSequencer, stopSequencer, reloadSequencer,
  } = useSequencer({
    qLayout, qData, delay, select, selectRow, toggleSelections, keyCode, clearSelections,
  });

  const style = {
    bar: { border: '1px solid rgba(0,0,0,0.1)', padding: '3px', textAlign: 'center' },
    start: (!play) ? 'lui-fade-button lui-active' : 'lui-fade-button lui-disabled',
    stop: (play) ? 'lui-fade-button lui-active' : 'lui-fade-button lui-disabled',
    restart: (!play && currentRowIndex >= 1) ? 'lui-fade-button lui-active' : 'lui-fade-button lui-disabled',
  };

  return (
    <>
      { navigation
      && (
        <div style={style.bar}>
          <>
            <button className={style.start} type="button" onClick={startSequencer}>
              <span className="lui-fade-button__icon lui-icon lui-icon--triangle-right" />
            </button>
            <button className={style.stop} type="button" onClick={stopSequencer}>
              <span className="lui-fade-button__icon lui-icon lui-icon--pause" />
            </button>
            <button className={style.restart} type="button" onClick={reloadSequencer}>
              <span className="lui-fade-button__icon lui-icon lui-icon--stop" />
            </button>
          </>
          {qData && qData.qMatrix && qData.qMatrix[currentRowIndex] && qData.qMatrix[currentRowIndex][0] && qData.qMatrix[currentRowIndex][0].qText
            && (
              <div>
                {cols[0]}
                {': '}
                {qData.qMatrix[currentRowIndex][0].qText}
                {' ('}
                {currentRowIndex}
                {' of '}
                {qData.qMatrix.length}
                {')'}
              </div>
            )}
        </div>
      )}
    </>
  );
};

QdtSequencer.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.isRequired,
  qPage: PropTypes.object,
  delay: PropTypes.number,
  selectRow: PropTypes.bool,
  navigation: PropTypes.bool,
  keyCode: PropTypes.number,
  toggleSelections: PropTypes.bool,
};

QdtSequencer.defaultProps = {
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 100,
  },
  delay: 5,
  selectRow: true,
  navigation: true,
  keyCode: null,
  toggleSelections: false,
};

export default QdtSequencer;
