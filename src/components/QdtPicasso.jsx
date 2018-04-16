import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import picasso from 'picasso.js';
import picassoHammer from 'picasso-plugin-hammer';
import picassoQ from 'picasso-plugin-q';
import withHyperCube from './withHyperCube';
import tooltip from '../picasso/components/tooltip';
import domPointLabel from '../picasso/components/domPointLabel';
import domPointImage from '../picasso/components/domPointImage';
import preconfiguredSettings from '../picasso/settings';
import '../styles/index.scss';


// check into fixing size of bars in barchart

// tooltip

// parameterize settings and sizing.

// fix styles.

// add brush selections? kinda neat.

// then worry about improved scrolling after commit.

picasso.component('tooltip', tooltip);
picasso.component('domPointLabel', domPointLabel);
picasso.component('domPointImage', domPointImage);
picasso.use(picassoHammer);
picasso.use(picassoQ);

class QdtPicassoComponent extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,
    beginSelections: PropTypes.func.isRequired,
    endSelections: PropTypes.func.isRequired,
    selections: PropTypes.bool.isRequired,
    type: PropTypes.string,
    options: PropTypes.object,
    settings: PropTypes.object,
  }
  static defaultProps = {
    type: null,
    options: {},
    settings: {},
  }

  componentDidMount() {
    this.createPic();
    window.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    this.updatePic();
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('resize', this.handleResize);
  }

  @autobind
  handleOutsideClick(event) {
    const outsideClick = !this.root.contains(event.target);
    if (outsideClick) {
      this.pic.brush('select').end();
      this.props.endSelections(true);
    }
  }

  @autobind
  handleResize() {
    this.pic.update();
  }

  @autobind
  cancelSelections() {
    this.pic.brush('select').end();
    this.props.endSelections(false);
  }
  @autobind
  confirmSelections() {
    this.pic.brush('select').end();
    this.props.endSelections(true);
  }

  @autobind
  createPic() {
    const {
      qLayout, qData, settings, type, options,
    } = this.props;
    const mySettings = type ? preconfiguredSettings[type] : settings;
    if (type === 'scatterplotImage' && options.href) {
      mySettings.components[4].settings.image = options.href;
      mySettings.components[4].settings.width = (options.imageWidth) ? options.imageWidth : 10;
      mySettings.components[4].settings.height = (options.imageHeight) ? options.imageHeight : 10;
      if (options.color) mySettings.components[4].settings.color = options.color;
      mySettings.components[5].settings.size = (options.imageWidth) ? options.imageWidth / 50 : 0.2; // Need this for tooltip to work
    }
    const data = { ...qLayout, qHyperCube: { ...qLayout.qHyperCube, qDataPages: [qData] } };
    this.pic = picasso({ renderer: { prio: ['canvas'] } }).chart({
      element: this.element,
      data: [{
        type: 'q',
        key: 'qHyperCube',
        data: data.qHyperCube,
      }],
      settings: mySettings,
    });

    this.pic.brush('select').on('start', () => { this.props.beginSelections(); });
    this.pic.brush('select').on('update', (added, removed) => {
      if (!this.props.selections) return;
      const selections = [...added, ...removed].map(v => v.values[0]);
      this.props.select(0, selections);
    });
  }

  @autobind
  updatePic() {
    if (this.props.selections) return;
    const { qLayout, qData } = this.props;
    const data = { ...qLayout, qHyperCube: { ...qLayout.qHyperCube, qDataPages: [qData] } };
    this.pic.update({
      data: [{
        type: 'q',
        key: 'qHyperCube',
        data: data.qHyperCube,
      }],
    });
  }

  render() {
    const { selections } = this.props;
    return (
      <div ref={node => this.root = node} style={{ position: 'relative' }}>
        {selections &&
          <div style={{ position: 'absolute', top: '-2rem', right: 0 }}>
            <button className="lui-button lui-button--danger" style={{ marginRight: '1rem' }} onClick={this.cancelSelections}>
              <span className="lui-icon lui-icon--close" />
            </button>
            <button className="lui-button lui-button--success" style={{ marginRight: '1rem' }} onClick={this.confirmSelections}>
              <span className="lui-icon lui-icon--tick" />
            </button>
          </div>
        }
        <div ref={node => this.element = node} style={{ position: 'relative', width: '100%', height: '500px' }} />
      </div>
    );
  }
}

const QdtPicasso = withHyperCube(QdtPicassoComponent);
QdtPicasso.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  cols: PropTypes.array,
  qHyperCubeDef: PropTypes.object,
  qPage: PropTypes.object,
  type: PropTypes.oneOf(['horizontalBarchart', 'verticalBarchart', 'piechart']),
  settings: PropTypes.object,
};
QdtPicasso.defaultProps = {
  cols: null,
  qHyperCubeDef: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 10,
    qHeight: 100,
  },
  type: null,
  settings: {},
};

export default QdtPicasso;
