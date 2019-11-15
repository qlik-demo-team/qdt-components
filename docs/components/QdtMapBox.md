## Create a map with layers using MapBox

![QdtMapBox](../assets/picassoMapbox.png "QdtMapBox")

[MapBox Api Docs](https://docs.mapbox.com/mapbox-gl-js/overview/)

### Html Code

```
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

### Properties

| prop               | type          | description   |
| ------------------ | ------------- | ------------- |
| cols               | Array         | `[id],[lat],[lon],[field]` |
| accessToken        | String        | `pk.eyJ1IjoiYXJ0dXJvbXVub3oiLCJhIjoiY2swODR2NmlhNDYwaDNicDBlcnB6YmR0OSJ9.AgG7MN8DX1aFuG1DfbFr_Q`  |
| style              | String        | `mapbox://styles/mapbox/streets-v11`  |
| center             | Array         | `[-74.50, 40]`  |
| zoom               | Int           | `4`             |
| height             | Int           | `400`           |
| getData            | Function      | const callback = (qData, qLayout) => {}           |
| getAllDataInterval | Int           | `1` Seconds to paginate through all data           |

#### Live [https://qdt-apps.qlik.com/qdt-components/react/#/mapbox](https://qdt-apps.qlik.com/qdt-components/react/#/mapbox)