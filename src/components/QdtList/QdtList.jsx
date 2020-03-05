/**
 * @name QdtSelect
 * @param {object} layout - Qlik object layout
 * @param {string} model - Qlik object model
 * @param {options} object - Options
*/

import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  MenuList, MenuItem, Input, ListItemIcon, Paper, FormControl,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import uuidv4 from 'uuid/v4';
import merge from 'utils/merge';

const QdtSelect = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    multiple: false,
    height: 400,
  };
  const options = merge(defaultOptions, optionsProp);
  console.log(options);
  const { current: id } = useRef(uuidv4());

  const handleSelect = useCallback((qElemNumber) => {
    const toggle = !(options.multiple);
    model.selectListObjectValues('/qListObjectDef', [qElemNumber], toggle);
  }, [model, options.multiple]);
  const handleSearch = useCallback((event) => {
    model.searchListObjectFor('/qListObjectDef', event.target.value);
  }, [model]);

  return (
    <FormControl variant="outlined" style={{ width: '100%' }}>
      <Paper>
        <MenuList component="nav" className="qdt-list" style={{ height: options.height, overflow: 'auto' }}>
          <MenuItem>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <Input type="search" onChange={handleSearch} id={`${id}-label`} disableUnderline />
          </MenuItem>
          {layout.qListObject?.qDataPages[0]?.qMatrix.map((row) => (
            <MenuItem
              key={row[0].qElemNumber}
              className={classnames({
                selected: row[0].qState === 'S',
                excluded: row[0].qState === 'X',
              })}
              onClick={() => handleSelect(row[0].qElemNumber)}
              button
            >
              {row[0].qText}
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
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
