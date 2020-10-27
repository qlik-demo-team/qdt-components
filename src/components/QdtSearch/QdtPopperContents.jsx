import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  MenuList, MenuItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const QdtPopperContents = ({
  open, layout, model, options, handleClose,
}) => {
  const handleSelect = useCallback((row) => {
    model.selectListObjectValues('/qListObjectDef', [row.qElemNumber], options.multiple, true);
    if (!options.multiple) handleClose(row.qText);
  }, [handleClose, model, options.multiple]);

  // const handleSearch = useCallback((event) => {
  //   model.searchListObjectFor('/qListObjectDef', event.target.value);
  // }, [model]);

  useEffect(() => {
    if (open && model) model.beginSelections(['/qListObjectDef']);
    if (!open && model) model.endSelections(true);
  }, [open, model]);

  return (
    <MenuList component="nav">
      { layout?.qListObject?.qDataPages[0]?.qMatrix.map((row) => (
        <MenuItem
          key={row[0].qElemNumber}
          value={row[0]}
          className={classnames({
            selected: row[0].qState === 'S',
            excluded: row[0].qState === 'X',
          })}
          onClick={() => handleSelect(row[0])}
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

QdtPopperContents.propTypes = {
  open: PropTypes.bool.isRequired,
  layout: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};
QdtPopperContents.defaultProps = {
};

export default QdtPopperContents;
