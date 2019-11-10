import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function LuiDropdown({
  children, className, gradient, inverse, isOpen, select, style, toggle,
}) {
  const nodeLuiDropdown = useRef(null);
  const [value, menu, ...other] = children;

  const handleToggle = (event) => toggle(event);

  const handleClick = (event) => {
    const outsideClick = !nodeLuiDropdown.current.contains(event.target);
    if (isOpen && outsideClick) handleToggle(event);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div
      ref={nodeLuiDropdown}
      className={className}
      style={{ position: 'relative', ...style }}
    >
      <div
        className={`
          ${select ? 'lui-select' : ''} 
          ${gradient ? 'lui-select--gradient' : ''}
          ${inverse ? 'lui-select--inverse' : ''}
          ${gradient && inverse ? 'lui-select--gradient-inverse' : ''}
        `}
        role="button"
        tabIndex="0"
        onClick={handleToggle}
      >
        {value}
      </div>
      <div style={{
        display: isOpen ? 'block' : 'none',
        position: 'absolute',
        background: '#fff',
        border: '1px solid #ccc',
        marginTop: 4,
        zIndex: 99999,
        cursor: 'pointer',
      }}
      >
        {menu}
      </div>
      {other}
    </div>
  );
}

LuiDropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  gradient: PropTypes.bool,
  inverse: PropTypes.bool,
  isOpen: PropTypes.bool,
  select: PropTypes.bool,
  style: PropTypes.object,
  toggle: PropTypes.func,
};

LuiDropdown.defaultProps = {
  children: null,
  className: null,
  gradient: null,
  inverse: null,
  isOpen: false,
  select: true,
  style: null,
  toggle: null,
};

export default LuiDropdown;
