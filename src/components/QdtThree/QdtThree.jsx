/**
 * @name QdtThree
*/

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useThree from '../../hooks/useThree';

const QdtThree = ({ layout }) => {
  const node = useRef(null);
  // const { createGroundPlane } = useThree({ layout, options: { canvas: node.current } });

  useEffect(() => {
    if (node) {
      const { createGroundPlane } = useThree({ layout, options: { domElement: node.current } });  // eslint-disable-line
      createGroundPlane();
    }
  }, [layout, node]);

  return (
    <div
      ref={node}
      className="qdt-three"
      style={{
        width: '100%', height: '100%', minWidth: '100%', minHeight: '100%',
      }}
    />
  );
};

QdtThree.propTypes = {
  layout: PropTypes.object,
};
QdtThree.defaultProps = {
  layout: null,
};

export default QdtThree;
