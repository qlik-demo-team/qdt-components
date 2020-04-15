/**
 * @name QdtSelections
 * @param {object} layout - Qlik object layout
 * @param {object} options - Options
 * @param {string} options.variant - 'contained' OR 'outlined'
 * @param {string} options.color - 'primary' OR 'secondary'
 * @param {string} options.fontSize - Any font size value, ie '4rem', '10px', 24 etc
*/
import React, { useEffect } from 'react'; //
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { withStyles } from '@material-ui/core/styles'; // useTheme makeStyles
import {
  Grid, Button, ButtonGroup, IconButton, Typography, LinearProgress, Popper, Fade, Paper, MenuList, MenuItem, Input, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { BorderClear, Cancel } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
// import useSessionObject from '../../hooks/useSessionObject';
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

// const selectionModels = [];

const QdtSelections = ({ layout, app }) => {
  const popperEl = React.useRef(null);
  const elementsRef = React.useRef([]);
  const [currentElementIndex, setCurrentElementIndex] = React.useState(null);
  const classes = useStyles();
  // console.log(layout);
  const { qSelections } = layout.qSelectionObject;
  // const { model: sessionModel, layout: sessionLayout } = useSessionObject({ app, properties });

  const handleClick = (event) => {
    if (currentElementIndex) {
      const outsideClick = !elementsRef.current[currentElementIndex - 1].contains(event.target) && !popperEl.current.contains(event.target);
      if (outsideClick) setCurrentElementIndex(null);
    }
  };

  const handleCurrentElement = (index) => {
    if (currentElementIndex === index + 1) {
      setCurrentElementIndex(null);
    } else {
      setCurrentElementIndex(index + 1);
    }
  };

  const clearFieldSelections = async (field) => {
    setCurrentElementIndex(null);
    const qField = await app.getField(field);
    qField.clear();
  };

  const clearAll = () => {
    setCurrentElementIndex(null);
    app.clearAll();
  };

  const open = Boolean(currentElementIndex);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [elementsRef, handleClick]);

  return (
    <>
      <h3>QdtSelections</h3>
      <div className="qdt-selections">
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.primaryGrid}
          // ref={anchorEl}
        >
          <ButtonGroup className={classes.buttonGroup}>
            <IconButton aria-label="delete" size="small" onClick={clearAll}>
              <BorderClear fontSize="inherit" />
            </IconButton>
          </ButtonGroup>
          <ButtonGroup>
            {qSelections.length && qSelections.map((row, index) => (
              <Button key={row.field} ref={(ref) => { elementsRef.current[index] = ref; }} className={classes.selectedItemButton}>
                {/* <SelectedItemButton onClick={handleClick} key={row.field} ref={elementsRef.current[index]}> */}
                <Grid container className={classes.container}>
                  <Grid item xs={10} onClick={() => handleCurrentElement(index)}>
                    <Typography className={classes.field}>
                      {row.qField}
                    </Typography>
                    <Typography className={classes.selected}>
                      { (row.qSelectedCount === 1) ? row.qSelected : `${row.qSelectedCount} of ${row.qTotal}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} className={classes.icon} onClick={() => clearFieldSelections(row.qField)}>
                    <Cancel fontSize="small" />
                  </Grid>
                  <Grid item xs={12}>
                    <LinearProgress
                      variant="determinate"
                      classes={{
                        root: classes.linearProgressRoot,
                        bar: classes.linearProgressBar,
                      }}
                      value={(row.qSelectedCount / row.qTotal) * 100}
                    />
                  </Grid>
                </Grid>
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
      </div>
      <div />
      <Popper
        open={open}
        placement="bottom"
        // anchorEl={anchorEl}
        anchorEl={elementsRef.current[currentElementIndex - 1]}
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
    </>
  );
};

QdtSelections.propTypes = {
  layout: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

QdtSelections.defaultProps = {
};


export default QdtSelections;
