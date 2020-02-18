# QdtMapBox: *Create a map with layers using MapBox*

![QdtMapBox](../assets/picassoMapbox.png "QdtMapBox")

- `QdtMapBox` allows you to create a MapBox map and layer(s). 
- See the [MapBox Api Docs](https://docs.mapbox.com/mapbox-gl-js/overview/) for more information on MapBox and to get your access token

## Properties

| prop               | type      | default        | description   |
| ------------------ | --------- | -------------- | ------------- |
| cols               | Array     | `[]`           | Define the dimensions like `[id],[lat],[lon],[field]` |
| accessToken        | String    | `pk.eyJ1IjoiYXJ0dXJvbXVub3oiLCJhIjoiY2swODR2NmlhNDYwaDNicDBlcnB6YmR0OSJ9.AgG7MN8DX1aFuG1DfbFr_Q` | Your MapBox access token  |
| style              | String    | `mapbox://styles/mapbox/streets-v11` | Your MapBox style | 
| center             | Array     | `[-74.50, 40]` | The lat and long of the center of your map |
| zoom               | Int       | `4`            | The zoom level of the map |
| pitch              | Int       | `0`            | The camera angle |
| bearing            | Int       | `0`            | The compass direction, in degrees |
| height             | Int       | `400`          | Define the height of your div in pixels |
| getData            | Function  |  `null`        | Define a callback so you can work with the map or the data after the dom is drawn`const callback = (qData, qLayout) => {}` |
| getAllDataInterval | Int       | `0`            | Seconds to paginate through all data |
| extraLayers        | Array     | `null`         | Pass your own layers |
| createLayers       | Boolea    | `true`         | Set `false` if you want to disable the creation of layers. In combination with the `extraLayers` prop, you can only show your custom layers |

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