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
  List, ListItem, ListItemText, Input, ListItemIcon, Paper,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import uuidv4 from 'uuid/v4';
import merge from 'utils/merge';

const QdtSelect = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    multiple: false,
  };
  const options = merge(defaultOptions, optionsProp);

  const { current: id } = useRef(uuidv4());

  const handleChange = useCallback((event) => {
    console.log(event.target);
    const qValues = event.target.value.map((v) => ((options.multiple) ? v[0].qElemNumber : v.qElemNumber));
    model.selectListObjectValues('/qListObjectDef', qValues, false);
  }, [model, options.multiple]);
  const handleSearch = useCallback((event) => {
    model.searchListObjectFor('/qListObjectDef', event.target.value);
  }, [model]);

  return (
    <>
      <Paper>
        <List component="nav" className="qdt-list">
          <ListItem>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <Input type="search" onChange={handleSearch} id={`${id}-label`} disableUnderline />
          </ListItem>
          {layout.qListObject?.qDataPages[0]?.qMatrix.map((row) => (
            <ListItem
              key={row[0].qElemNumber}
              className={classnames('item', {
                'styles.selected': row[0].qState === 'S',
                'styles.excluded': row[0].qState === 'X',
              })}
              value={row}
              onClick={handleChange}
              button
            >
              <ListItemText primary={row[0].qText} value={row} />
            </ListItem>
          ))}
        </List>
      </Paper>
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
