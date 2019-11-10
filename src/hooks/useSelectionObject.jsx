import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

let qDoc = null;
let qObject = null;

const useSelectionObject = ({ qDocPromise }) => {
  const [qLayout, setQLayout] = useState(null);

  const update = async () => {
    const _qLayout = await qObject.getLayout();
    setQLayout(_qLayout);
  };

  const clearSelections = async (field, value) => {
    if (field) {
      const qField = await qDoc.getField(field);
      if (value) {
        await qField.toggleSelect(value);
      } else {
        await qField.clear();
      }
    } else {
      qDoc.clearAll();
    }
  };

  useEffect(() => {
    (async () => {
      const qProp = { qInfo: { qType: 'SelectionObject' }, qSelectionObjectDef: {} };
      qDoc = await qDocPromise;
      qObject = await qDoc.createSessionObject(qProp);
      qObject.on('changed', () => { update(); });
      update();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { qLayout, clearSelections };
};

useSelectionObject.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
};

useSelectionObject.defaultProps = {
  cols: [],
  options: { qType: 'SelectionObject' },
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 1,
    qHeight: 1,
  },
};

export default useSelectionObject;
