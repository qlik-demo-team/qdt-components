/**
 * @name QdtSequencer
 * @param {array} cols - Dimension for the data to cycle through
 * @param {number} delay [5] - Loop through the results in given seconds.
 * @param {number} keyCode [null] - If we want to control the sequencer with a key stroke. Toggles play.
 * @param {bool} navigation [true] - If we want to show / hide the navigation and use only key strokes
 * @description
 * Loop through a dimension and make selections.
*/

import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import {
  PlayArrow, SkipPrevious, SkipNext, Pause, Stop,
} from '@material-ui/icons';
import merge from 'utils/merge';

const QdtSequencer = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    variant: 'outlined',
    color: 'primary',
    size: 'small',
    toggleSelections: false,
    delay: 5,
    defaultRow: -1,
  };
  const options = merge(defaultOptions, optionsProp);

  const qMatrix = layout?.qListObject?.qDataPages[0]?.qMatrix || [];

  // const [init, setInit] = useState(false);
  const [play, setPlay] = useState(false);
  const currentRowIndex = useRef(options.defaultRow);
  const handleStartSequencer = () => setPlay(true);
  const handleStopSequencer = () => setPlay(false);

  const select = useCallback((qElemNumber, toggle = true, ignoreLock = false) => model.selectListObjectValues('/qListObjectDef', [qElemNumber], toggle, ignoreLock), [model]);

  const clearSelections = useCallback(() => model.clearSelections('/qListObjectDef'), [model]);

  const handleMoveNextSequencer = () => {
    if (!play && qMatrix[currentRowIndex.current + 1]) {
      select(qMatrix[currentRowIndex.current + 1][0].qElemNumber, options.toggleSelections, true);
      currentRowIndex.current += 1;
    }
  };

  const handleMovePreviousSequencer = () => {
    if (!play && qMatrix[currentRowIndex.current - 1]) {
      select(qMatrix[currentRowIndex.current - 1][0].qElemNumber, options.toggleSelections, true);
      currentRowIndex.current -= 1;
    }
  };

  const handleReloadSequencer = useCallback(() => {
    if (options.defaultRow !== -1) {
      select(qMatrix[options.defaultRow][0].qElemNumber, options.toggleSelections, true);
    } else {
      clearSelections();
    }
    currentRowIndex.current = options.defaultRow;
  });

  useEffect(() => {
    if (options.defaultRow !== -1 && qMatrix.length && !qMatrix.filter((row) => row[0].qState === 'S').length) {
      handleReloadSequencer();
    }
  }, [handleReloadSequencer, options.defaultRow, qMatrix]);

  useEffect(() => {
    if (play && qMatrix.length) {
      if (qMatrix[currentRowIndex.current + 1]) {
        setTimeout(() => {
          select(qMatrix[currentRowIndex.current + 1][0].qElemNumber, options.toggleSelections, true);
          currentRowIndex.current += 1;
        }, options.delay * 1000);
      } else {
        setPlay(false);
      }
    }
  }, [play, qMatrix, options, select]);

  return (
    <ButtonGroup size={options.size} variant={options.variant} color={options.color} aria-label="qdt-sequencer">
      <Button onClick={handleMovePreviousSequencer} disabled={currentRowIndex.current === 0}><SkipPrevious /></Button>
      <Button onClick={handleStartSequencer} disabled={play}><PlayArrow /></Button>
      <Button onClick={handleStopSequencer} disabled={!play}><Pause /></Button>
      <Button onClick={handleReloadSequencer} disabled={play || currentRowIndex.current === 0}><Stop /></Button>
      <Button onClick={handleMoveNextSequencer} disabled={currentRowIndex.current < qMatrix.length}><SkipNext /></Button>
    </ButtonGroup>
  );
};

QdtSequencer.propTypes = {
  layout: PropTypes.object,
  model: PropTypes.object,
  options: PropTypes.object,
};
QdtSequencer.defaultProps = {
  layout: null,
  model: null,
  options: {},
};

export default QdtSequencer;
