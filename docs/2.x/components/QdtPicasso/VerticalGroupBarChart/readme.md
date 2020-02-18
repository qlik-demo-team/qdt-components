# Vertical Group Bar Chart

![Vertical Group Bar Chart](../assets/picassoVerticalBarchart.png)

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
  'verticalGroupBarchart',
  {
    type: 'stackedBarchart',
    cols: [
      'Case Owner Group',
      "=Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )",
      "=Count( {$<Priority={'Medium'}, Status -={'Closed'} >} Distinct %CaseId)",
    ],
    outerHeight: 300,
  }, 
  element
);
```

### React

```jsx
const chart_options = {
  type: 'verticalGroupBarchart',
  props: {
    type: 'stackedBarchart',
    cols: [
      'Case Owner Group',
      "=Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )",
      "=Count( {$<Priority={'Medium'}, Status -={'Closed'} >} Distinct %CaseId)",
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
// vertical-grouped-bar.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'picasso-vertical-grouped-bar',
  templateUrl: './picasso-vertical-grouped-bar.component.html',
})
export class PicassoStackedBarChartComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'verticalGroupBarchart',
    props: {
      type: 'stackedBarchart',
      cols: [
        'Case Owner Group',
        "=Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )",
        "=Count( {$<Priority={'Medium'}, Status -={'Closed'} >} Distinct %CaseId)",
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
<picasso-vertical-grouped-bar [Component]="chart_options.type" [props]="chart_options.props"></picasso-vertical-grouped-bar>
```


[← QdtPicasso](../)