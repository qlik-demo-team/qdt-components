## Create a chart from the Engine Api

Set of charts created from the Engine Api and [Picasso.js](https://picassojs.com/).

### Properties

| prop             | type          | description   |
| :---: | :---: | :--- |
| type             | String        | `comboLineBarchart`, `horizontalBarchart`, `lineChart`, `multiLineChart`, `pie`, `piechart`, `scatterplot`, `verticalBarchart`, `stackedBarchart`, `verticalGauge`, `verticalRangeGauge`, `rangeArea`, `verticalGroupBarchart` |
| cols             | Array         | `[dimension, measure]` |
| options          | Object        | `color` |
| prio             | String        | `canvas` or `svg`. If omitted, it defaults to canvas |

### HTML (and Vanilla JavaScript)

- See the [HTML Template](https://github.com/qlik-demo-team/qdt-components/blob/master/docs/usage/Html.md) for the
basic page setup. The two main items are:
  - qdt-components.js `<script>` tag in the `<head>` 
  - root HTML element in the `<body>` with desired id; example: `<div id="qdt1"></div>`
- Here is a simple example of the JavaScript required

```js
// main.js

// ============
// configuration options for qdtComponents; see template link above for specifics
var options = {
  config: { /* host, port, appid, etc. */ },
  connections: { /* vizApi, engineAPI */}
}

// ============
// #1: Instantiate new instance of QdtComponents
var qdtComponents = new QdtComponents(options.config, options.connections);

// ============
// #2: select element where you'll be placing the Picasso chart
var element = document.getElementById('qdt1');

// ============
// #3: render the chart
qdtComponents.render(
  "QdtPicasso", 
  {
    type: 'verticalBarchart', 
    cols: [
      'Champion_Full',
      "=Sum(if(Club = [Champion], [Total Compensation]))"
    ], 
    outerHeight: 400,
  }, 
  element
);
```


### React (JSX)

```jsx
<QdtComponent
  type="QdtPicasso"
  props={{
    type: 'horizontalBarchart', 
    cols: ['Case Owner Group', '=Avg([Case Duration Time])'], 
    outerHeight: 300,
  }}
/>
```

### Angular


|[Horizontal Barchart](./HorizontalBarChart)|[Vertical Barchart](./VerticalBarChart)|[Pie Chart](./PieChart)|[Scatterplot](./ScatterplotChart)|[Line Chart](./LineChart)|
|:---:|:---:|:---:|:---:|:---:|
|[![picassoHorizontalBarchart](./assets/picassoHorizontalBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-horizontal-barchart)|[![picassoVerticalBarchart](./assets/picassoVerticalBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-vertical-barchart)|[![picassoPie](./assets/picassoPie.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-pie-chart)|[![picassoScotterplot](./assets/picassoScotterplot.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-scatterplot)|[![picassoLinechart](./assets/picassoLinechart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-line-chart)|

|[Multi-Line Chart](./MultiLineChart)|[Stacked Bar Chart](./StackedBarChart)|[Gauge](./Gauge)|[Range Area](./RangeArea)|[Vertical Group Bar Chart](./VerticalGroupBarChart)|
|:---:|:---:|:---:|:---:|:---:|
|[![picassoMultiLinechart](./assets/picassoMultiLinechart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-multi-line-chart)|[![picassoStackedBarchart](./assets/picassoStackedBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/stacked-barchart)|[![gauge](./assets/gauge.png)](https://qdt-apps.qlik.com/qdt-components/react/#/gauge)|[![picassoRangeAreaChart](./assets/picassoRangeAreaChart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-range-area-chart)|[![picassoVerticalBarchart](./assets/picassoVerticalBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-vertical-group-barchart)|

---

Since we have made all elements into individual components, you can create custom charts by mixing components like boxes and lines

| [Custom Combo Chart](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-combo-chart) | [Custom Group Barchart](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-vertical-group-barchart) |
| :----:                            |    :----:                     |
| [![picassoCustomChart](./assets/picassoCustomChart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-combo-chart)| [![picassoCustomGroupBarchart](./assets/picassoCustomGroupBarchart.png)](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-custom-vertical-group-barchart) |
