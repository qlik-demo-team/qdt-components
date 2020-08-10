import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import picasso from 'picasso.js';
import picassoHammer from 'picasso-plugin-hammer';
import picassoQ from 'picasso-plugin-q';
import * as d3Ease from 'd3-ease';
import { timer } from 'd3-timer';
import { interpolate } from 'd3-interpolate';
import { format } from 'd3-format';
import ResizeObserver from 'resize-observer-polyfill';
import equal from 'deep-equal';
import merge from '../../utils/merge';
import QdtSelectionModal from '../QdtModal/QdtSelectionModal';
import domPointLabel from './components/domPointLabel';
import domPointImage from './components/domPointImage';
import treemap from './components/treemap';

picasso.component('domPointLabel', domPointLabel);
picasso.component('domPointImage', domPointImage);
picasso.component('treemap', treemap);
picasso.use(picassoHammer);
picasso.use(picassoQ);

// Custom formatter to change G to B (US Billions)
const formatterGtoB = () => (value) => format('.1s')(value).replace(/G/, 'B'); // .1s for no decimal on Billions
picasso.formatter('formatterGtoB', formatterGtoB);

const QdtPicasso = React.forwardRef(({ model, layout, options: optionsProp }, ref) => {
  const defaultOptions = {
    prio: 'canvas',
    settings: {
      formatters: {
        formatterGtoB: {
          type: 'formatterGtoB',
        },
      },
    },
    transition: {
      duration: 1000,
      easing: 'easeCubic',
    },
    width: '100%',
    height: '100%',
    showSelectionModal: true,
  };
  const options = merge(defaultOptions, optionsProp);

  const elementNode = useRef(null);
  const pic = useRef(null);
  const transition = useRef(null);
  const tweenLayout = useRef(null);
  const staleLayout = useRef(layout);
  const staleOptions = useRef(options);
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);

  ref.current = { node: elementNode.current, pic: pic.current };  //eslint-disable-line

  const stopTransition = useCallback(() => {
    transition.current.stop();
    transition.current = null;
    staleLayout.current = layout;
    staleOptions.current = options;
  }, [layout, options]);

  const create = useCallback(() => {
    if (!layout.qHyperCube) return;
    pic.current = picasso({
      renderer: { prio: [options.prio] },
    }).chart({
      element: elementNode.current,
      data: [{
        type: 'q',
        key: 'qHyperCube',
        data: layout.qHyperCube,
      }],
      settings: options.settings,
    });
    pic.current.brush('select').on('start', () => {
      if (options.showSelectionModal) {
        model.beginSelections(['/qHyperCubeDef']);
        setSelectionModalOpen(true);
      }
    });
    pic.current.brush('select').on('update', (added, removed) => {
      const qDimNo = 0;
      let qValues = [];
      // If there are more than one dimensions, ie Treemap
      if (added.length > 1 || removed.length > 1) {
        if (added.length) qValues.push(added[0].values[0]);
        if (removed.length) qValues.push(removed[0].values[0]);
      } else {
        qValues = [...added, ...removed].map((v) => v.values[0]);
      }
      // Avoid multiple selections by the transition update() function below
      if (!transition.current) model.selectHyperCubeValues('/qHyperCubeDef', qDimNo, qValues, true);
    });
    staleLayout.current = layout;
    staleOptions.current = options;
  }, [layout, model, options]);

  const update = useCallback(() => {
    if (transition.current) {
      stopTransition();
      staleLayout.current = tweenLayout.current;
    }
    if (!layout.qHyperCube) return;
    const { duration } = options.transition;
    const ease = d3Ease[options.transition.easing];
    transition.current = timer((elapsed) => {
      const t = Math.min(1, ease(elapsed / duration));
      tweenLayout.current = interpolate(staleLayout.current, layout)(t);
      pic.current.update({
        data: [{
          type: 'q',
          key: 'qHyperCube',
          data: tweenLayout.current.qHyperCube,
        }],
        settings: options.settings,
      });
      if (t === 1) {
        stopTransition();
      }
    });
  }, [layout, options.settings, options.transition, stopTransition]);

  const handleCancelSelections = () => {
    pic.current.brush('select').end();
    model.endSelections(false);
    setSelectionModalOpen(false);
  };

  const handleConfirmSelections = () => {
    pic.current.brush('select').end();
    model.endSelections(true);
    setSelectionModalOpen(false);
  };

  useEffect(() => {
    if (!pic.current) create();
    if (pic.current && !selectionModalOpen && (!equal(staleLayout.current, layout) || JSON.stringify(staleOptions.current) !== JSON.stringify(options))) update();
    ref.current = { node: elementNode.current, pic: pic.current };  //eslint-disable-line
  }, [create, update, layout, options, ref, selectionModalOpen]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (pic.current) pic.current.update();
    });
    ro.observe(elementNode.current);
  }, []);

  return (
    <div style={{ width: options.width, height: options.height }}>
      <div ref={elementNode} style={{ width: options.width, height: options.height, border: (selectionModalOpen) ? '1px solid #CCCCCC' : 0 }} />
      { options.showSelectionModal
        && <QdtSelectionModal style={{ width: options.width }} isOpen={selectionModalOpen} onCancelSelections={handleCancelSelections} onConfirmSelections={handleConfirmSelections} />}
    </div>
  );
});

QdtPicasso.propTypes = {
  layout: PropTypes.object,
  model: PropTypes.object,
  options: PropTypes.object,
};
QdtPicasso.defaultProps = {
  layout: null,
  model: null,
  options: {},
};

export default QdtPicasso;
