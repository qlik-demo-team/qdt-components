# QdtMapBox: *Create a map with layers using MapBox*

![QdtMapBox](../assets/picassoMapbox.png "QdtMapBox")

- `QdtMapBox` allows you to create a Map and MapBox layer(s). 
- See the [MapBox Api Docs](https://docs.mapbox.com/mapbox-gl-js/overview/) for more information on MapBox and to get your access token

## Properties

| prop               | type          | description   |
| ------------------ | ------------- | ------------- |
| cols               | Array         | `[id],[lat],[lon],[field]` |
| accessToken        | String        | `pk.eyJ1IjoiYXJ0dXJvbXVub3oiLCJhIjoiY2swODR2NmlhNDYwaDNicDBlcnB6YmR0OSJ9.AgG7MN8DX1aFuG1DfbFr_Q`  |
| style              | String        | `mapbox://styles/mapbox/streets-v11`  |
| center             | Array         | `[-74.50, 40]`  |
| zoom               | Int           | `4`             |
| height             | Int           | `400`           |
| getData            | Function      | `const callback = (qData, qLayout) => {}`           |
| getAllDataInterval | Int           | `1` Seconds to paginate through all data           |

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
  "QdtMapBox", 
  {
    mapToken: 'pk.eyJ1IjoiYXJ0dXJvbXVub3oiLCJhIjoiY2swODR2NmlhNDYwaDNicDBlcnB6YmR0OSJ9.AgG7MN8DX1aFuG1DfbFr_Q',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: -74.50, 40],
    zoom: 4,
    interactive: false,
    circleRadius: 2,
    cols: ['ID', 'lat', 'lon', 'gender'],
    height: 400,
    getData: callback,
    getAllDataInterval: 10, // Get data In Seconds
    qPage: {
      qTop: 0,
      qLeft: 0,
      qWidth: 4,
      qHeight: 2500,
    },
    legend: false,
  }, 
  element
);
```

### React

```jsx
<QdtComponent
  type="QdtMapBox"
  props={{
    mapToken: 'pk.eyJ1IjoiYXJ0dXJvbXVub3oiLCJhIjoiY2swODR2NmlhNDYwaDNicDBlcnB6YmR0OSJ9.AgG7MN8DX1aFuG1DfbFr_Q',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: -74.50, 40],
    zoom: 4,
    interactive: false,
    circleRadius: 2,
    cols: ['ID', 'lat', 'lon', 'gender'],
    height: 400,
    getData: callback,
    getAllDataInterval: 10, // Get data In Seconds
    qPage: {
      qTop: 0,
      qLeft: 0,
      qWidth: 4,
      qHeight: 2500,
    },
    legend: false,
  }}
/>
```
### Angular

```js
// qdt-mapbox.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'qdt-mapbox',
  templateUrl: './qdt-mapbox.component.html',
})
export class QdtMapBoxComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtMapBox',
    props: {
      mapToken: 'pk.eyJ1IjoiYXJ0dXJvbXVub3oiLCJhIjoiY2swODR2NmlhNDYwaDNicDBlcnB6YmR0OSJ9.AgG7MN8DX1aFuG1DfbFr_Q',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: -74.50, 40],
      zoom: 4,
      interactive: false,
      circleRadius: 2,
      cols: ['ID', 'lat', 'lon', 'gender'],
      height: 400,
      getData: callback,
      getAllDataInterval: 10, // Get data In Seconds
      qPage: {
        qTop: 0,
        qLeft: 0,
        qWidth: 4,
        qHeight: 2500,
      },
      legend: false,
    },
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<qdt-mapbox [Component]="chart_options.type" [props]="chart_options.props"></qdt-mapbox>
```

## Examples

- [https://qdt-apps.qlik.com/qdt-components/react/#/mapbox](https://qdt-apps.qlik.com/qdt-components/react/#/mapbox)

---

[← Back to All Components](https://github.com/qlik-demo-team/qdt-components#components)