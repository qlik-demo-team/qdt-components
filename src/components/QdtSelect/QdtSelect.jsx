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
  FormControl, InputLabel, Select, MenuItem, Input, LinearProgress, ListItemText, ListItemIcon,
} from '@material-ui/core';
import uuidv4 from 'uuid/v4';
import merge from 'utils/merge';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';

const QdtSelect = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
    multiple: false,
  };
  const options = merge(defaultOptions, optionsProp);

  const { current: id } = useRef(uuidv4());

  // const selectValue = useMemo(() => layout.qListObject.qDataPages[0].qMatrix.filter((row) => row[0].qState === 'S'), [layout]);
  // const selectRenderValue = useMemo((selected) => {
  //   console.log(331, selected, selectValue);
  //   if (!selectValue) return;
  //   console.log((332));
  //   if (selectValue.length === 1) {
  //     console.log((333));
  //     return selectValue[0][0].qText;
  //   }
  //   console.log((334));
  //   return `${selectValue.length} of ${layout.qListObject.qSize.qcy} selected`;
  // }, [layout, selectValue]);

  const selectedValue = useMemo(() => {
    const selected = layout.qListObject?.qDataPages[0]?.qMatrix.filter((row) => row[0].qState === 'S') || [];
    console.log(331, selected);
    if (!options.multiple) {
      console.log(332);
      if (selected.length) console.log(333, selected[0][0].qText);
      console.log(334);
      if (selected.length) return [selected[0][0].qText];
      console.log(335);
      return '';
    }
    console.log(341);
    return selected;
  }, [layout.qListObject, options.multiple]);

  // const selectRenderValue = useMemo((selected) => {
  //   // const selected2 = layout.qListObject?.qDataPages[0]?.qMatrix.filter((row) => row[0].qState === 'S') || [];
  //   console.log(332, selected);
  //   if (!selected) return;
  //   console.log(333);
  //   if (selected.length === 1) {
  //     console.log(334, selected);
  //     return selected[0][0].qText;
  //   }
  //   console.log(335);
  //   return `${selected.length} of ${layout.qListObject?.qSize?.qcy} selected`;
  // }, [layout]);

  // const selectRenderValue = useMemo((selected) => {
  //   const selected = layout.qListObject?.qDataPages[0]?.qMatrix.filter((row) => row[0].qState === 'S') || [];
  //   console.log(332, selected);
  //   if (!selected.length) return;
  //   if (selected.length === 1) {
  //     return selected[0][0].qText;
  //   }
  //   return `${selected.length} of ${layout.qListObject?.qSize?.qcy} selected`;
  // }, [layout]);

  // const selectedValue = useMemo(() => {
  //   const selected = layout.qListObject?.qDataPages[0]?.qMatrix.filter((row) => row[0].qState === 'S') || [];
  //   console.log(331, selected);
  //   if (selected.length === 1) return selected[0][0].qText;
  //   if (selected.length > 1 && selected.length < 3) return selected.map((value) => value[0].qText).join(',');
  //   return `${selected.length} of ${layout.qListObject?.qSize?.qcy} selected`;
  //   // return (options.multiple) ? sv : sv[0];
  // }, [layout.qListObject]);

  // const selectRenderValue = useMemo((selected) => {
  //   console.log(332, selected);
  //   if (!selected) return;
  //   if (selected.length === 1) {
  //     return selected[0][0].qText;
  //   }
  //   return `${selected.length} of ${layout.qListObject?.qSize?.qcy} selected`;
  // }, [layout]);

  // const selectRenderValue = useMemo(() => {
  //   const selected = layout.qListObject?.qDataPages[0]?.qMatrix.filter((row) => row[0].qState === 'S') || [];
  //   console.log(332, selected);
  //   if (!selected.length) return;
  //   if (selected.length === 1) return selected[0][0].qText;
  //   return `${selected.length} of ${layout.qListObject?.qSize?.qcy} selected`;
  // }, [layout]);


  const selectedPercentage = useMemo(() => {
    const sv = layout.qListObject?.qDataPages[0]?.qMatrix.filter((row) => row[0].qState === 'S') || [];
    return (sv.length) ? (sv.length / layout.qListObject?.qSize?.qcy) * 100 : 100;
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
      <FormControl variant="outlined" style={{ width: '100%' }}>
        <InputLabel id={`${id}-label`}>{layout.qListObject?.qDimensionInfo?.qFallbackTitle}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          multiple={options.multiple}
          // value={(options.multiple) ? [] : ''}
          value={selectedValue}
          // renderValue={selectRenderValue}
          onOpen={handleOpen}
          onClose={handleClose}
          onChange={handleChange}
          input={<Input />}
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
        <LinearProgress variant="determinate" value={selectedPercentage} />
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
