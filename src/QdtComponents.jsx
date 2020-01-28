import React from 'react';
import ReactDOM from 'react-dom';
import qApp from './qApp';
import qDoc from './qDoc';
import utility from './utilities';
import picassoSettings from './components/QdtPicasso/picasso/settings';
import * as picassoComponents from './components/QdtPicasso/picasso/settings/components';
import * as picassoInteractions from './components/QdtPicasso/picasso/settings/interactions';
import QdtFilter from './components/QdtFilter/QdtFilter';
import QdtTable from './components/QdtTable/QdtTable';
import QdtViz from './components/QdtViz/QdtViz';
import QdtSelectionToolbar from './components/QdtSelectionToolbar/QdtSelectionToolbar';
import QdtKpi from './components/QdtKpi/QdtKpi';
import QdtButton from './components/QdtButton/QdtButton';
import QdtPicasso from './components/QdtPicasso/QdtPicasso';
import QdtSearch from './components/QdtSearch/QdtSearch';
import QdtCurrentSelections from './components/QdtCurrentSelections/QdtCurrentSelections';
import QdtMapBox from './components/QdtMapbox/QdtMapBox';
import QdtSequencer from './components/QdtSequencer/QdtSequencer';

const components = {
  QdtFilter, QdtTable, QdtViz, QdtSelectionToolbar, QdtKpi, QdtButton, QdtPicasso, QdtSearch, QdtCurrentSelections, QdtMapBox, QdtSequencer,
};

const QdtComponents = class {
  static picasso = {
    settings: picassoSettings,
    components: picassoComponents,
    interactions: picassoInteractions,
  };

  static unmountQdtComponent = (element) => ReactDOM.unmountComponentAtNode(element)

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
          ref={(node) => resolve(node)}
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
