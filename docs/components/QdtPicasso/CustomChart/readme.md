# Custom Chart

![Custom Chart](../assets/picassoCustomChart.png)

- Custom Charts allow you to create your own combination of charts using

### Vanilla JavaScript

- See the [HTML Template](https://github.com/qlik-demo-team/qdt-components/blob/master/docs/usage/Html.md) for the
basic page setup. 

```js
var options = {
  config: { /* host, port, appid, etc. */ },
  connections: { /* vizApi, engineAPI */}
}

var qdtComponents = new QdtComponents(options.config, options.connections);

var components = QdtComponents.picasso.components;
var props = {
  cols: [
    "Case Owner Group",
    "=Num(Avg([Case Duration Time]), '##.0')",
    "=Count( {$<Priority={'Low'}, Status -={'Closed'} >} Distinct %CaseId )",
    "=Count( {$<Priority={'Medium'}, Status -={'Closed'} >} Distinct %CaseId )",
    "=Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )",
  ],
  outerHeight: 300,
  settings: QdtComponents.picasso.settings.verticalBarchart
};
props.settings.scales.y = { 
  data: { 
    fields: ['qMeasureInfo/0', 'qMeasureInfo/1', 'qMeasureInfo/2'] 
  }, 
  invert: true, 
  expand: 0.04 
};
props.settings.components.push(components.line({
  displayOrder: 3,
  y: {
    field: 'qMeasureInfo/1'
  }, 
  stroke: '#960000',
}));
props.settings.components.push(components.point({ 
  displayOrder: 4,
  y: {
    field: 'qMeasureInfo/1' 
  },
  fill: '#960000' 
}));
props.settings.components.push(components.line({
  displayOrder: 5,
  y: {
    field: 'qMeasureInfo/2'
  },
  stroke: '#99cc66',
}));
props.settings.components.push(components.point({
  displayOrder: 6,
  y: {
    field: 'qMeasureInfo/2'
  },
  fill: '#99cc66'
}));
props.settings.components.push(components.point({
  displayOrder: 7,
  y: {
    field: 'qMeasureInfo/3'
  },
  fill: '#275378'
}));


var element = document.getElementById('qdt1');
qdtComponents.render('QdtPicasso', props, element);
```

### React

- Creating a custom chart with Picasso using QdtComponents requires some altering to the `<QdtComponent />` component.
The following code can be added to the `componentDidMount()` lifecycle function or the `useEffect()` hook.

```jsx
// QdtComponent.jsx

// ===============================
// class-based: componentDidMount()
componentDidMount() {
  const { props } = this.props;
  const { settings, components, interactions } = QdtComponents.picasso;
  if (props.type === 'custom-chart-name') {
    props.type = null;
    props.settings = settings.verticalBarchart;
    props.settings.scales.y = { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1', 'qMeasureInfo/2'] }, invert: true, expand: 0.04 };
    props.settings.components.push(components.line({
      displayOrder: 3, y: { field: 'qMeasureInfo/1' }, stroke: '#960000',
    }));
    props.settings.components.push(components.point({ displayOrder: 4, y: { field: 'qMeasureInfo/1' }, fill: '#960000' }));
    props.settings.components.push(components.line({
      displayOrder: 5, y: { field: 'qMeasureInfo/2' }, stroke: '#99cc66',
    }));
    props.settings.components.push(components.point({ displayOrder: 6, y: { field: 'qMeasureInfo/2' }, fill: '#99cc66' }));
    props.settings.components.push(components.point({ displayOrder: 7, y: { field: 'qMeasureInfo/3' }, fill: '#275378' }));
  }

  qdtComponents.render(type, qProps, node.current);
}

// =================================
// hooks: useEffect()
useEffect(() => {
  if (qProps.type === 'custom-chart-name') {
    qProps.type = null;
    qProps.settings = settings.verticalBarchart;
    qProps.settings.scales.y = { data: { fields: ['qMeasureInfo/0', 'qMeasureInfo/1', 'qMeasureInfo/2'] }, invert: true, expand: 0.04 };
    qProps.settings.components.push(components.line({
      displayOrder: 3, y: { field: 'qMeasureInfo/1' }, stroke: '#960000',
    }));
    qProps.settings.components.push(components.point({ displayOrder: 4, y: { field: 'qMeasureInfo/1' }, fill: '#960000' }));
    qProps.settings.components.push(components.line({
      displayOrder: 5, y: { field: 'qMeasureInfo/2' }, stroke: '#99cc66',
    }));
    qProps.settings.components.push(components.point({ displayOrder: 6, y: { field: 'qMeasureInfo/2' }, fill: '#99cc66' }));
    qProps.settings.components.push(components.point({ displayOrder: 7, y: { field: 'qMeasureInfo/3' }, fill: '#275378' }));
  }
  qdtComponents.render(type, qProps, node.current);
}
```

```jsx
const chart_options = {
  type: 'QdtPicasso',
  props: {
    type: 'custom-chart-name',
    cols: [
      'Case Owner Group',
      '=Num(Avg([Case Duration Time]), \'##.0\')',
      "=Count( {$<Priority={'Low'}, Status -={'Closed'} >} Distinct %CaseId )",
      "=Count( {$<Priority={'Medium'}, Status -={'Closed'} >} Distinct %CaseId )",
      "=Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )",
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


[← QdtPicasso](../)