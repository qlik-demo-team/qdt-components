# QdtTable: *Create an Interactive Table*

![QdtTable](../assets/table.png "QdtTable")

- Create an interactive, sortable table.

## Properties

| prop             | type          | description            |
| ---------------- | ------------- | -------------          |
| cols             | Array         | `[dimension, measure]` |
| height           | Number        | `400`                  |
| rowHeight        | Number        | `40`                   |

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
  "QdtTable", 
  {
    cols: [
      'Case Owner',
      'Employee Status',
      "=Count( {$<Status -={'Closed'} >} Distinct %CaseId )",
    ],
    height: 400,
    rowHeight: 40,
  }, 
  element
);
```

### React

```jsx
<QdtComponent
  type='QdtTable'
  props={{
    cols: [
      'Case Owner',
      'Employee Status',
      "=Count( {$<Status -={'Closed'} >} Distinct %CaseId )",
    ],
    height: 400,
    rowHeight: 40,
  }}
/>
```

### Angular

```js
// qdt-table.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'qdt-table',
  templateUrl: './qdt-table.component.html',
})
export class QdtTableComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtTable',
    props: {
      cols: [
        'Case Owner',
        'Employee Status',
        "=Count( {$<Status -={'Closed'} >} Distinct %CaseId )",
      ],
      height: 400,
      rowHeight: 40,
    },
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<qdt-table [Component]="chart_options.type" [props]="chart_options.props"></qdt-table>
```

## Examples

- [https://qdt-apps.qlik.com/qdt-components/react/#/table-engine](https://qdt-apps.qlik.com/qdt-components/react/#/table-engine)

---

[← Back to All Components](https://github.com/qlik-demo-team/qdt-components#components)