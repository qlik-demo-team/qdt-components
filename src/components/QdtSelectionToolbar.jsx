import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { LuiDropdown } from 'qdt-lui';
import withSelectionObject from './withSelectionObject';
import '../styles/index.scss';

class QdtSelectionToolbarDropdown extends React.Component {
  static propTypes = {
    clearSelections: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
  }

  state = {
    dropdownOpen: false,
  }

  @autobind
  toggle() {
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
  }

  render() {
    const { clearSelections, value } = this.props;
    const { dropdownOpen } = this.state;
    return (
      <LuiDropdown
        isOpen={dropdownOpen}
        toggle={this.toggle}
        select={false}
      >
        <div>
          {value.field}
:
          {value.selected.length}
          {' '}
of
          {value.total}
          <span className="lui-icon lui-icon--triangle-bottom" />
        </div>
        <ul>
          {value.selected.map((value2) => (
            <li key={value2}>
              {value2}
              <span
                className="lui-icon lui-icon--remove pull-right"
                onClick={() => clearSelections(value.field, value2)}
                role="button"
                tabIndex={0}
              />
            </li>
          ))}
        </ul>
      </LuiDropdown>
    );
  }
}

const QdtSelectionToolbar = ({
  qLayout, clearSelections, title, btnText,
}) => {
  const selectedFields = qLayout.qSelectionObject.qSelections;
  let selections = [];
  if (selectedFields.length) {
    selections = selectedFields.map((value) => {
      if (value.qSelectedCount >= 1 && value.qSelectedCount <= 6) {
        return {
          field: value.qField,
          selected: value.qSelectedFieldSelectionInfo.map((valueInner) => valueInner.qName),
          total: value.qTotal,
        };
      } if (value.qSelectedCount > 6) {
        return {
          field: value.qField,
          selected: [`${value.qSelectedCount} of ${value.qTotal}`],
        };
      }
      return null;
    });
  }

  return (
    <div className="qdt-selection-toolbar">
      <ul>
        <li>
          <strong>
            {title}
:
          </strong>
        </li>
        {selections.length === 0
        && <li className="no-selections">None</li>}
        {selections.length >= 1 && selections.length <= 6
            && selections.map((value) => {
              if (value.selected.length === 1) {
                return (
                  <li key={value.field}>
                    {value.field}
:
                    {' '}
                    {value.selected[0]}
                    <span className="lui-icon lui-icon--remove" onClick={() => clearSelections(value.field)} role="button" tabIndex={0} />
                  </li>
                );
              }
              return (
                <li key={value.field}>
                  <QdtSelectionToolbarDropdown value={value} clearSelections={clearSelections} />
                </li>
              );
            })}
        {selections.length >= 1 && selections.length <= 6
        && <li><button type="button" className="lui-button lui-button--warning clear-all" onClick={() => clearSelections()} tabIndex={0}>{btnText}</button></li>}
      </ul>
    </div>
  );
};
QdtSelectionToolbar.propTypes = {
  qLayout: PropTypes.object.isRequired,
  clearSelections: PropTypes.func.isRequired,
  title: PropTypes.string,
  btnText: PropTypes.string,
};
QdtSelectionToolbar.defaultProps = {
  title: 'SELECTIONS',
  btnText: 'Clear All',
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

export default QdtSelectionToolbarObject;
