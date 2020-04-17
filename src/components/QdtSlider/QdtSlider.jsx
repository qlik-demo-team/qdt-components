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

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Slider } from '@material-ui/core';
import merge from 'utils/merge';

const QdtSlider = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    variant: 'outlined',
    color: 'primary',
    size: 'small',
    ariaLabel: 'QdtSlider',
    min: 0,
    step: 1,
  };
  const options = merge(defaultOptions, optionsProp);
  const [value, setValue] = useState(0);

  const ThumbComponent = (props) => {
    const { 'aria-valuenow': aria } = props;
    return (
      <div {...props}>
        {layout.qListObject.qDataPages[0].qMatrix[aria][0].qText}
      </div>
    );
  };
  ThumbComponent.propTypes = {
    'aria-valuenow': PropTypes.number.isRequired,
  };

  const handleChange = (event, index) => setValue(index);

  const handleChangeCommitted = (event, index) => model.selectListObjectValues('/qListObjectDef', [layout.qListObject.qDataPages[0].qMatrix[index][0].qElemNumber], false);

  const max = useMemo(() => layout.qListObject.qDataPages[0].qMatrix.length, [layout.qListObject.qDataPages]);

  useEffect(() => {
    let selected = 0;
    layout.qListObject.qDataPages[0].qMatrix.forEach((val, index) => {
      if (val[0].qState === 'S') selected = index;
    });
    setValue(selected);
  }, [layout.qListObject.qDataPages]);

  return (
    <div style={{ paddingLeft: 15 }}>
      <Slider
        ThumbComponent={ThumbComponent}
        color={options.color}
        valueLabelDisplay="auto"
        aria-label={options.ariaLabel}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        min={options.min}
        step={options.xtep}
        max={max}
      />
    </div>
  );
};

QdtSlider.propTypes = {
  layout: PropTypes.object,
  model: PropTypes.object,
  options: PropTypes.object,
};
QdtSlider.defaultProps = {
  layout: null,
  model: null,
  options: {},
};

export default QdtSlider;
