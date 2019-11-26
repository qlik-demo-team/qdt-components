# Stacked Bar Chart

![Stacked Bar Chart](../assets/picassoStackedBarchart.png)

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
    type: 'stackedBarchart',
    cols: [
      'Case Owner Group',
      'Priority',
      '=Count(Distinct [%CaseId])'
    ],
    outerHeight: 300,
  }, 
  element
);
```

### React

```jsx
const chart_options = {
  type: 'QdtPicasso',
  props: {
    type: 'stackedBarchart',
    cols: [
      'Case Owner Group',
      'Priority',
      '=Count(Distinct [%CaseId])'
    ],
    outerHeight: 300,
  },
};

const App = () => {
    return (
        <main>
            <QdtComponent {...chart_options} />
        </main>
    )
}

render(<App />, document.getElementById('root'));
```

### Angular

```js
// stacked-barchart.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'picasso-stacked-barchart',
  templateUrl: './picasso-stacked-barchart.component.html',
})
export class PicassoStackedBarChartComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtPicasso',
    props: {
      type: 'stackedBarchart',
      cols: [
        'Case Owner Group',
        'Priority',
        '=Count(Distinct [%CaseId])'
      ],
      outerHeight: 300,
    },
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<picasso-stacked-barchart [Component]="chart_options.type" [props]="chart_options.props"></picasso-stacked-barchart>
```

[← QdtPicasso](../)