import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import useHyperCube from '../../hooks/useHyperCube';
// import useListObject from '../../hooks/useListObject';

let map = null;

const QdtMapBox = ({
  width, height, minWidth, minHeight, accessToken, style, center, zoom, ...otherProps
}) => {
  console.log('QdtMapBox');
  const node = useRef(null);
  const { qData } = useHyperCube({ ...otherProps });
  // const { qData } = useListObject({ ...otherProps });

  const mapInit = () => {
    mapboxgl.accessToken = accessToken;
    map = new mapboxgl.Map({
      container: node.current, // container id
      style, // stylesheet location
      center, // starting position [lng, lat]
      zoom, // starting zoom
    });
    console.log(map);
  };

  useEffect(() => {
    console.log('QdtMapBox-useEffect', qData);
    mapInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qData]);

  return (
    <>
      <div
        ref={node}
        style={{
          width, height, minWidth, minHeight,
        }}
      />
    </>
  );
};

QdtMapBox.propTypes = {
  accessToken: PropTypes.string,
  style: PropTypes.string,
  center: PropTypes.array,
  zoom: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  minWidth: PropTypes.string,
  minHeight: PropTypes.string,
  // useHyperCube props
  cols: PropTypes.array,
  qPage: PropTypes.object,
  qSortByAscii: PropTypes.oneOf([1, 0, -1]),
  qSortByLoadOrder: PropTypes.oneOf([1, 0, -1]),
  qInterColumnSortOrder: PropTypes.array,
  qSuppressZero: PropTypes.bool,
  qSortByExpression: PropTypes.oneOf([1, 0, -1]),
  qSuppressMissing: PropTypes.bool,
  qExpression: PropTypes.object,
};

QdtMapBox.defaultProps = {
  accessToken: 'pk.eyJ1IjoiYXJ0dXJvbXVub3oiLCJhIjoiY2swODR2NmlhNDYwaDNicDBlcnB6YmR0OSJ9.AgG7MN8DX1aFuG1DfbFr_Q',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.50, 40],
  zoom: 4,
  width: '100%',
  height: '100%',
  minWidth: 'auto',
  minHeight: 'auto',
  // useHyperCube props
  cols: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 10,
    qHeight: 100,
  },
  qSortByAscii: 1,
  qSortByLoadOrder: 1,
  qInterColumnSortOrder: [],
  qSuppressZero: true,
  qSortByExpression: 0,
  qSuppressMissing: true,
  qExpression: null,
};

export default QdtMapBox;
