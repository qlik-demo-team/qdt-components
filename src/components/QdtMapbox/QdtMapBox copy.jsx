import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import useHyperCube from '../../hooks/useHyperCube';
import Theme from '../../styles';

let mapData = [];
let map = null;
let GeoJSON = null;
let propertyChildren = null;
let propertyChildrenWithColors = null;

const QdtMapBox = ({
  width, height, minWidth, minHeight, accessToken, style, center, zoom, pitch, bearing, legend, circleRadius, getData, getAllDataInterval, qPage, tooltip, extraLayers, createLayers, ...hyperCubeProps
}) => {
  const node = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { qData, qLayout, changePage } = useHyperCube({ qPage, ...hyperCubeProps });
  const property = hyperCubeProps.cols[3];
  const handleCallback = useCallback(() => getData(qData, qLayout, map), [getData, qData, qLayout]);

  function buildFeatureSimplified(obj) {
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

    // if no tooltip callback specified, do not add description property
    if (tooltip !== null) {
      featureObj.properties.description = tooltip(obj);
    }

    return featureObj;
  }

  const createPropertyChilderFromQData = () => {
    propertyChildren = [...new Set(qData.qMatrix.map((array) => array[3].qText))];
    propertyChildrenWithColors = propertyChildren.reduce((r, e, i) => r.push(e, Theme.palette[i]) && r, []);
  };

  // ========================================================
  // Convert qMatrix to GeoJSON
  //
  // Given the qMatrix Data, it converts it to properly formatted GeoJSON
  function buildGeoJSON() {
    const goodGeoJSON = {
      type: 'FeatureCollection',
      features: [],
    };

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
    const match = ['match', ['get', property], ...propertyChildrenWithColors, '#FFF'];
    const layer = {
      id: 'dots',
      type: 'circle',
      source: 'hyperCubeData',
      paint: {
        'circle-stroke-width': 0,
        'circle-radius': circleRadius,
        'circle-color': match,
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
    map.addSource('hyperCubeData', {
      type: 'geojson',
      data: GeoJSON,
    });
    const layer = buildLayer();
    map.addLayer(layer);
    if (extraLayers && extraLayers.length) {
      extraLayers.map((_layer) => map.addLayer(_layer));
    }

    // ==== Tooltip Start ===== //
    if (tooltip !== null) {
      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'qdt-components-mb-tooltip',
      });

      map.on('mouseenter', 'dots', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.features[0].geometry.coordinates.slice();
        const { description } = e.features[0].properties;
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      map.on('mouseleave', 'dots', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    }
    // ==== End Tooltip ======= //
  };

  // ==========================================================================
  // Updates the map to display the appropriate layer
  const updateLayers = () => {
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
      GeoJSON = { ...GeoJSON, features: [...GeoJSON.features, ...nextChunk] };
      map.getSource('hyperCubeData').setData(GeoJSON);
    } else {
      GeoJSON = buildGeoJSON();
      buildMap();
    }
  };

  const mapInit = () => {
    mapboxgl.accessToken = accessToken;
    map = new mapboxgl.Map({
      container: node.current, // container id
      style, // stylesheet location
      center, // starting position [lng, lat]
      zoom, // starting zoom
      pitch, // Camera Angle
      bearing, // Compass Direction
    });
    // After Map is loaded, update GeoJSON & save Map object before continuing
    map.on('load', () => {
      if (createLayers) updateLayers(qData); // Draw the first set of data, in case we load all
      setIsLoaded(true);
      mapData = [...mapData, ...qData.qMatrix];
    });
  };

  const getAllData = () => {
    let currentPage = 1; // 0 has already been populated
    const totalPages = Math.ceil(qLayout.qHyperCube.qSize.qcy / qPage.qHeight);
    const populateDataID = setInterval(async () => {
      if (currentPage === totalPages) {
        clearInterval(populateDataID);
      } else {
        changePage({ qTop: currentPage * qPage.qHeight });
        currentPage += 1;
      }
    }, getAllDataInterval * 1000);
  };

  useEffect(() => {
    if (qData && !isLoaded) {
      if (getAllDataInterval) getAllData();
      if (createLayers) createPropertyChilderFromQData();
      mapInit();
    }
    if (qData && getData) handleCallback();
    if (isLoaded && createLayers) updateLayers(qData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qData, qLayout]);

  return (
    <>
      <div style={{ display: 'block', position: 'relative' }}>
        <div
          ref={node}
          style={{
            width, height: height - 50, minWidth, minHeight,
          }}
        />
      </div>
      <div style={{
        display: 'block', position: 'relative', height: 20, padding: 2, fontSize: 11,
      }}
      >
        {legend && isLoaded && propertyChildrenWithColors.map((value, index) => ((index % 2 === 0) ? (
          <div style={{ display: 'inline-block' }}>
            {value}
            :
          </div>
        ) : (
          <div style={{
            width: 10, height: 10, backgroundColor: value, display: 'inline-block', marginRight: 10, marginLeft: 3,
          }}
          />
        )))}
      </div>
    </>
  );
};

QdtMapBox.propTypes = {
  accessToken: PropTypes.string,
  style: PropTypes.string,
  center: PropTypes.array,
  zoom: PropTypes.number,
  pitch: PropTypes.number,
  bearing: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  minWidth: PropTypes.string,
  minHeight: PropTypes.string,
  legend: PropTypes.bool,
  circleRadius: PropTypes.number,
  getData: PropTypes.func,
  getAllDataInterval: PropTypes.number,
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
  extraLayers: PropTypes.array,
  createLayers: PropTypes.bool,
  tooltip: PropTypes.func,
};

QdtMapBox.defaultProps = {
  accessToken: 'pk.eyJ1IjoiYXJ0dXJvbXVub3oiLCJhIjoiY2swODR2NmlhNDYwaDNicDBlcnB6YmR0OSJ9.AgG7MN8DX1aFuG1DfbFr_Q',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.50, 40],
  zoom: 4,
  pitch: 0, // https://docs.mapbox.com/mapbox-gl-js/api/#cameraoptions
  bearing: 0,
  width: '100%',
  height: '100%',
  minWidth: 'auto',
  minHeight: 'auto',
  legend: true, // @TODO - Dock options left, top, bottom or none
  circleRadius: 5,
  getData: null,
  getAllDataInterval: 0,
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
  extraLayers: null,
  createLayers: true,
  tooltip: null,
};

export default QdtMapBox;
