import React from 'react';
import ReactDOM from 'react-dom';
import qApp from './qApp';
import qDoc from './qDoc';
import utility from './utilities/';
import settings from './picasso/settings';
import picassoComponents from './picasso/settings/components';
import picassoInteractions from './picasso/settings/interactions';
import QdtFilter from './components/QdtFilter';
import QdtTable from './components/QdtTable';
import QdtViz from './components/QdtViz';
import QdtSelectionToolbar from './components/QdtSelectionToolbar';
import QdtKpi from './components/QdtKpi';
import QdtButton from './components/QdtButton';
import QdtPicasso from './components/QdtPicasso';
import QdtSearch from './components/QdtSearch';
import QdtCurrentSelections from './components/QdtCurrentSelections';

const components = {
  QdtFilter, QdtTable, QdtViz, QdtSelectionToolbar, QdtKpi, QdtButton, QdtPicasso, QdtSearch, QdtCurrentSelections,
};

const QdtComponents = class {
  static picasso = {
    settings,
    components: picassoComponents,
    interactions: picassoInteractions,
  };

  static unmountQdtComponent = element => ReactDOM.unmountComponentAtNode(element)

  static globals = utility.globals;

  constructor(config = {}, connections = { vizApi: true, engineApi: true, useUniqueSessionID: null }) {
    const myConfig = config;
    // Make it work for Qlik Core scaling https://github.com/qlik-oss/core-scaling
    // No identity needed, core scaling is handling all of the sessions
    // qlikcore/engine:12.248.0
    if (connections.useUniqueSessionID) {
      myConfig.identity = connections.useUniqueSessionID;
    } else if (myConfig.core) {
      myConfig.identity = null;
    } else {
      myConfig.identity = utility.Uid(16);
    }
    this.qAppPromise = (connections.vizApi) ? qApp(myConfig) : null;
    this.qDocPromise = (connections.engineApi) ? qDoc(myConfig) : null;
  }

  render = async (type, props, element) => new Promise((resolve, reject) => {
    try {
      const { qAppPromise, qDocPromise } = this;
      const Component = components[type];
      ReactDOM.render(
        <Component
          {...props}
          qAppPromise={qAppPromise}
          qDocPromise={qDocPromise}
          ref={node => resolve(node)}
        />,
        element,
      );
    //   console.info(version);
    } catch (error) {
      reject(error);
    }
  });
};

export default QdtComponents;
