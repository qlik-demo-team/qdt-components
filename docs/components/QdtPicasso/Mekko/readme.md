# Mekko Chart

![Mekko Chart](../assets/picassoMekko.png)

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
    type: 'merimekko',
    cols: [
      'Case Owner Group',
      'Priority',
      '=Count(Distinct {$<[Case Is Closed] ={\'False\'} >} [%CaseId])',
    ],
    outerHeight: 600,
  }, 
  element
);
```

### React

```jsx
const chart_options = {
  type: "QdtPicasso",
  props: {
    type: 'merimekko',
    cols: [
      'Case Owner Group',
      'Priority',
      '=Count(Distinct {$<[Case Is Closed] ={\'False\'} >} [%CaseId])',
    ],
    outerHeight: 600,
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
// mekko.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'picasso-mekko',
  templateUrl: './picasso-mekko.component.html',
})
export class PicassoMekkoComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: "QdtPicasso",
    props: {
      type: 'merimekko',
      cols: [
        'Case Owner Group',
        'Priority',
        '=Count(Distinct {$<[Case Is Closed] ={\'False\'} >} [%CaseId])',
      ],
      outerHeight: 600,
    }
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<picasso-mekko [Component]="chart_options.type" [props]="chart_options.props"></picasso-mekko>
```


[← QdtPicasso](../)