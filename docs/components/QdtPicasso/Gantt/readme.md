# Gantt Chart

![Gantt Chart](../assets/picassoGantt.png)

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
    type: 'gantt',
    cols: [
      '%CaseId', '=["Case Created Date"]',
      '=["Case Closed Date"]'
    ],
    outerHeight: 600,
    prio: 'svg',
    options: {
      bar: { height: 30 },
    },
    qSuppressZero: true,
    qSuppressMissing: true,
    // qInterColumnSortOrder: [2, 1],
    // qSortByExpression: -1,
    // qExpression: { qv: '=["Case Closed Date"]' },
    qPage: {
      qTop: 0,
      qLeft: 0,
      qWidth: 3,
      qHeight: 18,
    },
  }, 
  element
);
```

### React

```jsx
const chart_options = {
  type: 'QdtPicasso',
  props: {
    type: 'gantt',
    cols: [
      '%CaseId', '=["Case Created Date"]',
      '=["Case Closed Date"]'
    ],
    outerHeight: 600,
    prio: 'svg',
    options: {
      bar: { height: 30 },
    },
    qSuppressZero: true,
    qSuppressMissing: true,
    // qInterColumnSortOrder: [2, 1],
    // qSortByExpression: -1,
    // qExpression: { qv: '=["Case Closed Date"]' },
    qPage: {
      qTop: 0,
      qLeft: 0,
      qWidth: 3,
      qHeight: 18,
    },
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
// gantt.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'picasso-gantt',
  templateUrl: './picasso-gantt.component.html',
})
export class PicassoGanttComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtPicasso',
    props: {
      type: 'gantt',
      cols: [
        '%CaseId', '=["Case Created Date"]',
        '=["Case Closed Date"]'
      ],
      outerHeight: 600,
      prio: 'svg',
      options: {
        bar: { height: 30 },
      },
      qSuppressZero: true,
      qSuppressMissing: true,
      // qInterColumnSortOrder: [2, 1],
      // qSortByExpression: -1,
      // qExpression: { qv: '=["Case Closed Date"]' },
      qPage: {
        qTop: 0,
        qLeft: 0,
        qWidth: 3,
        qHeight: 18,
      },
    },
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<picasso-gantt [Component]="chart_options.type" [props]="chart_options.props"></picasso-gantt>
```

[← QdtPicasso](../)