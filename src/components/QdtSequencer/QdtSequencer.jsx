/**
 * @name QdtSequencer
 * @param {array} cols - Dimension for the data to cycle through
 * @param {number} delay [5] - Loop through the results in given seconds.
 * @param {number} keyCode [null] - If we want to control the sequencer with a key stroke. Toggles playing.
 * @param {bool} navigation [true] - If we want to show / hide the navigation and use only key strokes
 * @description
 * Loop through a dimension and make selections.
*/

import React, {
  useState, useCallback, useEffect, useRef, useMemo,
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

  const qMatrix = useMemo(() => layout?.qListObject?.qDataPages[0]?.qMatrix || [], [layout]);

  const initialized = useRef(false);
  const playTimeout = useRef(null);
  const currentRowIndex = useRef(options.defaultRow);
  const [playing, setplaying] = useState(false);

  const select = useCallback((qElemNumber, toggle = true, ignoreLock = false) => model.selectListObjectValues('/qListObjectDef', [qElemNumber], toggle, ignoreLock), [model]);
  const clearSelections = useCallback(() => model.clearSelections('/qListObjectDef'), [model]);

  const reset = useCallback(() => {
    if (playTimeout.current) clearTimeout(playTimeout.current);
    currentRowIndex.current = options.defaultRow;
    if (options.defaultRow !== -1) {
      select(qMatrix[options.defaultRow][0].qElemNumber, options.toggleSelections, true);
    } else {
      clearSelections();
    }
  }, [options.defaultRow, options.toggleSelections, select, qMatrix, clearSelections]);

  const previous = useCallback(async () => {
    if (qMatrix[currentRowIndex.current - 1]) {
      await select(qMatrix[currentRowIndex.current - 1][0].qElemNumber, options.toggleSelections, true);
      currentRowIndex.current -= 1;
    }
  }, [qMatrix, options.toggleSelections, select]);

  const next = useCallback(async () => {
    if (qMatrix[currentRowIndex.current + 1]) {
      await select(qMatrix[currentRowIndex.current + 1][0].qElemNumber, options.toggleSelections, true);
      currentRowIndex.current += 1;
    }
  }, [qMatrix, options.toggleSelections, select]);

  const play = useCallback(async () => {
    if (qMatrix[currentRowIndex.current + 1]) {
      setplaying(true);
      await next();
      playTimeout.current = setTimeout(() => {
        play();
      }, options.delay * 1000);
    } else {
      setplaying(false);
    }
  }, [qMatrix, next, options.delay]);

  const pause = useCallback(() => {
    if (playTimeout.current) clearTimeout(playTimeout.current);
    setplaying(false);
  }, []);

  const stop = useCallback(() => {
    if (playTimeout.current) clearTimeout(playTimeout.current);
    setplaying(false);
    reset();
  }, [reset]);

  // if not initialized after qMatrix has data, reset
  useEffect(() => {
    if (qMatrix.length && !initialized.current) {
      reset();
      initialized.current = true;
    }
  }, [qMatrix, reset, select]);

  return (
    <ButtonGroup size={options.size} variant={options.variant} color={options.color} aria-label="qdt-sequencer">
      <Button onClick={previous} disabled={currentRowIndex.current === options.defaultRow}><SkipPrevious /></Button>
      <Button onClick={play} disabled={playing}><PlayArrow /></Button>
      <Button onClick={pause} disabled={!playing}><Pause /></Button>
      <Button onClick={stop} disabled={currentRowIndex.current === options.defaultRow}><Stop /></Button>
      <Button onClick={next} disabled={currentRowIndex.current >= qMatrix.length}><SkipNext /></Button>
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
