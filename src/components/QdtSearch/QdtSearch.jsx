/**
 * @name QdtSearch
 * @param {object} layout - Qlik object layout
 * @param {string} model - Qlik object model
 * @param {options} object - Options
*/

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, ListItemIcon } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import merge from 'utils/merge';
import QdtPopperContents from './QdtPopperContents';
import QdtPopper from '../QdtPopper/QdtPopper';
import styles from './QdtSearchStyles';

const QdtSearch = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    multiple: false,
    height: 400,
  };
  const options = merge(defaultOptions, optionsProp);

  const inputRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const open = Boolean(anchorEl);

  const handleSearch = (event) => {
    model.searchListObjectFor('/qListObjectDef', event.target.value);
    setInputValue(event.target.value);
  };

  const handleClick = (event) => setAnchorEl(anchorEl ? null : event.currentTarget);

  const handleClose = (qText) => {
    setAnchorEl(null);
    setInputValue(qText);
  };

  return (
    <form noValidate autoComplete="off" style={styles.alignMiddle}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <Input type="search" onChange={handleSearch} value={inputValue} onClick={handleClick} disableUnderline ref={inputRef} />
      <QdtPopper
        open={open}
        anchorEl={anchorEl}
        contents={(
          <QdtPopperContents
            open={open}
            layout={layout}
            model={model}
            options={options}
            handleClose={handleClose}
          />
          )}
        onCallback={handleClose}
      />
    </form>
  );
};

QdtSearch.propTypes = {
  layout: PropTypes.object,
  model: PropTypes.object,
  options: PropTypes.object,
};
QdtSearch.defaultProps = {
  layout: null,
  model: null,
  options: {},
};

export default QdtSearch;
