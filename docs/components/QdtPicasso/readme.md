## Create a chart from the Engine Api

Set of charts created from the Engine Api and [Picasso.js](https://picassojs.com/).

### Properties

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| type             | String        | `comboLineBarchart`, `horizontalBarchart`, `lineChart`, `multiLineChart`, `pie`, `piechart`, `scatterplot`, `verticalBarchart`, `stackedBarchart`, `verticalGauge`, `verticalRangeGauge`, `rangeArea`, `verticalGroupBarchart` |
| cols             | Array         | `[dimension, measure]` |
| options          | Object        | `color` |
| prio             | String        | `canvas` or `svg`. If omitted, it defaults to canvas |


### Html Code

```
<QdtComponent
  type="QdtPicasso"
  props={{
    type: 'horizontalBarchart', 
    cols: ['Case Owner Group', '=Avg([Case Duration Time])'], 
    outerHeight: 300,
  }}
/>
```


|[Horizontal Barchart](https://github.com/qlik-demo-team/qdt-components/tree/picasso-docs/docs/components/QdtPicasso/HorizontalBarChart)|[Vertical Barchart](./VerticalBarChart)|Pie Chart|Scatterplot|Line Chart|
|:---:|:---:|:---:|:---:|:---:|
|[![picassoHorizontalBarchart](../../assets/picassoHorizontalBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-horizontal-barchart)|[![picassoVerticalBarchart](../../assets/picassoVerticalBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-vertical-barchart)|[![picassoPie](../../assets/picassoPie.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-pie-chart)|[![picassoScotterplot](../../assets/picassoScotterplot.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-scatterplot)|[![picassoLinechart](../../assets/picassoLinechart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-line-chart)|


| [Horizontal Barchart](https://github.com/qlik-demo-team/qdt-components/tree/picasso-docs/docs/components/QdtPicasso/HorizontalBarChart) | [Vertical Barchart](./VerticalBarChart) |
| :----: | :----:                     |
| [![picassoHorizontalBarchart](../../assets/picassoHorizontalBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-horizontal-barchart)| [![picassoVerticalBarchart](../../assets/picassoVerticalBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-vertical-barchart) |


| [Pie Chart](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-pie-chart) | [Scatterplot](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-scatterplot) |
| :----:                            |    :----:                     |
| [![picassoPie](../../assets/picassoPie.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-pie-chart)| [![picassoScotterplot](../../assets/picassoScotterplot.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-scatterplot) |


| [Line Chart](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-line-chart) | [Multi Line Chart](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-multi-line-chart) |
| :----:                            |    :----:                     |
| [![picassoLinechart](../../assets/picassoLinechart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-line-chart)| [![picassoMultiLinechart](../../assets/picassoMultiLinechart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-multi-line-chart) |


| [Stacked barchart](https://qdt-apps.qlik.com/qdt-components/react/#/stacked-barchart) | [Gauge](https://qdt-apps.qlik.com/qdt-components/react/#/gauge) |
| :----:                            |    :----:                     |
| [![picassoStackedBarchart](../../assets/picassoStackedBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/stacked-barchart)| [![gauge](../../assets/gauge.png)](https://qdt-apps.qlik.com/qdt-components/react/#/gauge) |


| [Range Area](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-range-area-chart) | [Vertical Group Barhart](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-vertical-group-barchart) |
| :----:                            |    :----:                     |
| [![picassoRangeAreaChart](../../assets/picassoRangeAreaChart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-range-area-chart)| [![picassoVerticalBarchart](../../assets/picassoVerticalBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-vertical-group-barchart) |

---

Since we have made all elements into individual components, you can create custom charts by mixing components like boxes and lines

| [Custom Combo Chart](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-combo-chart) | [Custom Group Barchart](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-vertical-group-barchart) |
| :----:                            |    :----:                     |
| [![picassoCustomChart](../../assets/picassoCustomChart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-combo-chart)| [![picassoCustomGroupBarchart](../../assets/picassoCustomGroupBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-vertical-group-barchart) |
