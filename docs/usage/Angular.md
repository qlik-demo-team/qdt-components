## Using qdt-components with Angular

This is a guide on how you can use qdt-components with Angular 6.
- [Live Demo](https://webapps.qlik.com/qdt-components/angular/index.html)
- `npm install --save qdt-components`
- create an Angular 10 component that implements qdt-components
- `ng generate component qdt-components`
- Replace with
```javascript
import { Component, OnInit, ElementRef, Input } from '@angular/core';
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
};

@Component({
  selector: 'qdt-component',
  template: `Loading...`,
  styles: []
})

export class QdtComponentsComponent implements OnInit {

	@Input() component: any;
  @Input() properties: any;
  @Input() options: any;
  @Input() connection: number = 1;

  constructor(private elementRef: ElementRef) { }
  
  static engineApiAppPromise = qdtEnigma(config);
  static capabilityApiAppPromise = qdtCapabilityApp(config);

  async init() {
    const { component, properties, options, connection} = this;
    if (connection === 1) {
      const app = await QdtComponentsComponent.capabilityApiAppPromise;
      QdtViz({
        element: this.elementRef.nativeElement,
        app,
        options,
      });
    } else {
      const app = await QdtComponentsComponent.engineApiAppPromise;
      qdtCompose({
        element: this.elementRef.nativeElement,
        component,
        app,
        properties,
        options,
      });
    }
  }

  ngOnInit() {
    this.init();
  }

}
```

- In your component.ts use as follows
```javascript
import {
  QdtSelections, QdtSelect, QdtPicasso, useBarChartSettings,
} from 'qdt-components';

...

  viz1 = {
    component: QdtSelections,
    properties: {
      qSelectionObjectDef: {},
    },
    connection: 2,
    style: {
      width: '100%',
      paddingTop: '50px'
    }
  };

	viz2 = {
    component: QdtSelect,
    properties: {
      qListObjectDef: {
        qDef: {
          qFieldDefs: ['Date'],
        },
        qInitialDataFetch: [{
          qWidth: 1,
          qHeight: 1000,
        }],
      },
    },
    options: { multiple: false },
    connection: 2,
    style: {
      width: '100%',
      height: '50px',
      paddingTop: '30px'
    }
  };

	viz3 = {
    component: QdtPicasso,
    options: {
      settings: useBarChartSettings({
        orientation: 'horizontal',
      }),
      height: '400px',
    },
    properties: {
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Case Owner Group'] } },
        ],
        qMeasures: [
          { qDef: { qDef: 'Avg([Case Duration Time])', autoSort: false }, qSortBy: { qSortByNumeric: -1 } },
        ],
        qInterColumnSortOrder: [1, 0],
      },
    },
    connection: 2,
    style: {
      width: '100%',
      height: '400px',
      paddingTop: '100px'
    }
  };

  // Capability API
	viz4 = {
    options: {
      id: 'a5e0f12c-38f5-4da9-8f3f-0e4566b28398',
      height: 400,
    },
    connection: 1,
    style: {
      width: '100%',
      paddingTop: '150px'
    }
  };

```

- And in your component.html add
```Html
  <qdt-component [component]="viz1.component" [properties]="viz1.properties" [connection]="viz1.connection" [style]="viz1.style"></qdt-component>
  <qdt-component [component]="viz2.component" [properties]="viz2.properties" [connection]="viz2.connection" [style]="viz2.style"></qdt-component>
  <qdt-component [component]="viz3.component" [properties]="viz3.properties" [connection]="viz3.connection" [options]="viz3.options" [style]="viz3.style"></qdt-component>
  <qdt-component [options]="viz4.options" [connection]="viz4.connection" [style]="viz4.style"></qdt-component>
```

### Template
[https://github.com/qlik-demo-team/qdt-angular-template](https://github.com/qlik-demo-team/qdt-angular-template)