## Create a chart from the Engine Api

Set of charts created from the Engine Api and [Picasso.js](https://picassojs.com/).

### Properties

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| type             | String        | `comboLineBarchart`, `horizontalBarchart`, `lineChart`, `multiLineChart`, `pie`, `piechart`, `scatterplot`, `verticalBarchart`, `stackedBarchart`, `verticalGauge`, `verticalRangeGauge`, `rangeArea`, `verticalGroupBarchart` |
| cols             | Array         | `[dimension, measure]` |
| options          | Object        | `color` |
| prio             | String        | `canvas` or `svg`. If omitted, it defaults to canvas |


## Horizontal Barchart



### Html Code

```
<QdtComponent
  type="QdtPicasso"
  props={{
  }}
/>
```

#### [Live](https://qdt-apps.qlik.com/qdt-components/react/#/picasso-horizontal-barchart)

| Picasso Horizontal Barchart       | Picasso Vertical Barchart     |
| :----:                            |    :----:                     |
| ![picassoHorizontalBarchart](../assets/picassoHorizontalBarchart.png?raw=true "picassoHorizontalBarchart")| ![picassoVerticalBarchart](../assets/picassoVerticalBarchart.png?raw=true "picassoVerticalBarchart") |
