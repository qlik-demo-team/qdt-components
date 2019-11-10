import React from 'react';
import PropTypes from 'prop-types';
import useSelectionObject from '../../hooks/useSelectionObject';
import QdtSelectionToolbarDropdown from './QdtSelectionToolbarDropdown';
import '../../styles/index.scss';

const QdtSelectionToolbar = ({
  qDocPromise, cols, qPage, options, title, btnText,
}) => {
  const { qLayout, clearSelections } = useSelectionObject({
    qDocPromise, cols, qPage, options,
  });
  let selections = [];

  if (qLayout) {
    const selectedFields = qLayout.qSelectionObject.qSelections;
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
                  <QdtSelectionToolbarDropdown value={value} clearSelections={clearSelections} key={value.field} />
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
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  options: PropTypes.object,
  qPage: PropTypes.object,
  title: PropTypes.string,
  btnText: PropTypes.string,
};

QdtSelectionToolbar.defaultProps = {
  cols: [],
  options: { qType: 'SelectionObject' },
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 1,
  },
  title: 'SELECTIONS',
  btnText: 'Clear All',
};

export default QdtSelectionToolbar;
