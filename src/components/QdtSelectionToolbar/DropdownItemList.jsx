import React from 'react';
import PropTypes from 'prop-types';
import { LuiListItem } from '../QdtLui';

/** Create the DropDown list */
const DropdownItemList = ({ value, onClick }) => (
  <span>
    {value.selected.map((value2) => (
      <LuiListItem key={value.field}>
        {value2}
        <span
          className="lui-icon lui-icon--remove pull-right"
          onClick={() => onClick(value.field, value2)}
          role="button"
          tabIndex={0}
        />
      </LuiListItem>
    ))}
  </span>
);

DropdownItemList.propTypes = {
  value: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DropdownItemList;
