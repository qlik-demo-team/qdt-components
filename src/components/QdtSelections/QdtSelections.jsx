/**
 * @name QdtSelections
 * @param {object} layout - Qlik object layout
 * @param {object} options - Options
 * @param {string} options.variant - 'contained' OR 'outlined'
 * @param {string} options.color - 'primary' OR 'secondary'
 * @param {string} options.fontSize - Any font size value, ie '4rem', '10px', 24 etc
*/
import React from 'react'; //
import PropTypes from 'prop-types';
import {
  Grid, Button, ButtonGroup, IconButton, Typography, LinearProgress,
} from '@material-ui/core';
import { BorderClear, Cancel } from '@material-ui/icons';
import useStyles from './QdtSelectionsStyles';
import QdtSelectionsPopper from './QdtSelectionsPopper';

const QdtSelections = ({ layout, app }) => {
  const elementsRef = React.useRef([]);
  const [currentElementIndex, setCurrentElementIndex] = React.useState(null);
  const classes = useStyles();
  const { qSelections } = layout.qSelectionObject;

  // const handleClick = (event) => {
  //   if (currentElementIndex) {
  //     const outsideClick = !elementsRef.current[currentElementIndex - 1].contains(event.target);
  //     if (outsideClick) setCurrentElementIndex(null);
  //   }
  // };

  const handleCurrentElement = (index) => {
    if (currentElementIndex === index + 1) {
      setCurrentElementIndex(null);
    } else {
      setCurrentElementIndex(index + 1);
    }
  };

  const clearFieldSelections = async (field) => {
    setCurrentElementIndex(null);
    const qObject = await app.getField(field);
    qObject.clear();
  };

  const clearAll = () => {
    setCurrentElementIndex(null);
    app.clearAll();
  };

  // useEffect(() => {
  //   document.addEventListener('click', handleClick);
  //   return () => document.removeEventListener('click', handleClick);
  // }, [elementsRef, handleClick]);

  return (
    <>
      <h3>QdtSelections</h3>
      <div className="qdt-selections">
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.primaryGrid}
        >
          <ButtonGroup className={classes.buttonGroup}>
            <IconButton aria-label="delete" size="small" onClick={clearAll}>
              <BorderClear fontSize="inherit" />
            </IconButton>
          </ButtonGroup>
          <ButtonGroup>
            {qSelections.length && qSelections.map((row, index) => (
              <Button key={row.field} ref={(ref) => { elementsRef.current[index] = ref; }} className={classes.selectedItemButton}>
                <Grid container className={classes.container}>
                  <Grid item xs={10} onClick={() => handleCurrentElement(index, row.qField)}>
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
      {qSelections && qSelections.map((row, index) => (
        <QdtSelectionsPopper
          key={row.qField}
          open={currentElementIndex - 1 === index}
          anchorEl={elementsRef.current[currentElementIndex - 1]}
          qField={row.qField}
          app={app}
          setCurrentElementIndex={setCurrentElementIndex}
        />
      ))}
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
