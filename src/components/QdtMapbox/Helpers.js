import {
  mapDots, mapPaint, textFadingMiliSec, textFadingOpacity,
} from './Constants';

function buildFeatureSimplified(obj) {
  const { id, gender, agegroup } = obj;
  const featureObj = {
    type: 'Feature',
    properties: {
      count: 1,
      userID: id,
      gender,
      agegroup,
    },
    geometry: {
      type: 'Point',
      coordinates: [obj.lng, obj.lat],
    },
  };
  return featureObj;
}

// ========================================================
// Convert qMatrix to GeoJSON
//
// Given the qMatrix Data, it converts it to properly formatted GeoJSON
function buildGeoJSON(qMatrix) {
  const goodGeoJSON = {
    type: 'FeatureCollection',
    features: [],
  };

  qMatrix.map((array) => {
    const obj = {
      id: Number(array[0].qNum),
      lat: Number(array[1].qNum),
      lng: Number(array[2].qNum),
    };

    obj.gender = array[3].qText;
    obj.agegroup = array[4].qText;

    const feature = buildFeatureSimplified(obj);
    goodGeoJSON.features.push(feature);
    return obj;
  });
  return goodGeoJSON;
}

// ========================================================
// Build Layer
function buildLayer() {
  const layer = {
    id: 'dots',
    type: 'circle',
    source: 'users',
    paint: {
      ...mapDots,
      'circle-color': mapPaint.agegroup,
      'circle-opacity': 1,
    },
  };
  return layer;
}

const populateCounters = (GeoJSON) => {
  const finalDecisionCounter = {
    Female: { num: 0, text: '0%' },
    Male: { num: 0, text: '0%' },
    Millenial: { num: 0, text: '0%' },
    GenerationZ: { num: 0, text: '0%' },
  };
  GeoJSON.features.map((value) => {
    const valueAgeGroup = (value.properties.agegroup === 'Millennial+') ? 'Millenial' : 'GenerationZ';
    if (finalDecisionCounter[value.properties.gender]) {
      finalDecisionCounter[value.properties.gender].num += 1;
      finalDecisionCounter[value.properties.gender].text = (finalDecisionCounter[value.properties.gender].num / GeoJSON.features.length) * 100;
      finalDecisionCounter[value.properties.gender].text = Number(finalDecisionCounter[value.properties.gender].text.toFixed(2));
    }
    if (finalDecisionCounter[valueAgeGroup]) {
      finalDecisionCounter[valueAgeGroup].num += 1;
      finalDecisionCounter[valueAgeGroup].text = (finalDecisionCounter[valueAgeGroup].num / GeoJSON.features.length) * 100;
      finalDecisionCounter[valueAgeGroup].text = Number(finalDecisionCounter[valueAgeGroup].text.toFixed(2));
    }
    return true;
  });
  return GeoJSON;
};

export {
  buildFeatureSimplified,
  buildGeoJSON,
  buildLayer,
  populateCounters,
};
