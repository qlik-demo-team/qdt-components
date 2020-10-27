## Using qdt-components with React

This is a guide on how you can use qdt-components with React.

- [Live Demo - https://webapps.qlik.com/qdt-components/react/index.html](https://webapps.qlik.com/qdt-components/react/index.html)
- `npm install --save qdt-components`
- create a React component that implements qdt-components
```Javascript
import React from 'react';
import {
  qdtEnigma, qdtCapabilityApp, qdtCompose, QdtViz,
} from 'qdt-components';

const identity = Math.random().toString(32).substr(2, 8);

const config = {
  host: "yourdomain.com",
  secure: true,
  port: 443,
  prefix: "",
  appId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx",
  webIntegrationId, // SaaS webIntegrationId
  token // SaaS auth JWT token
}

const engineApiAppPromise = qdtEnigma(config);
const capabilityApiAppPromise = qdtCapabilityApp(config);

function QdtComponent({
  component, properties, options, appIndex,
}) {
  const elementRef = useRef(null);

  const init = async () => {
    let app = await engineApiAppPromise;
    if (appIndex === 2) {
      app = await capabilityApiAppPromise;
      QdtViz({
        element: elementRef.current,
        app,
        options,
      });
    } else {
      qdtCompose({
        element: elementRef.current,
        component,
        app,
        properties,
        options,
      });
    }
  };

  useEffect(() => {
    if (elementRef) init();
  }, [init]);

  return (
    <div ref={elementRef} />
  );
}

export default QdtComponent;
```

- create a React container that uses the above component
```Javascript
import React from 'react';
import { QdtPicasso, useBarChartSettings } from 'qdt-components';
import QdtComponent from './QdtComponent';

const Container = () => (
  <div className="container">
    <div>
      <QdtComponent
        component={QdtSelections}
        properties={{
          qSelectionObjectDef: {},
        }}
      />
    </div>
    <div>
      <QdtComponent
        component={QdtPicasso}
        options={{
          settings: useBarChartSettings({
            orientation: 'horizontal',
          }),
          height: 400,
        }}
        properties={{
          qHyperCubeDef: {
            qDimensions: [
              { qDef: { qFieldDefs: ['Case Owner Group'] } },
            ],
            qMeasures: [
              { qDef: { qDef: 'Avg([Case Duration Time])', autoSort: false }, qSortBy: { qSortByNumeric: -1 } },
            ],
            qInterColumnSortOrder: [1, 0],
          },
        }}
      />
    </div>
  </div>
);

export default Container;
```

### Template
[https://github.com/qlik-demo-team/qdt-react-template](https://github.com/qlik-demo-team/qdt-react-template)