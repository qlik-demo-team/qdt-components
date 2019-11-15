## Using qdt-components with Angular

This is a guide on how you can use qdt-components with Angular 6.
- [Live Demo](https://webapps.qlik.com/qdt-components/angular/index.html)
- `npm install --save qdt-components`
- create an Angular 6 component that implements qdt-components
```javascript
import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import QdtComponents from 'qdt-components';

const options = {
  config: {
    host: "yourdomain.com",
    secure: true,
    port: 443,
    prefix: "",
    appId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx"
  },
  connections: { 
    vizApi: true, 
    engineApi: true 
  }
}

const qdtComponents = new QdtComponents(options.config, options.connections);

@Component({
  selector: 'qdt-component',
  templateUrl: './qdt-component.component.html',
  styleUrls: ['./qdt-component.component.less']
})
export class QdtComponent implements OnInit, OnDestroy {

  @Input() type: string;
  @Input() props: object;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    qdtComponents.render(this.type, this.props, this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    QdtComponents.unmountQdtComponent(this.elementRef.nativeElement)
  }
}
```

### Template
[https://github.com/qlik-demo-team/qdt-angular-template](https://github.com/qlik-demo-team/qdt-angular-template)