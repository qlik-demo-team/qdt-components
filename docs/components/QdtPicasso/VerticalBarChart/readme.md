# Vertical Bar Chart

![Vertical Bar Chart](../assets/picassoVerticalBarchart.png)

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
    type: 'verticalBarchart', 
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
      type: 'verticalBarchart', 
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

```ts
// vertical-barchart.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'picasso-vertical-barchart',
  templateUrl: './picasso-vertical-barchart.component.html',
  styleUrls: ['./picasso-vertical-barchart.component.css']
})
export class PicassoVerticalBarchartComponent implements OnInit {

	constructor(private el: ElementRef) { }

	chart_options = {
    type: 'QdtPicasso',
    props: {
      type: 'verticalBarchart',
      cols: ['Priority', '=Count(Distinct [%CaseId])'],
      outerHeight: 300,
    },
  };

  ngOnInit() {

  }

}
```

```html
<!-- index.html -->
<qdt-component [Component]="chart_options.type" [props]="chart_options.props"></qdt-component>
```

[← QdtPicasso](../)

