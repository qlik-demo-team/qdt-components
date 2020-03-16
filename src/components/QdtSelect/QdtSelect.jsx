/**
 * @name QdtSelect
 * @param {object} layout - Qlik object layout
 * @param {string} model - Qlik object model
 * @param {options} object - Options
*/

import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uuidv4 from 'uuid/v4';
import merge from 'utils/merge';
import {
  FormControl, InputLabel, Select, MenuItem, Input, ListItemIcon, ListItemText,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';

const QdtSelect = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    multiple: false,
  };
  const options = merge(defaultOptions, optionsProp);
  console.log(111);

  const { current: id } = useRef(uuidv4());
  // const [age, setAge] = useState([{ qText: 'yiannis' }]);
  const [age, setAge] = useState('yiannis');

  const handleChange = (event) => {
    const qValues = event.target.value.map((v) => ((options.multiple) ? v[0].qElemNumber : v.qElemNumber));
    // model.selectListObjectValues('/qListObjectDef', qValues, false);
    console.log(113, event.target.value, qValues);
    // setAge(event.target.value);
    setAge(`yianni-${qValues[0]}`);
  };
  const handleSearch = useCallback((event) => {
    console.log(118, event);
    model.searchListObjectFor('/qListObjectDef', event.target.value);
  }, [model]);

  useEffect(() => {
    console.log(115, layout);
  }, [layout]);

  return (
    <>
      {console.log(119, age)}
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          multiple={options.multiple}
          value={age}
          onChange={handleChange}
        >
          <MenuItem>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <Input type="search" onChange={handleSearch} disableUnderline />
          </MenuItem>
          {layout.qListObject?.qDataPages[0]?.qMatrix.map((row) => (
            <MenuItem
              key={row[0].qElemNumber}
              value={row}
              className={classnames({
                selected: row[0].qState === 'S',
                excluded: row[0].qState === 'X',
              })}
            >
              <ListItemText primary={row[0].qText} />
              {row[0].qState === 'S'
              && (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              )}
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
