# Horizontal Bar Chart

![Horizontal Bar Chart](../assets/picassoHorizontalBarchart.png)

### React

```jsx
const chart_options = {
  type: 'QdtPicasso',
  props: {
      type: 'horizontalBarchart', 
      cols: [
        'Champion_Full',
        "=Sum(if(Club = [Champion], [Total Compensation]))"
      ], 
      outerHeight: 400,
  },
};

const PicassoBarChart = () => (
  <div className="picasso-bar">
    <QdtComponent {...chart_options} />
  </div>
)

const App = () => {
    return (
        <main>
            <PicassoBarChart />
        </main>
    )
}

render(<App />, document.getElementById('root'));

```






[← QdtPicasso](../)

