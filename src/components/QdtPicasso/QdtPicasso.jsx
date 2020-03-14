import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import picasso from 'picasso.js';
import picassoHammer from 'picasso-plugin-hammer';
import picassoQ from 'picasso-plugin-q';
import * as d3Ease from 'd3-ease';
import { timer } from 'd3-timer';
import { interpolate } from 'd3-interpolate';
import ResizeObserver from 'resize-observer-polyfill';
import equal from 'deep-equal';
import merge from '../../utils/merge';

picasso.use(picassoHammer);
picasso.use(picassoQ);

const QdtPicasso = React.forwardRef(({ model, layout, options: optionsProp }, ref) => {
  const defaultOptions = {
    prio: 'canvas',
    settings: {},
    transition: {
      duration: 1000,
      easing: 'easeCubic',
    },
    width: '100%',
    height: '100%',
  };
  const options = merge(defaultOptions, optionsProp);

  const elementNode = useRef(null);
  const pic = useRef(null);
  const transition = useRef(null);
  const staleLayout = useRef(layout);
  const staleOptions = useRef(options);

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
      model.beginSelections(['/qHyperCubeDef']);
    });
    pic.current.brush('select').on('update', (added, removed) => {
      const qValues = [...added, ...removed].map((v) => v.values[0]);
      model.selectHyperCubeValues('/qHyperCubeDef', qValues, false);
    });
    staleLayout.current = layout;
    staleOptions.current = options;
  }, [layout, model, options]);

  const update = useCallback(() => {
    if (transition.current) { stopTransition(); }

    const { duration } = options.transition;
    const ease = d3Ease[options.transition.easing];
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
  }, [layout, options.settings, options.transition, stopTransition]);

  useEffect(() => {
    if (!pic.current) create();
    if (pic.current && (!equal(staleLayout.current, layout) || !equal(staleOptions.current, options))) update();
    ref.current = { node: elementNode.current, pic: pic.current };  //eslint-disable-line
  }, [create, update, layout, options, ref]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (pic.current) pic.current.update();
    });
    ro.observe(elementNode.current);
  }, []);

  return (
    <div ref={elementNode} style={{ width: options.width, height: options.height }} />
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
