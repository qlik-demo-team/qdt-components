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

```js
<QdtComponent
  type="QdtPicasso"
  props={{
    type: 'horizontalBarchart', 
    cols: ['Case Owner Group', '=Avg([Case Duration Time])'], 
    outerHeight: 300,
  }}
/>
```


|[Horizontal Barchart](./HorizontalBarChart)|[Vertical Barchart](./VerticalBarChart)|[Pie Chart](./PieChart)|[Scatterplot](./ScatterplotChart)|[Line Chart](./LineChart)|
|:---:|:---:|:---:|:---:|:---:|
|[![picassoHorizontalBarchart](../../assets/picassoHorizontalBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-horizontal-barchart)|[![picassoVerticalBarchart](../../assets/picassoVerticalBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-vertical-barchart)|[![picassoPie](../../assets/picassoPie.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-pie-chart)|[![picassoScotterplot](../../assets/picassoScotterplot.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-scatterplot)|[![picassoLinechart](../../assets/picassoLinechart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-line-chart)|

|[Multi-Line Chart](./MultiLineChart)|[Stacked Bar Chart](./StackedBarChart)|[Gauge](./Gauge)|[Range Area](./RangeArea)|[Vertical Group Bar Chart](./VerticalGroupBarChart)|
|:---:|:---:|:---:|:---:|:---:|
|[![picassoMultiLinechart](../../assets/picassoMultiLinechart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-multi-line-chart)|[![picassoStackedBarchart](../../assets/picassoStackedBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/stacked-barchart)|[![gauge](../../assets/gauge.png)](https://qdt-apps.qlik.com/qdt-components/react/#/gauge)|[![picassoRangeAreaChart](../../assets/picassoRangeAreaChart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-range-area-chart)|[![picassoVerticalBarchart](../../assets/picassoVerticalBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-vertical-group-barchart)|

---

Since we have made all elements into individual components, you can create custom charts by mixing components like boxes and lines

| [Custom Combo Chart](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-combo-chart) | [Custom Group Barchart](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-vertical-group-barchart) |
| :----:                            |    :----:                     |
| [![picassoCustomChart](../../assets/picassoCustomChart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-combo-chart)| [![picassoCustomGroupBarchart](../../assets/picassoCustomGroupBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-vertical-group-barchart) |
