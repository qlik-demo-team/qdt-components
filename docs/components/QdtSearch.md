## QdtSelectionToolbar

![QdtSelectionToolbar](../assets/selectionToolbar.png?raw=true "QdtSelectionToolbar")


This creates a search input field based on [Leonardo UI - input](https://qlik-oss.github.io/leonardo-ui/input.html).
* Tooltips are also based on [Leonardo UI - Tooltip](https://qlik-oss.github.io/leonardo-ui/tooltip.html)
* [Live Example](https://webapps.qlik.com/qdt-components/react/index.html#/search).

### Html Code

```
<QdtComponent
  type="QdtSelectionToolbar"
  props={{
    cols: ['Case Owner'], 
    options: { 
      placeholder: 'Search Case Owner' 
    },
  }}
/>
```

### Properties

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| cols             | Array         | `[dimension]` |
| invert           | Boolean       | false         |
| placeholder      | String        | `Search for`  |
| tooltipDock      | String        | `'top', 'right', 'bottom', 'left' `|
| tooltipContent   | String        | `<h5>Tooltip Header</h5> more content here.` |
| showGo           | Boolean       | false         |


#### Live [https://qdt-apps.qlik.com/qdt-components/react/#/search](https://qdt-apps.qlik.com/qdt-components/react/#/search)