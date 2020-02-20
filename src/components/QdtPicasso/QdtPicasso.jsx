import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import picasso from 'picasso.js';
import picassoHammer from 'picasso-plugin-hammer';
import picassoQ from 'picasso-plugin-q';
import { easeCubic } from 'd3-ease';
import { timer } from 'd3-timer';
import { interpolate } from 'd3-interpolate';
// import { domPointLabel, domPointImage } from './picasso/components';
import '../../styles/index.scss';
import './style.scss';

// picasso.component('domPointLabel', domPointLabel);
// picasso.component('domPointImage', domPointImage);
picasso.use(picassoHammer);
picasso.use(picassoQ);

const QdtPicasso = ({ model, layout, options: optionsProp }) => {
  const defaultOptions = {
    prio: 'canvas',
    settings: {},
  };
  const options = merge(defaultOptions, optionsProp);

  const elementNode = useRef(null);
  const pic = useRef(null);
  const transition = useRef(null);
  const staleLayout = useRef(layout);

  const stopTransition = useCallback(() => {
    transition.current.stop();
    transition.current = null;
    staleLayout.current = layout;
  }, [layout]);

  const create = useCallback(() => {
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
      model.beginSelections(['/qHyperCubeDef']);
    });
    pic.current.brush('select').on('update', (added, removed) => {
      const qValues = [...added, ...removed].map((v) => v.values[0]);
      model.selectHyperCubeValues('/qHyperCubeDef', qValues, false);
    });
    staleLayout.current = layout;
  }, [layout, model, options.prio, options.settings]);

  const update = useCallback(() => {
    if (transition.current) { stopTransition(); }

    const duration = 1500;
    const ease = easeCubic;
    transition.current = timer((elapsed) => {
      const t = Math.min(1, ease(elapsed / duration));
      const tweenLayout = interpolate(staleLayout.current, layout)(t);
      pic.current.update({
        data: [{
          type: 'q',
          key: 'qHyperCube',
          data: tweenLayout.qHyperCube,
        }],
        settings: options.settings,
      });
      if (t === 1) {
        stopTransition();
      }
    });
  }, [layout, options.settings, stopTransition]);

  const resize = useCallback(() => { pic.current.update(); }, [pic]);

  useEffect(() => {
    console.log(elementNode.current, pic.current);
    if (!pic.current) create();
    if (pic.current) update();
  }, [create, update, layout]);

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  return (
    <div ref={elementNode} style={{ width: '100%', height: '100%' }} />
  );
};

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
