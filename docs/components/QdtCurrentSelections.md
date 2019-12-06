# QdtCurrentSelections: *Show Current Selections Bar*

![QdtCurrentSelections](../assets/currentSelections.png "QdtCurrentSelections")

- Show all current selections with a Qlik-style bar.

## Properties

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| height           | String        | `40px`  |

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
  "QdtCurrentSelections", 
  {
    height: '40px'
  }, 
  element
);
```

### React

```jsx
<QdtComponent
  type="QdtCurrentSelections"
  props={{
    height: '40px'
  }}
/>
```

### Angular

```js
// current-selections.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'current-selections',
  templateUrl: './current-selections.component.html',
})
export class CurrentSelectionsComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtCurrentSelections',
    props: {
      height: '40px',
    },
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<current-selections [Component]="chart_options.type" [props]="chart_options.props"></current-selections>
```


## Examples

- [https://qdt-apps.qlik.com/qdt-components/react/#/current-selections](https://qdt-apps.qlik.com/qdt-components/react/#/current-selections) (React)

---

[← Back to All Components](https://github.com/qlik-demo-team/qdt-components#components)