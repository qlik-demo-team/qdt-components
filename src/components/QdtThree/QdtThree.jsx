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
import merge from '../../utils/merge';

const QdtThree = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
  };
  const options = merge(defaultOptions, optionsProp);
  console.log(layout, model, options);

  return (
    <div>
      THREE
    </div>
  );
};

QdtThree.propTypes = {
  layout: PropTypes.object,
  model: PropTypes.object,
  options: PropTypes.object,
};
QdtThree.defaultProps = {
  layout: null,
  model: null,
  options: {},
};

export default QdtThree;
