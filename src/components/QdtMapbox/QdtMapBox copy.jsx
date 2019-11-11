import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import {
  buildGeoJSON, buildLayer, buildFeatureSimplified, populateCounters, mapBoxOptions, mapToken, totalPlayableSeconds, intervalSeconds,
} from './MapHelpers';
import './QdtMapBox.scss';

mapboxgl.accessToken = mapToken;
let mapData = [];
let map = null;
let GeoJSON = null;

const QdtMapBox = () => {
  console.log('QdtMapBox');
  const title = 'yiannis';

  // ======================================================
  // Build Map Items (Source, Layers)
  //
  // Using the GeoJSON and map object, we create a Layer for the dots and add them to the map
  // This function also sets up the periodic update to cycle through the dots
  const buildMap = () => {
    map.addSource('users', {
      type: 'geojson',
      data: GeoJSON,
    });
    const layer = buildLayer();
    map.addLayer(layer);
  };

  // ==========================================================================
  // Updates the map to display the appropriate layer
  const updateLayers = async (qData) => {
    const nextChunk = qData.map((array) => {
      const obj = {
        id: Number(array[0].qNum),
        lat: Number(array[1].qNum),
        lng: Number(array[2].qNum),
        gender: array[3].qText,
        agegroup: array[4].qText,
      };

      return buildFeatureSimplified(obj);
    });
    if (GeoJSON) {
      GeoJSON = { ...GeoJSON, features: [...GeoJSON.features, ...nextChunk] };
      populateCounters(GeoJSON);
      map.getSource('users').setData(GeoJSON);
    } else {
      GeoJSON = await buildGeoJSON(qData);
      populateCounters(GeoJSON);
      buildMap();
    }
  };

  const populateData = async () => {
    const totalDataRows = await getTotalDataRows();
    const rowsPerSeconds = Math.ceil(totalDataRows / totalPlayableSeconds);
    const rowsPerInterval = intervalSeconds * rowsPerSeconds;
    let currentFrame = 0;
    const totalFrames = Math.ceil(totalPlayableSeconds / intervalSeconds);

    const populateDataID = setInterval(async () => {
      if (currentFrame === totalFrames) {
        clearInterval(populateDataID);
      } else if (!isAnimationPaused) {
        if (currentFrame === 0) console.log('Animation Started!');
        const qData = await getMapData(currentFrame * rowsPerInterval, rowsPerInterval);
        await updateLayers(qData);
        mapData = [...mapData, ...qData];
        currentFrame += 1;
        console.log(`${mapData.length}/${totalDataRows}`);
      }
    }, intervalSeconds * 1000);
    return mapData;
  };

  const mapInit = async () => {
    map = new mapboxgl.Map(mapBoxOptions);

    // After Map is loaded, update GeoJSON & save Map object before continuing
    map.on('load', async () => {
      await populateData();
    });
  };

  useEffect(() => {
    console.log('QdtMapBox-useEffect');
    mapInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {title}
      <div
        id="map"
        style={{
          width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0,
        }}
      />
    </>
  );
};

export default QdtMapBox;
