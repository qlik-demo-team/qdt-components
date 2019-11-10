import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DropdownItemList from './DropdownItemList';
import { LuiDropdown, LuiList } from '../QdtLui';

const QdtSelectionToolbarDropdown = ({ clearSelections, value }) => {
  const [dropdownOpen, setDropDownOpen] = useState(false);

  /** Toggle dropdown visibility */
  const toggle = () => {
    setDropDownOpen(!dropdownOpen);
  };

  return (
    <LuiDropdown isOpen={dropdownOpen} toggle={toggle}>
      <div>
        {value.field}
          :
        {value.selected.length}
        {' '}
          of
        {' '}
        {value.total}
      </div>
      <LuiList style={{ width: '15rem' }}>
        <DropdownItemList value={value} onClick={clearSelections} />
      </LuiList>
    </LuiDropdown>
  );
};

QdtSelectionToolbarDropdown.propTypes = {
  clearSelections: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
};

export default QdtSelectionToolbarDropdown;
