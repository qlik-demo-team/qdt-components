![Banner](assets/graphic.png "Banner") 

[![latest npm badge](https://img.shields.io/npm/v/qdt-components/latest.svg)](https://www.npmjs.com/package/qdt-components) [![Greenkeeper badge](https://badges.greenkeeper.io/qlik-demo-team/qdt-components.svg)](https://greenkeeper.io/)

# Qdt (aka Qlik Demo Team) Components

- Qlik-powered components built by the Qlik Demo Team. For use with simple html, Angular6, React 16 and Vue 2

### Installation
- `npm install --save qdt-components`

### Live Demo with the latest additions
- https://qdt-apps.qlik.com/qdt-components/react/

### Usage

Click below to see how you can use qdt-components

* #### [On a simple Html page](docs/usage/Html.md)

* #### [With Angular](docs/usage/Angular.md)

* #### [With React](docs/usage/React.md)

* #### [With Vue](docs/usage/Vue.md)


### Component Docs ###

* #### [QtdViz](docs/QdtViz.md)

* #### [QtdFilter](docs/QdtFilter.md)

* #### [QdtSelectionToolbar](docs/QdtSelectionToolbar.md)

* #### [QdtPicasso](docs/QdtPicassos.md)

* #### [QdtSearch](docs/QdtSearch.md)

* #### QdtButton

* #### QdtTable

* #### QdtCurrentSelections


- #### [QtdMapBox](https://github.com/qlik-demo-team/qdt-components/blob/master/docs/QdtMapBox.md)

### Contributing

- We welcome all contributions to this project.
- We do not need a signed CLA agreeement.
- For a local installation, start with `npm install` and then `npm run start`
- Before you commit, run `npm run lint` and that there are no warnings or errors.
- Follow the commit message guidelines below

### Commit message guidelines

Commit messages should follow the [commit message convention](https://www.conventionalcommits.org/en/v1.0.0).

Type
Should be one of the following:

- build: Changes that affect the build system or external dependencies
- chore: Changes to build and dev processes/tools
- ci: Changes to the CI configuration files and scripts
- docs: Changes to documentation
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: Changes to production code that is neither a new feature nor a bug fix
- revert: Reverts a previous commit
- style: Changes to code style formatting (white space, commas etc)
- test: Changes in test cases of production code

### Version Log
- 2.1.0   Add mapbox
- 2.0.0   Rewrite with hooks
- 1.3.13  Adapt for Qlik Core scaling https://github.com/qlik-oss/core-scaling
- 1.3.12  Expose globals like qlik and qlik.resize() so they can be used in mashups like 
          `const globals = QdtComponents.globals`
- 1.3.11  Add Qlik color palette
- 1.3.10  Fix the download url for the exportData img and pdf
- 1.3.9   Fixes for the picasso horizontal bar chart
          Add qInterColumnSortOrder, qSuppressZero, qSortByNumeric in the withHyperCube
          Update picasso to 0.15.0 (Fixed many tooltip and selection issues).
- 1.3.8   Add export button(s) the visualization from the Capability API to Csv, Image and Pdf
- 1.3.7   Abort all selections before beginSelections is called to avoid errors on more than one components on the same page.
          Bumpup qdt-lui.
- 1.3.6   QdtFilter - Add sorting by Ascii and LoadOrder
- 1.3.5   QdtFilter UI changes. Placeholder with selectionson the dropdown
- 1.3.4   Add qSortByLoadOrder in the withListObject. 
          Fix QdtFilter on single selection to close the dropDown and add the selection in the placeholder. 
          Various css ui changes
- 1.3.3   Fix Gauge labels and range area point stroke
- 1.3.2   Expose Interactions to the Dom.
- 1.3.1   Add Theme coloring for picasso charts.
- 1.3.0   Bump up Picasso.js.
          Change the tooltip to the new one from Picasso. 
          Break Picasso settings into reusable components and expose them to the Dom.
- 1.2.1   bumpup qdt-lui to include the tabset.
- 1.2.0   QdtFilter - add tabset for horizontal menu.
- 1.1.70  QdtPicasso - add rangeArea chart
- 1.1.69  QdtPicasso - add prio prop for rendering svg. It defaults to canvas
- 1.1.68  Better unmount handling thnx to @humean (Michael Rutter)
- 1.1.67  Add Vertical Bar Gauge
- 1.1.66  Add Vertical Bar Gauge with Range Limits
