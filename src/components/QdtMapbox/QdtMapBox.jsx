import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import merge from 'utils/merge';
import mapboxgl from 'mapbox-gl';
import Theme from '../../styles'; // @TODO REMOVE

const QdtMapBox = ({ layout, model, options: optionsProp }) => {
  // https://docs.mapbox.com/mapbox-gl-js/api/#cameraoptions
  const defaultOptions = {
    accessToken: 'pk.eyJ1IjoiYXJ0dXJvbXVub3oiLCJhIjoiY2swODR2NmlhNDYwaDNicDBlcnB6YmR0OSJ9.AgG7MN8DX1aFuG1DfbFr_Q',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.50, 40],
    zoom: 4,
    pitch: 0,
    bearing: 0,
    circleRadius: 5,
    width: '100%',
    height: '100%',
    // minWidth: 'auto',
    // minHeight: 'auto',
    legend: true, // @TODO - Dock options left, top, bottom or none
    tooltip: null,
    createLayers: true,
    extraLayers: null,
    flyTo: null,
    handleMapCallback: null,
    interactive: true,
  };
  const options = merge(defaultOptions, optionsProp);
  if (optionsProp.center) options.center = optionsProp.center; // Deep merges the array and we have center: (4) [-74.5, 40, -140, 50], which breaks mapbox
  const node = useRef(null);
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const qData = layout.qHyperCube?.qDataPages[0];
  const qMatrix = qData ? qData.qMatrix : [];
  const property = (options.createLayers) ? layout.qHyperCube?.qDimensionInfo[3]?.qFallbackTitle : null;
  let mapData = [];
  let GeoJSON = null;
  let propertyChildren = null;
  let propertyChildrenWithColors = null;

  const handleSelection = useCallback((value) => {
    model.selectHyperCubeValues('/qHyperCubeDef', 0, [value], true);
  }, [model]);

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
    if (options.tooltip !== null) {
      featureObj.properties.description = options.tooltip(obj);
    }

    return featureObj;
  }

  const createPropertyChilderFromQData = () => {
    propertyChildren = [...new Set(qMatrix.map((array) => array[3].qText))];
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

    qMatrix.map((array) => {
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
        'circle-radius': options.circleRadius,
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
    if (options.extraLayers && options.extraLayers.length) {
      options.extraLayers.map((_layer) => map.addLayer(_layer));
    }

    // ==== Tooltip Start ===== //
    if (options.tooltip !== null) {
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
    const nextChunk = qMatrix.map((array) => {
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
    mapboxgl.accessToken = options.accessToken;
    const _map = new mapboxgl.Map({
      container: node.current, // container id
      ...options,
    });
    setMap(_map);
  };

  useEffect(() => {
    if (qData && options.createLayers) createPropertyChilderFromQData();
    if (!map) mapInit();
    if (map) {
      // After Map is loaded, update GeoJSON & save Map object before continuing
      map.on('load', () => {
        if (options.createLayers) updateLayers(qData); // Draw the first set of data, in case we load all
        // if (options.handleMapCallback) options.handleMapCallback({ map, mapboxgl, layout });
        setIsLoaded(true);
        mapData = [...mapData, ...qMatrix];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if (isLoaded && map && layout && options.handleMapCallback) {
      options.handleMapCallback({
        map, mapboxgl, layout, handleSelection,
      });
    }
  }, [map, isLoaded, layout]); // eslint-disable-line

  return (
    <>
      <div
        ref={node}
        style={{
          width: options.width, height: options.height,
        }}
      />
      <div style={{
        display: 'block', position: 'relative', height: 20, padding: 2, fontSize: 11,
      }}
      >
        {options.legend && propertyChildrenWithColors && propertyChildrenWithColors.map((value, index) => ((index % 2 === 0) ? (
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
  layout: PropTypes.object,
  model: PropTypes.object,
  options: PropTypes.object,
};

QdtMapBox.defaultProps = {
  layout: null,
  model: null,
  options: {},
};

export default QdtMapBox;
