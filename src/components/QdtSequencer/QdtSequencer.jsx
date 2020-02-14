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

import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import { Button, ButtonGroup } from '@material-ui/core';
import {
  PlayArrow, SkipPrevious, SkipNext, Pause, Stop,
} from '@material-ui/icons';

const QdtSequencer = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    variant: 'outlined',
    color: 'primary',
    size: 'small',
    selectRow: true,
    toggleSelections: false,
    delay: 5,
  };
  const options = merge(defaultOptions, optionsProp);

  // const [init, setInit] = useState(false);
  const [play, setPlay] = useState(false);
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const handleStartSequencer = () => setPlay(true);
  const handleStopSequencer = () => setPlay(false);

  const select = useCallback((qElemNumber, toggle = true, ignoreLock = false) => model.selectListObjectValues('/qListObjectDef', [qElemNumber], toggle, ignoreLock), [model]);

  const clearSelections = useCallback(() => model.clearSelections('/qListObjectDef'), [model]);

  const handleMoveNextSequencer = () => {
    if (currentRowIndex < layout.qListObject.qDataPages[0].qMatrix.length - 1) {
      if (!play && options.selectRow && layout.qListObject.qDataPages[0].qMatrix[currentRowIndex]) select(layout.qListObject.qDataPages[0].qMatrix[currentRowIndex + 1][0].qElemNumber, options.toggleSelections, true);
      if (layout.qListObject.qDataPages[0].qMatrix && currentRowIndex < layout.qListObject.qDataPages[0].qMatrix.length) setCurrentRowIndex(currentRowIndex + 1);
    }
  };

  const handleMovePreviousSequencer = () => {
    if (currentRowIndex > 0) {
      if (!play && options.selectRow && layout.qListObject.qDataPages[0].qMatrix[currentRowIndex]) select(layout.qListObject.qDataPages[0].qMatrix[currentRowIndex - 1][0].qElemNumber, options.toggleSelections, true);
      if (layout.qListObject.qDataPages[0].qMatrix && currentRowIndex > 0) setCurrentRowIndex(currentRowIndex - 1);
    }
  };

  const handleReloadSequencer = () => {
    setCurrentRowIndex(0);
    if (options.selectRow) clearSelections();
  };

  useEffect(() => {
    if (play) setTimeout(() => setCurrentRowIndex(currentRowIndex + 1), options.delay * 1000);
    if (play && options.selectRow && layout.qListObject.qDataPages[0].qMatrix[currentRowIndex]) select(layout.qListObject.qDataPages[0].qMatrix[currentRowIndex][0].qElemNumber, options.toggleSelections, true);
    if (play && currentRowIndex === layout.qListObject.qDataPages[0].qMatrix.length - 1) setPlay(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, currentRowIndex]);

  return (
    <ButtonGroup size={options.size} variant={options.variant} color={options.color} aria-label="qdt-sequencer">
      <Button onClick={handleMovePreviousSequencer} disabled={currentRowIndex === 0}><SkipPrevious /></Button>
      <Button onClick={handleStartSequencer} disabled={play}><PlayArrow /></Button>
      <Button onClick={handleStopSequencer} disabled={!play}><Pause /></Button>
      <Button onClick={handleReloadSequencer} disabled={play || currentRowIndex === 0}><Stop /></Button>
      <Button onClick={handleMoveNextSequencer} disabled={currentRowIndex < layout.qListObject.qDataPages[0].qMatrix.length}><SkipNext /></Button>
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
