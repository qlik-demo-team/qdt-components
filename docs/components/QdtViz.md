# QdtViz: *Get a Visualization from Qlik Sense*

![QdtViz](../assets/embedded.png?raw=true "QdtViz")

- This component can be used to create or get a native Qlik Sense vizualization. There are two primary ways to do this:
  - **Get Existing:** If you define the `id` prop, then it will get that Qlik Sense vizualization.
  - **Create New:** If you define the `type`, `cols`, and `options` props it will create a new vizualization. 
- The `width` and `height` props are both optional, and default to '100%'.
- The `QdtViz` Component uses the [Capability Api - getObject](https://help.qlik.com/en-US/sense-developer/November2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/AppAPI/getObject-method.htm)
method

## Properties

 prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| id               | String        | Id for an existing visualization |
| type             | String        | [see here][vizApiCreate] |
| cols             | Array         | [see here][vizApiCreate] |
| options          | Object        | [see here][vizApiCreate] |
| width            | String        | Sets width of viz |
| height           | String        | Sets height of viz |
| exportData       | Boolean       | Show button for export in CSV |
| exportDataTitle  | String        | Optional. Set the button title. Defaults to `Export Data`  |
| eportDataOptions | Object        | [see here][exportData]. Defaults to `{ format: 'CSV_T', state: 'P' }` |
| exportImg        | Boolean       | Show button for export in JPG |
| exportImgTitle   | String        | Optional. Set the button title. Defaults to `Export Image`  |
| eportImgOptions  | Object        | [see here][exportImg]. Defaults to `{ width: 300, height: 400, format: 'JPG' }` |
| exportPdf        | Boolean       | Show button for export in PDF |
| exportPdfTitle   | String        | Optional. Set the button title. Defaults to `Export Pdf`  |
| eportPdfOptions  | Object        | [see here][exportPdf]. Default to `{ documentSize: 'A4', orientation: 'landscape', aspectRatio: 2 }` |       |

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


#### [Live Example](https://qdt-apps.qlik.com/qdt-components/react/#/embed-object)

#### [Embed Objects from Multiple Apps](https://qdt-apps.qlik.com/qdt-components/react/#/embed-object-multi-app)

#### [Create a Session Object](https://qdt-apps.qlik.com/qdt-components/react/#/session-object)

---

[← Back to All Components](https://github.com/qlik-demo-team/qdt-components#components)