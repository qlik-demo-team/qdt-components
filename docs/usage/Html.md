## Using qdt-components with a simple html page

This is a guide on how you can use qdt-components on a simple html page.

- [Live Demo](https://webapps.qlik.com/qdt-components/plain-html/index.html)
- [Live Demo with Source Code](https://observablehq.com/collection/@yianni-ververis/qdt-components)
- Download the [latest build](../blob/master/dist/qdt-components.js)
- Add the Html
```html
<head>
  <script type="text/javascript" src="qdt-components.js"></script>
</head>
<body>
  <div id="qdt1" style="width: 100%; height: 50px;"></div>
  <div id="qdt2" style="width: 100%; height: 400px;"></div>
</body>
```
- Add the Javascript
```javascript
<script type="text/javascript">
  const config = {
    host: "yourdomain.com",
    secure: true,
    port: 443,
    prefix: "",
    appId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx",
    webIntegrationId, // SaaS webIntegrationId
    token // SaaS auth JWT token
  }
  const { qdtEnigma, qdtCompose, QdtSelections, QdtPicasso, useBarChartSettings } = window.QdtComponents;
  qdtEnigma(config)
    .then(app => {
      qdtCompose({
        element: document.getElementById('qdt1'),
        component: QdtSelections,
        app: app,
        options: {},
        properties: {
          qSelectionObjectDef: {},
        }
      });

      // Barchart
      qdtCompose({
        element: document.getElementById('qdt2'),
        component: QdtPicasso,
        app,
        options: {
          settings: useBarChartSettings({
            orientation: 'horizontal',
          }),
          height: 400,
        },
        properties: {
          qHyperCubeDef: {
            qDimensions: [
              { qDef: { qFieldDefs: ['Case Owner Group'] }, qNullSuppression: true },
            ],
            qMeasures: [
              { qDef: { qDef: 'Avg([Case Duration Time])', autoSort: false }, qSortBy: { qSortByNumeric: -1 } },
            ],
            qInterColumnSortOrder: [1, 0],
          },
        }
      });

    })
</script>
```

### Template
[https://github.com/qlik-demo-team/qdt-html-template](https://github.com/qlik-demo-team/qdt-html-template)