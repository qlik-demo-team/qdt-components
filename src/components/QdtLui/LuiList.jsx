import React from 'react';
import PropTypes from 'prop-types';

const LuiList = ({
  children, className, inverse, style,
}) => (
  <ul
    className={`
      lui-list
      ${inverse ? 'lui-list--inverse' : null}
      ${className}
    `}
    style={style}
  >
    {children}
  </ul>
);
LuiList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inverse: PropTypes.bool,
  style: PropTypes.object,
};
LuiList.defaultProps = {
  children: null,
  className: null,
  inverse: null,
  style: null,
};

export default LuiList;
