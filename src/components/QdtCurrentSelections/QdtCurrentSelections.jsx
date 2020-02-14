/**
 * @name QdtCurrentSelections
 * @param {object} app - Qlik Sense app
*/

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const QdtCurrentSelections = ({ app }) => {
  const node = useRef(null);

  useEffect(() => {
    app.getObject(node.current, 'CurrentSelections');
  }, [app]);

  return (
    <>
      <div ref={node} />
    </>
  );
};

QdtCurrentSelections.propTypes = {
  app: PropTypes.object,
};

QdtCurrentSelections.defaultProps = {
  app: null,
};

export default QdtCurrentSelections;
