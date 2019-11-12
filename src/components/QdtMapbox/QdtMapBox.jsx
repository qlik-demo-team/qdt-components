import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import useHyperCube from '../../hooks/useHyperCube';

let mapData = [];
let map = null;
let GeoJSON = null;

const QdtMapBox = ({
  width, height, minWidth, minHeight, accessToken, style, center, zoom, ...hyperCubeProps
}) => {
  console.log('QdtMapBox');
  const node = useRef(null);
  const { qData } = useHyperCube({ ...hyperCubeProps });
  const property = hyperCubeProps.cols[3];
  let propertyChildren = null;

  function buildFeatureSimplified(obj) {
    console.log('QdtmapBox-buildFeatureSimplified', property);
    const featureObj = {
      type: 'Feature',
      properties: {
        count: 1,
        userID: obj.id,
        [property]: obj[property],
      },
      geometry: {
        type: 'Point',
        coordinates: [obj.lng, obj.lat],
      },
    };
    return featureObj;
  }

  const createPropertyChilderFromQData = () => propertyChildren = [...new Set(qData.qMatrix.map((array) => array[3].qText))];

  // ========================================================
  // Convert qMatrix to GeoJSON
  //
  // Given the qMatrix Data, it converts it to properly formatted GeoJSON
  function buildGeoJSON() {
    console.log('QdtmapBox-buildGeoJSON');
    const goodGeoJSON = {
      type: 'FeatureCollection',
      features: [],
    };

    createPropertyChilderFromQData();

    qData.qMatrix.map((array) => {
      if (typeof array[1].qNum !== 'number' || typeof array[2].qNum !== 'number') return false;
      const obj = {
        id: Number(array[0].qNum),
        lat: Number(array[1].qNum),
        lng: Number(array[2].qNum),
      };

      obj[property] = array[3].qText;

      const feature = buildFeatureSimplified(obj);
      goodGeoJSON.features.push(feature);
      return obj;
    });
    return goodGeoJSON;
  }

  // ========================================================
  // Build Layer
  function buildLayer() {
    console.log('QdtmapBox-buildLayer', propertyChildren);
    const layer = {
      id: 'dots',
      type: 'circle',
      source: 'users',
      paint: {
        'circle-stroke-width': 0,
        'circle-radius': 5,
        'circle-color': ['match', ['get', property], 'Male', '#3399CC', 'Female', '#CC6666', '#FFF'],
        'circle-opacity': 1,
      },
    };
    return layer;
  }

  // ======================================================
  // Build Map Items (Source, Layers)
  //
  // Using the GeoJSON and map object, we create a Layer for the dots and add them to the map
  // This function also sets up the periodic update to cycle through the dots
  const buildMap = () => {
    console.log('QdtmapBox-buildMap');
    map.addSource('users', {
      type: 'geojson',
      data: GeoJSON,
    });
    const layer = buildLayer();
    map.addLayer(layer);
  };

  // ==========================================================================
  // Updates the map to display the appropriate layer
  const updateLayers = () => {
    console.log('QdtmapBox-updateLayers');
    const nextChunk = qData.qMatrix.map((array) => {
      const obj = {
        id: Number(array[0].qNum),
        lat: Number(array[1].qNum),
        lng: Number(array[2].qNum),
        [property]: array[3].qText,
      };

      return buildFeatureSimplified(obj);
    });
    if (GeoJSON) {
      console.log('QdtmapBox-updateLayers-11');
      GeoJSON = { ...GeoJSON, features: [...GeoJSON.features, ...nextChunk] };
      console.log('QdtmapBox-updateLayers-12');
      map.getSource('users').setData(GeoJSON);
    } else {
      console.log('QdtmapBox-updateLayers-2');
      GeoJSON = buildGeoJSON();
      buildMap();
    }
  };

  const mapInit = () => {
    console.log('QdtmapBox-mapInit');
    mapboxgl.accessToken = accessToken;
    map = new mapboxgl.Map({
      container: node.current, // container id
      style, // stylesheet location
      center, // starting position [lng, lat]
      zoom, // starting zoom
    });
    // After Map is loaded, update GeoJSON & save Map object before continuing
    map.on('load', () => {
      updateLayers(qData);
      mapData = [...mapData, ...qData.qMatrix];
    });
  };

  useEffect(() => {
    console.log('QdtMapBox-useEffect');
    if (qData) mapInit();
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
