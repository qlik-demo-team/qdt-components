## Using qdt-components with React

This is a guide on how you can use qdt-components with React.

- [Live Demo](https://webapps.qlik.com/qdt-components/react/index.html)
- `npm install --save qdt-components`
- create a React component that implements qdt-components
```javascript
import React from 'react';
import PropTypes from 'prop-types';
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

export default class QdtComponent extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { type, props } = this.props;
    qdtComponents.render(type, props, this.node);
  }

  componentWillUnmount() {
    QdtComponents.unmountQdtComponent(this.node)
  }

  render() {
    return (
      <div ref={(node) => { this.node = node; }} />
    );
  }
}
```

### Template
[https://github.com/qlik-demo-team/qdt-react-template](https://github.com/qlik-demo-team/qdt-react-template)