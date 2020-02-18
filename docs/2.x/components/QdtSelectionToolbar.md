# QdtSelectionToolbar: *Create Toolbar with Current Selections*

![QdtSelectionToolbar](../assets/selectionToolbar.png "QdtSelectionToolbar")

- Display a toolbar with the current app selections.

## Properties

| prop             | type          | description   |
| ---------------- | ------------- | ------------- |
| title            | String        | `SELECTIONS`  |
| btnText          | String        | `Clear All `  |


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
  "QdtSelectionToolbar", 
  {
    title: 'MY SELECTIONS',
    btnText: 'Clear Selections',
  }, 
  element
);
```

### React

```jsx
<QdtComponent
  type="QdtSelectionToolbar"
  props={{
    title: 'MY SELECTIONS',
    btnText: 'Clear Selections',
  }}
/>
```

### Angular

```js
// selection-toolbar.component.ts
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'selection-toolbar',
  templateUrl: './selection-toolbar.component.html',
})
export class QdtSelectionToolbarComponent implements OnInit {

  constructor(private el: ElementRef) { }

  chart_options = {
    type: 'QdtSelectionToolbar',
    props: {
      title: 'MY SELECTIONS',
      btnText: 'Clear Selections',
    },
  };

  ngOnInit() {

  }

}
```

```html
<!-- html -->
<selection-toolbar [Component]="chart_options.type" [props]="chart_options.props"></selection-toolbar>
```

## Examples

- [https://qdt-apps.qlik.com/qdt-components/react/#/selection-toolbar](https://qdt-apps.qlik.com/qdt-components/react/#/selection-toolbar) (React)

---

[← Back to All Components](https://github.com/qlik-demo-team/qdt-components#components)