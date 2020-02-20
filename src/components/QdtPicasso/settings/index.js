import horizontalBarchart from './horizontalBarchart';
import verticalBarchart from './verticalBarchart';
import scatterplot from './scatterplot';
import scatterplotImage from './scatterplotImage';
import lineChart from './lineChart';
import multiLineChart from './multiLineChart';
import pie from './pie';
import comboLineBarchart from './comboLineBarchart';
import stackedBarchart from './stackedBarchart';
import verticalRangeGauge from './verticalRangeGauge';
import verticalGauge from './verticalGauge';
import verticalGroupBarchart from './verticalGroupBarchart';
import rangeArea from './rangeArea';
import gantt from './gantt';
import merimekko from './merimekko';
import pointDistribution from './pointDistribution';
import pyramid from './pyramid';

export default ({ theme }) => ({
  horizontalBarchart: horizontalBarchart({ theme }),
  verticalBarchart: verticalBarchart({ theme }),
  scatterplot: scatterplot({ theme }),
  scatterplotImage: scatterplotImage({ theme }),
  lineChart: lineChart({ theme }),
  multiLineChart: multiLineChart({ theme }),
  pie: pie({ theme }),
  comboLineBarchart: comboLineBarchart({ theme }),
  stackedBarchart: stackedBarchart({ theme }),
  verticalRangeGauge: verticalRangeGauge({ theme }),
  verticalGauge: verticalGauge({ theme }),
  verticalGroupBarchart: verticalGroupBarchart({ theme }),
  rangeArea: rangeArea({ theme }),
  gantt: gantt({ theme }),
  merimekko: merimekko({ theme }),
  pointDistribution: pointDistribution({ theme }),
  pyramid: pyramid({ theme }),
});
