const mapToken = 'pk.eyJ1IjoiYXJ0dXJvbXVub3oiLCJhIjoiY2swODR2NmlhNDYwaDNicDBlcnB6YmR0OSJ9.AgG7MN8DX1aFuG1DfbFr_Q';
const totalPlayableSeconds = 30 * 60; // Minutes * seconds
const intervalSeconds = 1;
const textFadingMiliSec = 100;
const textFadingOpacity = '0.5';
const framesPerLayer = 3;

const mapBoxOptions = {
  container: 'map',
  style: 'mapbox://styles/arturomunoz/ck18elevs5kch1dpnwrwa76ox',
  center: [-97.531708, 39.305878],
  zoom: 4.3,
  interactive: false,
};

const mapDots = {
  'circle-stroke-width': 0,
  'circle-radius': 2,
};

const mapPaint = {
  gender: ['match', ['get', 'gender'], 'Male', '#DADE50', 'Female', '#73FBFD', '#FFF'],
  agegroup: ['match', ['get', 'agegroup'], 'Millennial+', '#d72551', 'Generation Z', '#5bd8e4', '#FFF'],
};

export {
  mapBoxOptions, mapToken, totalPlayableSeconds, intervalSeconds, mapDots, mapPaint, textFadingMiliSec, textFadingOpacity, framesPerLayer,
};
