![Angular](assets/angular.png "Angular")
![Arrows](assets/if_arrow_7_393270.png "Arrows")
![Qlik Sense](assets/QS_Engine_thumb.jpg "Qlik Sense")
![Arrows](assets/if_arrow_7_393270.png "Arrows")
![React](assets/react_thumb.png "React")

[![version](http://img.shields.io/badge/version-1.0.1-brightgreen.svg?style=plastic)]()

# Qlik Demo Team Components

- Qlik-powered components built by the Qlik Demo Team. For use with Angular2+ and React

### Installation
- `npm install --save qdt-components`

### Usage

##### Example

```javascript
import { QdtComponents } from 'qdt-components';

let qConfig = {
    "config": {
        "host": "sense-demo.qlik.com",
        "secure": true,
        "port": 443,
        "prefix": "/",
        "appId": "372cbc85-f7fb-4db6-a620-9a5367845dce"
    },
    "connections": { 
        "vizApi": true, 
        "engineApi": false 
    }
}

static QdtComponent = new QdtComponents(qConfig);
```

##### Angular 5 Component

```javascript
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as qConfig from '../../../qConfig.json';
import { QdtComponents } from 'qdt-components';

@Component({
	selector: 'qdt-component',
	templateUrl: './qdt-component.component.html',
	styleUrls: ['./qdt-component.component.less']
})
export class QdtComponentComponent implements OnInit {

	@Input() Component: Function;
    @Input() props: object;

    static QdtComponent = new QdtComponents(qConfig);

	constructor(private elementRef: ElementRef) { }

	ngOnInit() {
        let Component = QdtComponentComponent.QdtComponent.getViz()._v;
        QdtComponentComponent.QdtComponent.render(Component, this.props, this.elementRef.nativeElement);
	}

}
```

##### React 16
-


### Copyright

Copyright 2018 QlikTech International AB

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at    

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

