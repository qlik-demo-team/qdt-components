## Using qdt-components with a simple html page

This is a guide on how you can use qdt-components on a simple html page.

- [Live Demo](https://webapps.qlik.com/qdt-components/plain-html/index.html)
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
  var options = {
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
  var qdtComponents = new QdtComponents(options.config, options.connections);
  var element = document.getElementById('qdt1');
  qdtComponents.render('QdtViz', {id: 'a5e0f12c-38f5-4da9-8f3f-0e4566b28398', height:'300px'}, element);
</script>
```

### Template
[https://github.com/qlik-demo-team/qdt-html-template](https://github.com/qlik-demo-team/qdt-html-template)