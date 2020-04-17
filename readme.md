![Banner](docs/assets/banner.png "Banner") 

[![latest npm badge](https://img.shields.io/npm/v/qdt-components/latest.svg)](https://www.npmjs.com/package/qdt-components)

# Qdt Components

Qlik-powered components built by the Qlik Demo Team (aka Qdt). For use with simple HTML (Vanilla JavaScript), Angular6, React 16, and Vue 2

## Style Guide

- components have the signature ({ model, layout, options }) => ()
- don't fuck with qdtCompose or QdtComponent
- picasso settings should be fucntions that receive theme, properties, and the minimum set of parameters
- components and interactions in picasso settings should have a parameter and be added with push so they can be conditionally included
- components (i.e. bar, line, etc) should have the most simple api possible, and any parameters should be reusuable. if you need something for a specific type (merrimeko, rank, stacked, butterfly barcharts for examplie), that should be in the settings file, not in the bar component.
- right now there's only a barchart setting. please leave this be for now. linechart is coming soon. the rest will be ported and eventually exported.

### Installation
`npm install --save qdt-components`


### Live Demo with the latest additions
- https://qdt-apps.qlik.com/qdt-components/react/

---

### Usage

Click below to see how you can use qdt-components

* [On a simple HTML page](docs/usage/Html.md)

* [With Angular](docs/usage/Angular.md)

* [With React](docs/usage/React.md)

* [With Vue](docs/usage/Vue.md)

---

### Components

| [QtdViz](docs/components/QdtViz.md)| [QdtCurrentSelections](docs/components/QdtCurrentSelections.md)| [QdtFilter](docs/components/QdtFilter.md) | [QdtSelectionToolbar](docs/components/QdtSelectionToolbar.md)     |
| :----:| :----: |:----: |:----: |
| [![QtdViz](docs/assets/embedded.png)](docs/components/QdtViz.md)  | [![QdtCurrentSelections](docs/assets/currentSelections.png)](docs/components/QdtCurrentSelections.md)| [![QdtFilter](docs/assets/filters.png)](docs/components/QdtFilter.md)  | [![QdtSelectionToolbar](docs/assets/selectionToolbar.png)](docs/components/QdtSelectionToolbar.md) |
|Visualization API|Visualization API|Engine API|Engine API|


| [QdtPicasso](docs/components/QdtPicasso/)| [QdtSearch](docs/components/QdtSearch.md)| [QtdMapBox](docs/components/QdtMapBox.md)| [QdtTable](docs/components/QdtTable.md)                           |
| :----:| :----: |:----: |:----: |
|[![QdtPicasso](docs/components/QdtPicasso/assets/picassoCustomGroupBarchart.png)](docs/components/QdtPicasso/)| [![QdtSearch](docs/assets/search.png)](docs/components/QdtSearch.md)  | [![QtdMapBox](docs/assets/picassoMapbox.png)](docs/components/QdtMapBox.md) |[![QdtTable](docs/assets/table.png)](docs/components/QdtTable.md) |
|Engine API|Engine API|Engine API|Engine API|

| [QdtSequencer](docs/components/QdtSequencer.md)|[QdtKpi](docs/components/QdtKpi.md)| | |
| :----:| :----: | :----: | :----: |
| [![QdtSequencer](docs/assets/sequencer.png)](docs/components/QdtSequencer.md) | [![QdtKpi](docs/assets/kpi.png)](docs/components/QdtKpi.md) | ![](docs/assets/spacer.png) | ![](docs/assets/spacer.png) |
|Engine API|Engine API| | |

---

### Contributing

Please see [CONTRIBUTING](https://github.com/qlik-demo-team/qdt-components/blob/master/CONTRIBUTING.md) to learn more.


### [Version Log](https://github.com/qlik-demo-team/qdt-components/blob/master/docs/components/QdtMapBox.md)
