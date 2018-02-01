import qApp from './qApp';
import QtdRender from './components2/QtdRender';
import QdtViz from './components2/QdtViz';

const QdtComponents = class {
  constructor(input = { config: {}, connections: { vizApi: true, engineApi: true } }) {
    this.config = input.config;
    this.qApp = (input.connections.vizApi) ? qApp(input.config) : null;
  }
  async render(Component, props, element) {
    if (this.qApp) {
      QtdRender(Component, { ...props, qAppPromise: this.qApp }, element);
    }
  }
  async getViz() {
    return QdtViz;
  }
};

export default QdtComponents;
