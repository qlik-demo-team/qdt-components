# QdtFilter: *Dropdown or List Filter Component*

![QdtFilter](../assets/filters.png?raw=true "QdtFilter")

- This component creates a custom filter dropdown. If `cols` is defined, `qListObjectDef` will be ignored.

## Properties

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| cols             | Array         | [see here][cols] |
| qListObjectDef   | Object        | [see here][qListObjectDef] |
| single           | Boolean       | Default `false`. For single selections |
| placeholder      | String        | Default `DropDown` |
| expanded         | Boolean       | Default `false`. For a list-like menu instead of a dropdown |
| expandedHorizontal| Boolean      | Default `false`. For a horizontal menu |
| expandedHorizontalSense| Boolean | Default `true`. For a Qlik Sense-style selections look and feel; `false` for regular tabs |
| autoSortByState  | Number        | Default `1`. [see here](https://help.qlik.com/en-US/sense-developer/June2018/APIs/EngineAPI/genericobject-property-ListObjectDef.html) |


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
  "QdtFilter", 
  {
    cols: ['Case Owner Group'],
    placeholder: 'Case Owner Group',
    single: true,
    autoSortByState: 0,
    showStateInDropdown: true,
  }, 
  element
);
```

### React

```jsx
<QdtComponent
  type="QdtFilter"
  props={{
    cols: ['Case Owner Group'],
    placeholder: 'Case Owner Group',
    single: true,
    autoSortByState: 0,
    showStateInDropdown: true,
  }}
/>
```

### Angular

```js
// qdt-filter.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'qdt-filter',
  templateUrl: './qdt-filter.component.html',
})
export class QdtFilterComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtFilter',
    props: {
      cols: ['Case Owner Group'],
      placeholder: 'Case Owner Group',
      single: true,
      autoSortByState: 0,
      showStateInDropdown: true,
    },
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<qdt-filter [Component]="chart_options.type" [props]="chart_options.props"></qdt-filter>
```

## Examples

- [https://qdt-apps.qlik.com/qdt-components/react/#/filters](https://qdt-apps.qlik.com/qdt-components/react/#/filters) (React)

---

[← Back to All Components](https://github.com/qlik-demo-team/qdt-components#components)