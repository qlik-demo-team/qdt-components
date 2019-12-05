# QdtSearch: *Create a Search Input Field*

![QdtSearch](../assets/search.png?raw=true "QdtSearch")

- This creates a search input field based on [Leonardo UI - input](https://qlik-oss.github.io/leonardo-ui/input.html).
  - Tooltips are also based on [Leonardo UI - Tooltip](https://qlik-oss.github.io/leonardo-ui/tooltip.html)

## Properties

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| cols             | Array         | `[dimension]` |
| invert           | Boolean       | false         |
| placeholder      | String        | `Search for`  |
| tooltipDock      | String        | `'top', 'right', 'bottom', 'left' `|
| tooltipContent   | String        | `<h5>Tooltip Header</h5> more content here.` |
| showGo           | Boolean       | false         |

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
  "QdtSearch", 
  {
    cols: ['Case Owner'],
    options: {
      placeholder: 'Search Case Owner' 
    }
  }, 
  element
);
```

### React

```jsx
<QdtComponent
  type='QdtSearch'
  props={{
    cols: ['Case Owner'],
    options: {
      placeholder: 'Search Case Owner' 
    }
  }}
/>
```

### Angular

```js
// qdt-search.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'qdt-search',
  templateUrl: './qdt-search.component.html',
})
export class QdtSearchComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtSearch',
    props: {
      cols: ['Case Owner'],
      options: {
        placeholder: 'Search Case Owner' 
      }
    },
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<qdt-search [Component]="chart_options.type" [props]="chart_options.props"></qdt-search>
```

## Examples

- [https://qdt-apps.qlik.com/qdt-components/react/#/search](https://qdt-apps.qlik.com/qdt-components/react/#/search) (React)

---

[← Back to All Components](https://github.com/qlik-demo-team/qdt-components#components)