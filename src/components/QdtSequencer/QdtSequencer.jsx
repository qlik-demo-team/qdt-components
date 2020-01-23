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

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useListObject from '../../hooks/useListObject';
import useSequencer from '../../hooks/useSequencer';
import '../../styles/index.scss';

const QdtSequencer = ({
  qDocPromise, cols, qPage, delay, selectRow, keyCode, navigation, toggleSelections, wheel,
}) => {
  const {
    qLayout, qData, select, clearSelections,
  } = useListObject({ qDocPromise, cols, qPage });
  const {
    currentRowIndex, play, startSequencer, stopSequencer, reloadSequencer, moveNextSequencer, movePreviousSequencer,
  } = useSequencer({
    qLayout, qData, delay, select, selectRow, toggleSelections, clearSelections,
  });
  const ref = useRef(null);

  const style = {
    bar: { border: '1px solid rgba(0,0,0,0.1)', padding: '3px', textAlign: 'center' },
    start: (!play) ? 'lui-fade-button lui-active' : 'lui-fade-button lui-disabled',
    stop: (play) ? 'lui-fade-button lui-active' : 'lui-fade-button lui-disabled',
    restart: (!play && currentRowIndex >= 1) ? 'lui-fade-button lui-active' : 'lui-fade-button lui-disabled',
    next: (!qData || currentRowIndex === qData.qMatrix.length) ? 'lui-fade-button lui-disabled' : 'lui-fade-button lui-active',
    previous: (currentRowIndex === 0) ? 'lui-fade-button lui-disabled' : 'lui-fade-button lui-active',
  };

  const checkKey = (event) => {
    if (event.keyCode === keyCode) {
      if (!play) {
        startSequencer();
      } else {
        stopSequencer();
      }
    }
  };

  const wheelNavigation = (event) => {
    event.preventDefault(); /* Chrome, Safari, Firefox */
    // event.returnValue = false; /* IE7, IE8 */
    if (event.wheelDeltaY > 0) {
      moveNextSequencer();
    } else {
      movePreviousSequencer();
    }
    return false;
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      if (keyCode) node.addEventListener('keydown', checkKey, true);
      if (wheel) node.addEventListener('wheel', wheelNavigation, { passive: false });
      return () => {
        if (keyCode) node.removeEventListener('keydown', checkKey, true);
        if (wheel) node.removeEventListener('wheel', wheelNavigation, { passive: false });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkKey, play, wheel, ref]);

  return (
    <>
      { navigation
      && (
        <div style={style.bar} ref={ref}>
          <>
            <button className={style.previous} type="button" onClick={movePreviousSequencer}>
              <span className="lui-fade-button__icon lui-icon lui-icon--step-in lui-icon-rotate-180" />
            </button>
            <button className={style.start} type="button" onClick={startSequencer}>
              <span className="lui-fade-button__icon lui-icon lui-icon--triangle-right" />
            </button>
            <button className={style.stop} type="button" onClick={stopSequencer}>
              <span className="lui-fade-button__icon lui-icon lui-icon--pause" />
            </button>
            <button className={style.restart} type="button" onClick={reloadSequencer}>
              <span className="lui-fade-button__icon lui-icon lui-icon--stop" />
            </button>
            <button className={style.next} type="button" onClick={moveNextSequencer}>
              <span className="lui-fade-button__icon lui-icon lui-icon--step-in" />
            </button>
          </>
          {qData && qData.qMatrix && qData.qMatrix[currentRowIndex] && qData.qMatrix[currentRowIndex][0] && qData.qMatrix[currentRowIndex][0].qText
            && (
              <div>
                {cols[0]}
                {': '}
                {qData.qMatrix[currentRowIndex][0].qText}
                {' ('}
                {currentRowIndex + 1}
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
  wheel: PropTypes.bool,
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
  wheel: false,
};

export default QdtSequencer;
