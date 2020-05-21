import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Popper, Fade, Paper, MenuList, MenuItem, Input, ListItemIcon, ListItemText,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import useStyles from './QdtSelectionsStyles';
import useSessionObject from '../../hooks/useSessionObject';

const QdtSelectionsPopper = ({
  open, anchorEl, qField, app, setCurrentElementIndex,
}) => {
  const classes = useStyles();
  const popperEl = React.useRef(null);
  const { layout, model } = useSessionObject({
    app,
    properties: {
      qListObjectDef: {
        qDef: {
          qFieldDefs: [qField],
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

  const handleSearch = useCallback((event) => {
    model.searchListObjectFor('/qListObjectDef', event.target.value);
  }, [model]);

  const handleClick = (event) => {
    if (popperEl.current && !popperEl.current.contains(event.target)) {
      setCurrentElementIndex(null);
    }
  };

  useEffect(() => {
    if (open && model) model.beginSelections(['/qListObjectDef']);
    if (!open && model) model.endSelections(true);
  }, [open, model]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <Popper
      open={open}
      placement="bottom"
      anchorEl={anchorEl}
      transition
      ref={popperEl}
      className={classes.popper}
      modifiers={{
        flip: {
          enabled: true,
        },
        preventOverflow: {
          enabled: true,
          boundariesElement: 'scrollParent',
        },
        arrow: {
          enabled: true,
        },
      }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.popperPaper}>
            <MenuList component="nav">
              <MenuItem>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <Input type="search" onChange={handleSearch} disableUnderline />
              </MenuItem>
              { layout.qListObject.qDataPages.length && layout.qListObject.qDataPages[0].qMatrix.map((row) => (
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
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

QdtSelectionsPopper.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  qField: PropTypes.string,
  setCurrentElementIndex: PropTypes.func.isRequired,
};
QdtSelectionsPopper.defaultProps = {
  qField: null,
};

export default QdtSelectionsPopper;
