import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Popper, Fade, Paper, MenuList, MenuItem, Input, ListItemIcon, ListItemText,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import useStyles from './QdtSelectionsStyles';

const qMatrix = [
  { qText: 'Some long, long, very long, very very very long text', qState: 'S', qElemNumber: 1 },
  { qText: 2019, qState: 'O', qElemNumber: 2 },
  { qText: 2018, qState: 'S', qElemNumber: 3 },
  { qText: 2017, qState: 'X', qElemNumber: 4 },
  { qText: 2016, qState: 'O', qElemNumber: 5 },
  { qText: 2015, qState: 'O', qElemNumber: 6 },
  { qText: 2014, qState: 'O', qElemNumber: 7 },
  { qText: 2013, qState: 'O', qElemNumber: 8 },
  { qText: 2012, qState: 'O', qElemNumber: 9 },
  { qText: 2011, qState: 'O', qElemNumber: 10 },
];

const QdtSelectionsPopper = ({ open, anchorEl, popperEl }) => {
  const classes = useStyles();
  // const popperEl = React.useRef(null);

  return (
    <Popper
      open={open}
      placement="bottom"
      // anchorEl={anchorEl}
      anchorEl={anchorEl}
      transition
      ref={popperEl}
      // onClose={handleClose}
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
          // element: anchorEl,
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
                <Input type="search" disableUnderline />
              </MenuItem>
              { qMatrix.map((row) => (
                <MenuItem
                  key={row.qElemNumber}
                  value={row}
                  className={classnames({
                    selected: row.qState === 'S',
                    excluded: row.qState === 'X',
                  })}
                  button
                >
                  <ListItemText primary={row.qText} />
                  {row.qState === 'S'
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
  popperEl: PropTypes.object.isRequired,
};

export default QdtSelectionsPopper;
