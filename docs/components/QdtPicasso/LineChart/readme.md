# Line Chart

![Line Chart](../assets/picassoLinechart.png)

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
    type: 'lineChart',
    cols: [
      'Date.autoCalendar.YearMonth',
      '=Sum([Number of New Cases])'
    ],
    height: 300,
  }, 
  element
);
```

### React

```jsx
const chart_options = {
  type: 'QdtPicasso',
  props: {
    type: 'lineChart',
    cols: [
      'Date.autoCalendar.YearMonth',
      '=Sum([Number of New Cases])'
    ],
    height: 300,
  }
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
// line-chart.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'picasso-line-chart',
  templateUrl: './picasso-line-chart.component.html',
})
export class PicassoLinechartComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtPicasso',
    props: {
      type: 'lineChart',
      cols: [
        'Date.autoCalendar.YearMonth',
        '=Sum([Number of New Cases])'
      ],
      height: 300,
    }
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<picasso-line-chart [Component]="chart_options.type" [props]="chart_options.props"></picasso-line-chart>
```


[← QdtPicasso](../)