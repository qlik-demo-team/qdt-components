# QdtFilter: *Dropdown or List Filter Component*

![QdtFilter](../assets/filters.png?raw=true "QdtFilter")

- This creates a custom filter dropdown. If `cols` is defined, `qListObjectDef` will be ignored.

## Properties

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| cols             | Array         | [see here][cols] |
| qListObjectDef   | Object        | [see here][qListObjectDef] |
| single           | Boolean       | Default `false`. For single selections |
| placeholder      | String        | Default `DropDown` |
| expanded         | Boolean       | Default `false`. For a list like menu instead of a dropdown |
| expandedHorizontal| Boolean      | Default `false`. For a horizontal menu |
| expandedHorizontalSense| Boolean | Default `true`. For a Qlik sense style selections look and feel. If `false` then they are regular tabs |
| autoSortByState  | Number        | Default `1`. [see here][https://help.qlik.com/en-US/sense-developer/June2018/APIs/EngineAPI/genericobject-property-ListObjectDef.html] |


[vizApiCreate]: https://help.qlik.com/en-US/sense-developer/February2018/Subsystems/APIs/Content/CapabilityAPIs/VisualizationAPI/create-method.htm
[cols]: https://help.qlik.com/en-US/sense-developer/February2018/Subsystems/APIs/Content/CapabilityAPIs/VisualizationAPI/columns.htm
[qListObjectDef]: https://help.qlik.com/en-US/sense-developer/February2018/Subsystems/EngineAPI/Content/GenericObject/PropertyLevel/ListObjectDef.htm
[exportData]: https://help.qlik.com/en-US/sense-developer/September2018/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/exportData-method.htm
[exportImg]: https://help.qlik.com/en-US/sense-developer/September2018/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/exportImg-method.htm
[exportPdf]: https://help.qlik.com/en-US/sense-developer/September2018/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/exportPdf-method.htm

## Code

### Vanilla JavaScript

### React

```jsx
<QdtComponent
  type="QdtViz"
  props={{
    type: 'barchart',
    id: 'a5e0f12c-38f5-4da9-8f3f-0e4566b28398',
    height: '300px',
    exportData: true,
    exportImg: true,
    exportImgOptions: { width: 600, height: 400, format: 'JPG' },
    exportPdf: true,
    exportPdfOptions: { documentSize: { width: 300, height: 150 } },
  }}
/>
```

### Angular

## Examples

#### [Live](https://qdt-apps.qlik.com/qdt-components/react/#/filters)

---

[← Back to All Components](https://github.com/qlik-demo-team/qdt-components#components)