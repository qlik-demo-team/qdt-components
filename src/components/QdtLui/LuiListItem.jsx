import React from 'react';
import PropTypes from 'prop-types';

const LuiListItem = ({
  children, className, onClick, ...otherprops
}) => (
  <li className={`lui-list__item ${className}`} onClick={onClick} {...otherprops}>
    <span className="lui-list__text">{children}</span>
  </li>
);

LuiListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  otherprops: PropTypes.object,
};

LuiListItem.defaultProps = {
  children: null,
  className: null,
  onClick: null,
  otherprops: null,
};

export default LuiListItem;
