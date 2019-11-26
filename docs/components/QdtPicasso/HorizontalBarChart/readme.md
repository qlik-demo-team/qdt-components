# Horizontal Bar Chart

![Horizontal Bar Chart](../assets/picassoHorizontalBarchart.png)

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
  "QdtPicasso", 
  {
    type: 'horizontalBarchart', 
    cols: [
      'Champion_Full',
      "=Sum(if(Club = [Champion], [Total Compensation]))"
    ], 
    outerHeight: 400,
  }, 
  element
);
```

### React

```jsx
const chart_options = {
  type: 'QdtPicasso',
  props: {
      type: 'horizontalBarchart', 
      cols: [
        'Champion_Full',
        "=Sum(if(Club = [Champion], [Total Compensation]))"
      ], 
      outerHeight: 400,
  },
};

const PicassoBarChart = () => (
  <div className="picasso-bar">
    <QdtComponent {...chart_options} />
  </div>
)

const App = () => {
    return (
        <main>
            <PicassoBarChart />
        </main>
    )
}

render(<App />, document.getElementById('root'));
```

### Angular

```js
// horizontal-barchart.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'picasso-horizontal-barchart',
  templateUrl: './picasso-horizontal-barchart.component.html',
})
export class PicassoHorizontalBarchartComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtPicasso',
    props: {
        type: 'horizontalBarchart', 
        cols: [
          'Champion_Full',
          "=Sum(if(Club = [Champion], [Total Compensation]))"
        ], 
        outerHeight: 400,
    },
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<picasso-horizontal-barchart [Component]="chart_options.type" [props]="chart_options.props"></picasso-horizontal-barchart>
```




[← QdtPicasso](../)

