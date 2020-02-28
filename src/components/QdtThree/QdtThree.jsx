/**
 * @name QdtSequencer
 * @param {array} cols - Dimension for the data to cycle through
 * @param {number} delay [5] - Loop through the results in given seconds.
 * @param {bool} selectRow [false] - If we want each cycled row to be selected.
 * @param {number} keyCode [null] - If we want to control the sequencer with a key stroke. Toggles play.
 * @param {bool} navigation [true] - If we want to show / hide the navigation and use only key strokes
 * @description
 * Loop through a dimension and make selections.
*/

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import merge from 'deepmerge';
// import useThree from '../../hooks/useThree/useThree';
=======
import merge from '../../utils/merge';
>>>>>>> 8ed166ff07e871f94964adc0f2e7762e5f5f37b9

const QdtThree = ({ layout, model, options: optionsProp }) => {
  const defaultOptions = {
  };
  const options = merge(defaultOptions, optionsProp);
  const node = useRef(null);
  // const { createGroundPlane } = useThree({ layout, options: { canvas: node.current } });
  console.log('QdtThree', model, options);

  useEffect(() => {
    // let createGroundPlane;
    if (node) {
      // const { createGroundPlane } = useThree({ layout, options: { domElement: node.current } });  // eslint-disable-line
      // createGroundPlane();
      // finalRender();
    }
    console.log('QdtThree mounted');
    // createGroundPlane();
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
  model: PropTypes.object,
  options: PropTypes.object,
};
QdtThree.defaultProps = {
  layout: null,
  model: null,
  options: {},
};

export default QdtThree;
