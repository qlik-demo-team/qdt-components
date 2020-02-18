# Point Distribution

![Point Distribution Chart](../assets/picassoPointDistribution.png)

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
    type: 'pointDistribution',
    cols: [
      '[Date.autoCalendar.Year]',
      '[Date.autoCalendar.Month]',
      '=Count( {$<[Case Is Closed] ={\'True\'} >} %CaseId )',
      '=Avg([Case Duration Time])',
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
    type: 'pointDistribution',
    cols: [
      '[Date.autoCalendar.Year]',
      '[Date.autoCalendar.Month]',
      '=Count( {$<[Case Is Closed] ={\'True\'} >} %CaseId )',
      '=Avg([Case Duration Time])',
    ],
    outerHeight: 400,
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
// point-dist.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'picasso-point-dist',
  templateUrl: './picasso-point-dist.component.html',
})
export class PicassoPointDistributionComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtPicasso',
    props: {
      type: 'pointDistribution',
      cols: [
        '[Date.autoCalendar.Year]',
        '[Date.autoCalendar.Month]',
        '=Count( {$<[Case Is Closed] ={\'True\'} >} %CaseId )',
        '=Avg([Case Duration Time])',
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
<picasso-point-dist [Component]="chart_options.type" [props]="chart_options.props"></picasso-point-dist>
```

[← QdtPicasso](../)