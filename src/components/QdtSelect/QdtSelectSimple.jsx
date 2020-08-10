/**
 * @name QdtSelect
 * @param {object} layout - Qlik object layout
 * @param {string} model - Qlik object model
 * @param {options} object - Options
*/

import React, {
  useCallback, useState, useRef, // useEffect
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  FormControl, InputLabel, Select, MenuItem, Input, ListItemText, LinearProgress,
} from '@material-ui/core';
import uuidv4 from 'uuid/v4';
import merge from 'utils/merge';


const QdtSelect = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    // multiple: false,
    showLabel: true,
    showProgress: true,
    clearSelectionsRow: null,
  };
  const options = merge(defaultOptions, optionsProp);

  const { current: id } = useRef(uuidv4());

  const [selected, setSelected] = useState((options.clearSelectionsRow) ? 'clearSelections' : null);

  const handleOpen = useCallback(() => {
    model.beginSelections(['/qListObjectDef']);
  }, [model]);

  const handleClose = useCallback(() => {
    model.endSelections(true);
  }, [model]);

  const handleChange = useCallback((event) => {
    if (event.target.value === 'clearSelections') {
      model.clearSelections('/qListObjectDef');
      setSelected('clearSelections');
    } else {
      model.selectListObjectValues('/qListObjectDef', [event.target.value], false);
    }
  }, [model]);

  useEffect(() => {
    const _selected = layout.qListObject.qDataPages[0].qMatrix.find((row) => row[0].qState === 'S');
    if (_selected) setSelected(_selected[0].qElemNumber);
  }, [layout]);

  return (
    <FormControl variant="outlined" style={{ width: '100%' }} className="QdtSelect">
      { options.showLabel && <InputLabel id={`${id}-label`}>{layout.qListObject?.qDimensionInfo?.qFallbackTitle}</InputLabel>}
      <Select
        labelId={`${id}-label`}
        id={id}
          // multiple={options.multiple}
        value={selected}
          // renderValue={selected}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        inputProps={{
          disableUnderline: !(options.showProgress),
        }}
        MenuProps={options.MenuProps}
        input={<Input disableUnderline={!(options.showProgress)} />}
      >
        {options.clearSelectionsRow && (
        <MenuItem value="clearSelections" key={0}>
          <ListItemText primary={options.clearSelectionsRow} />
        </MenuItem>
        )}
        {layout.qListObject?.qDataPages[0]?.qMatrix.map((row) => (
          <MenuItem
            key={row[0].qElemNumber}
            value={row[0].qElemNumber}
            className={classnames({
              selected: row[0].qState === 'S',
              excluded: row[0].qState === 'X',
            })}
          >
            <ListItemText primary={row[0].qText} />
          </MenuItem>
        ))}
      </Select>
      {options.showProgress && <LinearProgress variant="determinate" value={80} /> }
    </FormControl>
  );
};

QdtSelect.propTypes = {
  layout: PropTypes.object,
  model: PropTypes.object,
  options: PropTypes.object,
};
QdtSelect.defaultProps = {
  layout: null,
  model: null,
  options: {},
};

export default QdtSelect;
