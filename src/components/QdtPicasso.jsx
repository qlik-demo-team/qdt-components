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
    outerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    outerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    innerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    innerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    type: PropTypes.string,
    settings: PropTypes.object,
  }
  static defaultProps = {
    type: null,
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
      qLayout, qData, settings, type,
    } = this.props;
    const mySettings = type ? preconfiguredSettings[type] : settings;
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

    this.pic.brush('select').on('start', () => { this.props.beginSelections(); this.props.select(0, [], false); });
    this.pic.brush('select').on('update', (added, removed) => {
      if (!this.props.selections) return;
      const selections = [...added, ...removed].map(v => v.values[0]);
      this.props.select(0, selections);
    });
    // this.pic.brush('next').on('start', (e) => { console.log(1); });
    // this.pic.brush('next').on('update', (e) => { console.log(2); });
    // Add events to the legend navigation arrows
    // if (this.pic.component('legend')) {
    //   console.log(1);
    //   this.pic.component('legend').emit('next');
    //   this.pic.component('legend').emit('prev');
    //   this.pic.component('legend').emit('scroll', 20);
    // }
    // const items = document.querySelectorAll('button[data-component-key]');
    // for (let index = 0; index < items.length; index += 1) {
    //   items[index].addEventListener('click', (e) => {
    //     e.preventDefault();
    //     this.pic.component(e.target.getAttribute('data-component-key')).emit(e.target.getAttribute('data-action'));
    //   });
    // }
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
    const {
      selections, type, qData, outerWidth, outerHeight, innerWidth, innerHeight,
    } = this.props;
    let maxWidth = '100%';
    let maxHeight = '100%';
    if (type === 'horizontalBarchart') {
      maxHeight = qData.qMatrix.length * 50;
    }
    if (type === 'verticalBarchart') {
      maxWidth = qData.qMatrix.length * 50;
    }
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
        <div style={{
          position: 'relative', width: outerWidth, height: outerHeight, overflow: 'auto',
        }}
        >
          <div
            ref={node => this.element = node}
            style={{
              width: innerWidth,
              height: innerHeight,
              maxWidth,
              maxHeight,
            }}
          />
        </div>
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
  outerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  outerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
QdtPicasso.defaultProps = {
  cols: null,
  qHyperCubeDef: null,
  qPage: {
    qTop: 0,
    qLeft: 0,
    qWidth: 10,
    qHeight: 1000,
  },
  type: null,
  settings: {},
  outerWidth: '100%',
  outerHeight: '100%',
  innerWidth: '100%',
  innerHeight: '100%',
};

export default QdtPicasso;
