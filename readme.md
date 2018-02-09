![Banner](assets/banner_3technologies.jpg "Banner") 

[![version](http://img.shields.io/badge/version-1.0.2-brightgreen.svg?style=plastic)]()

# Qlik Demo Team Components

- Qlik-powered components built by the Qlik Demo Team. For use with simple html, Angular2+ and React

### Installation
- `npm install --save qdt-components`

### Usage

#### Simple Html Example
- Download the [latest build](../blob/master/dist/qdt-components.js)
- Add the Html
```html
    <head>
        <script type="text/javascript" src="qdt-components.js"></script>
    </head>
    <body>
        <qdt-component id="qdt1"></qdt-component>
    </body>
```
- Add the Javascript
```javascript
    <script type="text/javascript">
        var qConfig = {
            "config": {
                "host": "sense-demo.qlik.com",
                "secure": true,
                "port": 443,
                "prefix": "/",
                "appId": "133dab5d-8f56-4d40-b3e0-a6b401391bde"
            },
            "connections": { 
                "vizApi": true, 
                "engineApi": false 
            }
        }
        var QdtComponent = new window.qdtComponents.default(qConfig.config, qConfig.connections);
        var element = document.getElementById('qdt1');
        QdtComponent.render('QdtViz', {id: 'a5e0f12c-38f5-4da9-8f3f-0e4566b28398', height:'300px'}, element);
    </script>
```
- [Live Demo](https://webapps.qlik.com/qdt-components/plain-html/index.html)

#### Angular 5 Component (cli)
-
```javascript
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { QdtComponents } from 'qdt-components';
let qConfig = {
    "config": {
        "host": "sense-demo.qlik.com",
        "secure": true,
        "port": 443,
        "prefix": "/",
        "appId": "133dab5d-8f56-4d40-b3e0-a6b401391bde"
    },
    "connections": { 
        "vizApi": true, 
        "engineApi": true 
    }
}

@Component({
	selector: 'qdt-component',
	templateUrl: './qdt-component.component.html',
	styleUrls: ['./qdt-component.component.less']
})
export class QdtComponentComponent implements OnInit {

	@Input() Component: Function;
    @Input() props: object;

    static QdtComponent = new QdtComponents(qConfig.config, qConfig.connections);

	constructor(private elementRef: ElementRef) { }

	ngOnInit() {
        QdtComponentComponent.QdtComponent.render(this.Component, this.props, this.elementRef.nativeElement);
	}

}
```

#### React 16
-


### Copyright

Copyright 2018 QlikTech International AB

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at    

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

