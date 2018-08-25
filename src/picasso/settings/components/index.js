import domPointLabel from './domPointLabel';
import axis from './axis';
import legend from './legend';
import point from './point';
import tooltip from './tooltip';
// import interactions from './interactions';

const components = {
  domPointLabel,
  xAxis: axis.x,
  yAxis: axis.y,
  legend,
  point,
  tooltip,
//   interactions,
};

module.exports = components;
