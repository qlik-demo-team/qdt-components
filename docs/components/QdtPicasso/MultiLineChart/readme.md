# Multi-Line Chart

![Multi-Line Chart](../assets/picassoMultiLinechart.png)

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
    type: 'multiLineChart',
    cols: [
      'Date.autoCalendar.YearMonth',
      '=Sum([Number of New Cases])',
      '=Sum([Number of Closed Cases])'
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
    type: 'multiLineChart',
    cols: [
      'Date.autoCalendar.YearMonth',
      '=Sum([Number of New Cases])',
      '=Sum([Number of Closed Cases])'
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