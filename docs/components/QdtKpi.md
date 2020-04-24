# QdtKpi

![QdtKpi](../assets/kpi.png "QdtKpi")

- This component creates a custom KPI (key performance indicator) that you can then style to fit your mashup.

## Properties

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| cols             | Array         | [see here][cols] |


[vizApiCreate]: https://help.qlik.com/en-US/sense-developer/February2018/Subsystems/APIs/Content/CapabilityAPIs/VisualizationAPI/create-method.htm
[cols]: https://help.qlik.com/en-US/sense-developer/February2018/Subsystems/APIs/Content/CapabilityAPIs/VisualizationAPI/columns.htm
[qListObjectDef]: https://help.qlik.com/en-US/sense-developer/February2018/Subsystems/EngineAPI/Content/GenericObject/PropertyLevel/ListObjectDef.htm
[exportData]: https://help.qlik.com/en-US/sense-developer/September2018/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/exportData-method.htm
[exportImg]: https://help.qlik.com/en-US/sense-developer/September2018/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/exportImg-method.htm
[exportPdf]: https://help.qlik.com/en-US/sense-developer/September2018/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/exportPdf-method.htm

## Code

### Vanilla JavaScript

- See the [HTML Template](https://github.com/qlik-demo-team/qdt-components/blob/master/docs/usage/Html.md) for the
basic page setup. 

```js
var options = {
  config: { /* host, port, appid, etc. */ },
  connections: { /* vizApi, engineAPI */}
}

var qdtComponents = new QdtComponents(options.config, options.connections);

var element = document.getElementById('qdt1');

qdtComponents.render(
  "QdtKpi", 
  {
    cols: [`=Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )`],
  }, 
  element
);
```

### React

```jsx
<QdtComponent
  type="QdtKpi"
  props={{
    cols: [`=Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )`],
  }}
/>
```

### Angular

```js
// qdt-kpi.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'qdt-kpi',
  templateUrl: './qdt-kpi.component.html',
})
export class QdtKpiComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtKpi',
    props: {
      cols: [`=Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )`],
    },
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<qdt-kpi [Component]="chart_options.type" [props]="chart_options.props"></qdt-kpi>
```

## Examples

- [https://qdt-apps.qlik.com/qdt-components/react/#/kpi](https://qdt-apps.qlik.com/qdt-components/react/#/kpi) (React)

---

[← Back to All Components](https://github.com/qlik-demo-team/qdt-components#components)