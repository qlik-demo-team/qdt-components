# Range Area

![Range Area](../assets/picassoRangeAreaChart.png)

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
    type: 'rangeArea',
    cols: [
      'Date.autoCalendar.YearMonth',
      '=Count( {$<Priority={\'High\'}, Status -={\'Closed\'} >} Distinct %CaseId )',
      '=Count( {$<Priority={\'Low\'}, Status -={\'Closed\'} >} Distinct %CaseId )'
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
    type: 'rangeArea',
    cols: [
      'Date.autoCalendar.YearMonth',
      '=Count( {$<Priority={\'High\'}, Status -={\'Closed\'} >} Distinct %CaseId )',
      '=Count( {$<Priority={\'Low\'}, Status -={\'Closed\'} >} Distinct %CaseId )'
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
// range-area.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'picasso-range-area',
  templateUrl: './picasso-range-area.component.html',
})
export class PicassoRangeAreaComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtPicasso',
    props: {
      type: 'rangeArea',
      cols: [
        'Date.autoCalendar.YearMonth',
        '=Count( {$<Priority={\'High\'}, Status -={\'Closed\'} >} Distinct %CaseId )',
        '=Count( {$<Priority={\'Low\'}, Status -={\'Closed\'} >} Distinct %CaseId )'
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
<picasso-range-area [Component]="chart_options.type" [props]="chart_options.props"></picasso-range-area>
```

[← QdtPicasso](../)