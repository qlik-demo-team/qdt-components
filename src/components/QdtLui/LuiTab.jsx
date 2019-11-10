import React from 'react';
import PropTypes from 'prop-types';

const LuiTab = ({
  children, className, onClick, ...otherprops
}) => (
  <li className={`lui-tab ${className}`} onClick={onClick} {...otherprops}>
    <span className="lui-tab__text">{children}</span>
  </li>
);
LuiTab.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  otherprops: PropTypes.object,
};
LuiTab.defaultProps = {
  children: null,
  className: null,
  onClick: null,
  otherprops: null,
};

export default LuiTab;
