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
  FormControl, InputLabel, Select, MenuItem, Input, LinearProgress,
} from '@material-ui/core';
import uuidv4 from 'uuid/v4';
import merge from '../../utils/merge';
// import '../../styles/index.scss';

const QdtSelect = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    multiple: false,
  };
  console.log(441, layout);
  const options = merge(defaultOptions, optionsProp);

  const { current: id } = useRef(uuidv4());

  const selectValue = useMemo(() => {
    const sv = layout.qListObject.qDataPages[0].qMatrix.filter((row) => row[0].qState === 'S');
    return (options.multiple) ? sv : sv[0];
  }, [layout.qListObject.qDataPages, options.multiple]);
  const selectRenderValue = useMemo((selected) => {
    if (!selected) return;
    if (selected.length === 1) {
      return selected[0][0].qText;
    }
    return `${selected.length} of ${layout.qListObject.qSize.qcy} selected`;
  }, [layout]);

  const handleOpen = useCallback(() => {
    model.beginSelections(['/qListObjectDef']);
  }, [model]);
  const handleClose = useCallback(() => {
    model.endSelections(true);
  }, [model]);
  const handleChange = useCallback((event) => {
    const qValues = event.target.value.map((v) => ((options.multiple) ? v[0].qElemNumber : v.qElemNumber));
    model.selectListObjectValues('/qListObjectDef', qValues, false);
  }, [model, options.multiple]);
  const handleSearch = useCallback((event) => {
    model.searchListObjectFor('/qListObjectDef', event.target.value);
  }, [model]);

  return (
    <>
      <FormControl variant="outlined">
        <InputLabel id={`${id}-label`}>{layout.qListObject.qDimensionInfo.qFallbackTitle}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          multiple={options.multiple}
          value={selectValue}
          renderValue={selectRenderValue}
          onOpen={handleOpen}
          onClose={handleClose}
          onChange={handleChange}
          input={<Input />}
        >
          <MenuItem>
            <Input type="search" onChange={handleSearch} />
          </MenuItem>
          {layout.qListObject.qDataPages[0].qMatrix.map((row) => (
            <MenuItem
              key={row[0].qElemNumber}
              value={row}
              className={classnames('item', {
                'styles.selected': row[0].qState === 'S',
                'styles.excluded': row[0].qState === 'X',
              })}
            >
              {row[0].qText}
            </MenuItem>
          ))}
        </Select>
        <LinearProgress variant="determinate" value={80} />
      </FormControl>

      {/* <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          // value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <LinearProgress variant="determinate" value={80} />
      </FormControl> */}
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
