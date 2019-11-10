import React from 'react';
import PropTypes from 'prop-types';

const LuiTabset = ({
  children, className, inverse, style, fill,
}) => (
  <ul
    className={`
      lui-tabset
      ${fill ? 'lui-tabset--fill' : ''}
      ${inverse ? 'lui-tab--inverse' : ''}
      ${className}
    `}
    style={style}
  >
    {children}
  </ul>
);

LuiTabset.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inverse: PropTypes.bool,
  style: PropTypes.object,
  fill: PropTypes.bool,
};

LuiTabset.defaultProps = {
  children: null,
  className: null,
  inverse: null,
  style: null,
  fill: null,
};

export default LuiTabset;
