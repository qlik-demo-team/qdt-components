/**
 * @name QdtSelect
 * @param {object} layout - Qlik object layout
 * @param {string} model - Qlik object model
 * @param {options} object - Options
*/

import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import classnames from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import uuidv4 from 'uuid/v4';
import '../../styles/index.scss';

const QdtSelect = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    multiple: true,
  };
  const options = merge(defaultOptions, optionsProp);

  const { current: id } = useRef(uuidv4());

  const selectValue = useMemo(() => layout.qDataPages[0].qMatrix.filter((row) => row[0].qState === 'S'), [layout]);
  const selectRenderValue = useMemo((selected) => {
    if (selected.length === 1) {
      return selected[0][0].qText;
    }

    return `${selected.length} of ${layout.qSize.qcy} selected`;
  }, [layout.qSize.qcy]);

  const handleOpen = useCallback(() => {
    model.beginSelections();
  }, [model]);
  const handleClose = useCallback(() => {
    model.endSelections(true);
  }, [model]);
  const handleChange = useCallback((event) => {
    model.selectListObjectValues('/qListObjectDef', event, false);
  }, [model]);
  const handleSearch = useCallback((event) => {
    model.searchListObjectFor('/qListObjectDef', event.target.value);
  }, [model]);

  return (
    <>
      <FormControl>
        <InputLabel id={`${id}-label`}>{layout.qDimensionInfo[0].qFallbackTitle}</InputLabel>
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
          {layout.qDataPages[0].qMatrix.map((row) => (
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
