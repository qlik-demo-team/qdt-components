/**
 * @name QdtSelect
 * @param {object} layout - Qlik object layout
 * @param {string} model - Qlik object model
 * @param {options} object - Options
*/

import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  FormControl, InputLabel, Select, MenuItem, Input, ListItemText,
} from '@material-ui/core';
import uuidv4 from 'uuid/v4';
import merge from 'utils/merge';

const QdtSelect = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    multiple: false,
  };
  const options = merge(defaultOptions, optionsProp);

  const { current: id } = useRef(uuidv4());

  const selectValue = useMemo(() => {
    const sv = layout.qListObject?.qDataPages[0]?.qMatrix.filter((row) => row[0].qState === 'S') || [];
    return (options.multiple) ? sv : sv[0];
  }, [layout.qListObject, options.multiple]);

  const handleOpen = useCallback(() => {
    model.beginSelections(['/qListObjectDef']);
  }, [model]);

  const handleClose = useCallback(() => {
    model.endSelections(true);
  }, [model]);

  const handleChange = useCallback((event) => {
    model.selectListObjectValues('/qListObjectDef', [event.target.value], false);
  }, [model]);

  return (
    <>
      <FormControl variant="outlined" style={{ width: '100%' }}>
        <InputLabel id={`${id}-label`}>{layout.qListObject?.qDimensionInfo?.qFallbackTitle}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          multiple={options.multiple}
          value={selectValue}
          onOpen={handleOpen}
          onClose={handleClose}
          onChange={handleChange}
          input={<Input disableUnderline />}
        >
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
