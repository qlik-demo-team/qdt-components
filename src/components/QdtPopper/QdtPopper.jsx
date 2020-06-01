import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Popper, Paper, Fade } from '@material-ui/core';
import useStyles from './QdtPopperStyles';

const QdtPopper = ({
  open, anchorEl, contents, onCallback,
}) => {
  const classes = useStyles();
  const popperEl = useRef(null);

  const handleClick = (event) => {
    if (popperEl.current && !popperEl.current.contains(event.target)) {
      onCallback();
    }
  };

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
      style={{ zIndex: 9999999 }}
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
            {contents}
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

QdtPopper.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object.isRequired,
  contents: PropTypes.func,
  onCallback: PropTypes.func,
};
QdtPopper.defaultProps = {
  onCallback: null,
  contents: null,
};

export default QdtPopper;
