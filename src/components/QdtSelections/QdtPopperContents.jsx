import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  MenuList, MenuItem, ListItemIcon, ListItemText, // , Input
} from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import useSessionObject from '../../hooks/useSessionObject';

const QdtSelectionsPopper = ({ open, qField, app }) => {
  const { layout, model } = useSessionObject({
    app,
    properties: {
      qListObjectDef: {
        qDef: {
          qFieldDefs: [qField],
          qSortCriterias: [{ qSortByState: 1 }],
        },
        qInitialDataFetch: [{
          qWidth: 1,
          qHeight: 1000,
        }],
      },
    },
  });

  const handleSelect = useCallback((qElemNumber) => {
    model.selectListObjectValues('/qListObjectDef', [qElemNumber], true, true);
  }, [model]);

  // const handleSearch = useCallback((event) => {
  //   model.searchListObjectFor('/qListObjectDef', event.target.value);
  // }, [model]);

  useEffect(() => {
    if (open && model) model.beginSelections(['/qListObjectDef']);
    if (!open && model) model.endSelections(true);
  }, [open, model]);

  return (
    <MenuList component="nav">
      {/* <MenuItem>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <Input type="search" onChange={handleSearch} disableUnderline />
      </MenuItem> */}
      { layout?.qListObject?.qDataPages[0]?.qMatrix.map((row) => (
        <MenuItem
          key={row[0].qElemNumber}
          value={row[0]}
          className={classnames({
            selected: row[0].qState === 'S',
            excluded: row[0].qState === 'X',
          })}
          onClick={() => handleSelect(row[0].qElemNumber)}
          button
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
    </MenuList>
  );
};

QdtSelectionsPopper.propTypes = {
  open: PropTypes.bool.isRequired,
  app: PropTypes.object.isRequired,
  qField: PropTypes.string,
};
QdtSelectionsPopper.defaultProps = {
  qField: null,
};

export default QdtSelectionsPopper;
