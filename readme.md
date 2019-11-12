![Banner](assets/graphic.png "Banner") 

[![latest npm badge](https://img.shields.io/npm/v/qdt-components/latest.svg)](https://www.npmjs.com/package/qdt-components) [![Greenkeeper badge](https://badges.greenkeeper.io/qlik-demo-team/qdt-components.svg)](https://greenkeeper.io/)

# Qdt (aka Qlik Demo Team) Components

- Qlik-powered components built by the Qlik Demo Team. For use with simple html, Angular6, React 16 and Vue 2

### Installation
- `npm install --save qdt-components`

### Live Demo with the latest additions
- https://qdt-apps.qlik.com/qdt-components/react/

### Usage

#### Simple Html
- [Live Demo](https://webapps.qlik.com/qdt-components/plain-html/index.html)
- Download the [latest build](../blob/master/dist/qdt-components.js)
- Add the Html
```html
<head>
  <script type="text/javascript" src="qdt-components.js"></script>
</head>
<body>
  <qdt-component id="qdt1"></qdt-component>
</body>
```
- Add the Javascript
```javascript
<script type="text/javascript">
  var options = {
    config: {
      host: "sense-demo.qlik.com",
      secure: true,
      port: 443,
      prefix: "",
      appId: "133dab5d-8f56-4d40-b3e0-a6b401391bde"
    },
    connections: { 
      vizApi: true, 
      engineApi: true 
    }
  }
  var qdtComponents = new QdtComponents(options.config, options.connections);
  var element = document.getElementById('qdt1');
  qdtComponents.render('QdtViz', {id: 'a5e0f12c-38f5-4da9-8f3f-0e4566b28398', height:'300px'}, element);
</script>
```

#### Angular 6 (cli)
- [Live Demo](https://webapps.qlik.com/qdt-components/angular/index.html)
- `npm install --save qdt-components`
- create an Angular 6 component that implements qdt-components
```javascript
import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import QdtComponents from 'qdt-components';

const options = {
  config: {
    host: "sense-demo.qlik.com",
    secure: true,
    port: 443,
    prefix: "",
    appId: "133dab5d-8f56-4d40-b3e0-a6b401391bde"
  },
  connections: { 
    vizApi: true, 
    engineApi: true 
  }
}

const qdtComponents = new QdtComponents(options.config, options.connections);

@Component({
  selector: 'qdt-component',
  templateUrl: './qdt-component.component.html',
  styleUrls: ['./qdt-component.component.less']
})
export class QdtComponent implements OnInit, OnDestroy {

  @Input() type: string;
  @Input() props: object;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    qdtComponents.render(this.type, this.props, this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    QdtComponents.unmountQdtComponent(this.elementRef.nativeElement)
  }
}
```

#### React
- [Live Demo](https://webapps.qlik.com/qdt-components/react/index.html)
- `npm install --save qdt-components`
- create a React component that implements qdt-components
```javascript
import React from 'react';
import PropTypes from 'prop-types';
import QdtComponents from 'qdt-components';

const options = {
  config: {
    host: "sense-demo.qlik.com",
    secure: true,
    port: 443,
    prefix: "",
    appId: "133dab5d-8f56-4d40-b3e0-a6b401391bde"
  },
  connections: { 
    vizApi: true, 
    engineApi: true 
  }
}

const qdtComponents = new QdtComponents(options.config, options.connections);

export default class QdtComponent extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { type, props } = this.props;
    qdtComponents.render(type, props, this.node);
  }

  componentWillUnmount() {
    QdtComponents.unmountQdtComponent(this.node)
  }

  render() {
    return (
      <div ref={(node) => { this.node = node; }} />
    );
  }
}
```

#### Vue
- [Live Demo](https://webapps.qlik.com/qdt-components/react/index.html)
- [Git](https://github.com/qlik-demo-team/qdt-vue-template)


### Component Docs ###

#### QdtViz
This component can be used to create or get a native Qlik Sense viz. If you define the `id` prop, then it will get that Qlik Sense viz. If you define the `type`, `cols`, and `options` props it will create a new viz. The `width` and `height` props are both optional, and default to '100%'.

| prop             | type          | description   |
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
| eportPdfOptions  | Object        | [see here][exportPdf]. Default to `{ documentSize: 'A4', orientation: 'landscape', aspectRatio: 2 }` |

#### QdtFilter
This creates a custom filter dropdown. If `cols` is defined, `qListObjectDef` will be ignored.

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

#### QdtSelectionToolbar
This populated a toolbar with the current app selections.
* [Live Example](https://webapps.qlik.com/qdt-components/plain-html/picasso-horizontalbarchart.html).

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| title            | String        | `SELECTIONS`  |
| btnText          | String        | `Clear All `  |

#### QdtBarchart
This creates a barchart based on [Picasso.js](https://picassojs.com/).
* [Live Example](https://webapps.qlik.com/qdt-components/plain-html/picasso-horizontalbarchart.html).

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| type             | String        | `horizontal` |
| cols             | Array         | `[dimension, measure]` |
| options          | Object        | `barcolor` |
| width            | String        | Sets width of viz, default 100% |
| height           | String        | Sets height of viz, default 100% |

#### QdtPicasso
This creates a Line Chart based on [Picasso.js](https://picassojs.com/).
* [Live Example](https://webapps.qlik.com/qdt-components/react/index.html#/picasso-line-chart).

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| type             | String        | `comboLineBarchart`, `horizontalBarchart`, `lineChart`, `multiLineChart`, `pie`, `piechart`, `scatterplot`, `verticalBarchart`, `stackedBarchart`, `verticalGauge`, `verticalRangeGauge`, `rangeArea`, `verticalGroupBarchart` |
| cols             | Array         | `[dimension, measure]` |
| options          | Object        | `color` |
| prio             | String        | `canvas` or `svg`. If omitted, it defaults to canvas |

#### QdtSearch
This creates a search input field based on [Leonardo UI - input](https://qlik-oss.github.io/leonardo-ui/input.html).
* Tooltips are also based on [Leonardo UI - Tooltip](https://qlik-oss.github.io/leonardo-ui/tooltip.html)
* [Live Example](https://webapps.qlik.com/qdt-components/react/index.html#/search).

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| cols             | Array         | `[dimension]` |
| invert           | Boolean       | false         |
| placeholder      | String        | `Search for`  |
| tooltipDock      | String        | `'top', 'right', 'bottom', 'left' `|
| tooltipContent   | String        | `<h5>Tooltip Header</h5> more content here.` |
| showGo           | Boolean       | false         |

#### QdtMapBox
Create a map with layers using MapBox

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| cols             | Array         | `[id],[lat],[lon],[field]` |
| accessToken      | String        | `pk.eyJ1IjoiYXJ0dXJvbXVub3oiLCJhIjoiY2swODR2NmlhNDYwaDNicDBlcnB6YmR0OSJ9.AgG7MN8DX1aFuG1DfbFr_Q`  |
| style            | String        | `mapbox://styles/mapbox/streets-v11`  |
| center           | Array         | `[-74.50, 40]`  |
| zoom             | Int           | `4`             |
| height           | Int           | `400`             |

### Version Log
- 2.1.0   Add mapbox
- 2.0.0   Rewrite with hooks
- 1.3.13  Adapt for Qlik Core scaling https://github.com/qlik-oss/core-scaling
- 1.3.12  Expose globals like qlik and qlik.resize() so they can be used in mashups like 
          `const globals = QdtComponents.globals`
- 1.3.11  Add Qlik color palette
- 1.3.10  Fix the download url for the exportData img and pdf
- 1.3.9   Fixes for the picasso horizontal bar chart
          Add qInterColumnSortOrder, qSuppressZero, qSortByNumeric in the withHyperCube
          Update picasso to 0.15.0 (Fixed many tooltip and selection issues).
- 1.3.8   Add export button(s) the visualization from the Capability API to Csv, Image and Pdf
- 1.3.7   Abort all selections before beginSelections is called to avoid errors on more than one components on the same page.
          Bumpup qdt-lui.
- 1.3.6   QdtFilter - Add sorting by Ascii and LoadOrder
- 1.3.5   QdtFilter UI changes. Placeholder with selectionson the dropdown
- 1.3.4   Add qSortByLoadOrder in the withListObject. 
          Fix QdtFilter on single selection to close the dropDown and add the selection in the placeholder. 
          Various css ui changes
- 1.3.3   Fix Gauge labels and range area point stroke
- 1.3.2   Expose Interactions to the Dom.
- 1.3.1   Add Theme coloring for picasso charts.
- 1.3.0   Bump up Picasso.js.
          Change the tooltip to the new one from Picasso. 
          Break Picasso settings into reusable components and expose them to the Dom.
- 1.2.1   bumpup qdt-lui to include the tabset.
- 1.2.0   QdtFilter - add tabset for horizontal menu.
- 1.1.70  QdtPicasso - add rangeArea chart
- 1.1.69  QdtPicasso - add prio prop for rendering svg. It defaults to canvas
- 1.1.68  Better unmount handling thnx to @humean (Michael Rutter)
- 1.1.67  Add Vertical Bar Gauge
- 1.1.66  Add Vertical Bar Gauge with Range Limits
