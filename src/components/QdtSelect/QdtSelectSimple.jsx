/**
 * @name QdtSelect
 * @param {object} layout - Qlik object layout
 * @param {string} model - Qlik object model
 * @param {options} object - Options
*/

import React, {
  useCallback, useState, useRef, // useEffect
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

  // const [selected, setSelected] = useState(null);
  const [selected, setSelected] = useState((options.clearSelectionsRow) ? 'clearSelections' : null);

  // const selectValue = useMemo(() => {
  //   const sv = layout.qListObject?.qDataPages[0]?.qMatrix.filter((row) => row[0].qState === 'S') || [];
  //   return (options.multiple) ? sv : sv[0];
  // }, [layout.qListObject, options.multiple]);

  const handleOpen = useCallback(() => {
    model.beginSelections(['/qListObjectDef']);
  }, [model]);

  const handleClose = useCallback(() => {
    model.endSelections(true);
  }, [model]);

  // Listening to app selections
  // useEffect(() => {
  //   let _selected = null;
  //   const results = layout.qListObject?.qDataPages[0]?.qMatrix.filter((row) => row[0].qState === 'S') || [];
  //   if (results.length) _selected = results[0].qText;
  //   if (!selected && options.clearSelectionsRow) _selected = 'clearSelections';
  //   setSelected(_selected);
  // }, [layout, options.clearSelectionsRow, options.multiple]); // eslint-disable-line

  const handleChange = useCallback((event) => {
    if (event.target.value === 'clearSelections') {
      model.clearSelections('/qListObjectDef');
      setSelected('clearSelections'); // @TODO remove. needs to listen to selections
    } else {
      model.selectListObjectValues('/qListObjectDef', [event.target.value], false);
      setSelected(event.target.value); // @TODO remove. needs to listen to selections
    }
  }, [model]);

  return (
    <>
      <FormControl variant="outlined" style={{ width: '100%' }}>
        { options.showLabel && <InputLabel id={`${id}-label`}>{layout.qListObject?.qDimensionInfo?.qFallbackTitle}</InputLabel>}
        <Select
          labelId={`${id}-label`}
          id={id}
          // multiple={options.multiple}
          value={selected}
          onOpen={handleOpen}
          onClose={handleClose}
          onChange={handleChange}
          inputProps={{
            disableUnderline: !(options.showProgress),
          }}
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

    </>
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
