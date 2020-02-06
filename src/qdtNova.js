import ReactDOM from 'react-dom';
import QdtTable from './components/QdtTable/QdtTable';

export default ({ component: Component, options }) => ((env) => ({
  qae: {},
  component: {
    created() {
      console.log('created', env);
    },
    render({ layout, model, element }) {
      ReactDOM.render(<Component layout={layout} model={model} options={options} />, element);
    }
  }
}));