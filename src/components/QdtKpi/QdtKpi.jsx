/**
 * @name QdtKpi
 * @param {object} layout - Qlik object layout
 * @param {object} options - Options
 * @param {string} options.variant - 'contained' OR 'outlined'
 * @param {string} options.color - 'primary' OR 'secondary'
 * @param {string} options.fontSize - Any font size value, ie '4rem', '10px', 24 etc
*/

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import merge from '../../utils/merge';

const QdtKpi = ({ layout, options: optionsProp }) => {
  const defaultOptions = {
    variant: 'contained',
    color: 'primary',
    fontSize: '4rem',
  };
  const options = merge(defaultOptions, optionsProp);
  const { variant, color, fontSize } = options;

  const KPIGrid = withStyles((theme) => ({
    root: {
      color: (variant === 'contained') ? theme.palette[color].contrastText : theme.palette[color].main,
      backgroundColor: (variant === 'contained') ? theme.palette[color].main : false,
      border: '1px solid',
      borderColor: theme.palette[color].light,
      fontSize,
      height: '100%',
    },
  }))(Grid);

  const value = useMemo(() => layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText, [layout]);

  return (
    <KPIGrid container direction="row" justify="center" alignItems="center" className="qdt-kpi">{value}</KPIGrid>
  );
};

QdtKpi.propTypes = {
  layout: PropTypes.object,
  options: PropTypes.object,
};

QdtKpi.defaultProps = {
  layout: null,
  options: {},
};


export default QdtKpi;
