import React from 'react';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import withSelectionObject from './withSelectionObject';
import '../styles/index.scss';

const dropdownOpen = [false, false, false, false, false, false];
const QdtSelectionToolbar = ({ qLayout, clearSelections, update }) => {
  const selectedFields = qLayout.qSelectionObject.qSelections;
  let selections = [];
  if (selectedFields.length) {
    selections = selectedFields.map((value) => {
      if (value.qSelectedCount >= 1 && value.qSelectedCount <= 6) {
        return {
          field: value.qField,
          selected: value.qSelectedFieldSelectionInfo.map(valueInner => valueInner.qName),
          total: value.qTotal,
        };
      } else if (value.qSelectedCount > 6) {
        return {
          field: value.qField,
          selected: [`${value.qSelectedCount} of ${value.qTotal}`],
        };
      }
      return null;
    });
  }

  const toggle = (index) => {
    dropdownOpen[index] = !(dropdownOpen[index]);
    update();
  };

  return (
    <div className="qdt-selection-toolbar">
      <ul>
        <li><strong>SELECTIONS:</strong></li>
        {selections.length === 0 &&
        <li className="no-selections">None</li>
        }
        {selections.length >= 1 && selections.length <= 6 &&
            selections.map((value, index) => {
                if (value.selected.length === 1) {
                    return <li key={value.field}>{value.field}: {value.selected[0]}<span className="lui-icon lui-icon--remove" onClick={() => clearSelections(value.field)} role="button" tabIndex={0} /></li>;
                }
                    return (
                      <li key={value.field}>
                        <ButtonDropdown
                          isOpen={dropdownOpen[index]}
                          toggle={() => toggle(index)}
                        >
                          <DropdownToggle>
                            {value.field}: {value.selected.length} of {value.total}
                            <span className="lui-icon lui-icon--triangle-bottom" />
                          </DropdownToggle>
                          <DropdownMenu>
                            {value.selected.map(value2 => <DropdownItem key={value2}>{value2}<span className="lui-icon lui-icon--remove pull-right" onClick={() => clearSelections(value.field, value2)} role="button" tabIndex={0} /></DropdownItem>)}
                          </DropdownMenu>
                        </ButtonDropdown>
                      </li>
                    );
            })
        }
        {selections.length >= 1 && selections.length <= 6 &&
        <li><button className="lui-button lui-button--warning clear-all" onClick={() => clearSelections()} tabIndex={0}>Clear All</button></li>
        }
      </ul>
    </div>);
};
QdtSelectionToolbar.propTypes = {
  qLayout: PropTypes.object.isRequired,
  clearSelections: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const QdtSelectionToolbarObject = withSelectionObject(QdtSelectionToolbar);
QdtSelectionToolbarObject.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  options: PropTypes.object,
  qPage: PropTypes.object,
};
QdtSelectionToolbarObject.defaultProps = {
  cols: [],
  options: { qType: 'SelectionObject' },
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 1,
  },
};
QdtSelectionToolbarObject.state = {
  dropdownOpen: [false, false, false, false, false, false],
};

export default QdtSelectionToolbarObject;
