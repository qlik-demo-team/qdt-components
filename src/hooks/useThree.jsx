// import {
//   useCallback, useRef, useReducer, useEffect,
// } from 'react';
import merge from 'deepmerge';
// import { Scene } from 'three';
import { TweenMax } from 'gsap';
import { Scene } from '../../node_modules/three/build/three';

const useThree = ({ layout, options: optionsProp }) => {
  const defaultOptions = {
  };
  const options = (optionsProp) ? merge(defaultOptions, optionsProp) : defaultOptions;
  const scene = new Scene();
  console.log(layout, options, scene, TweenMax);

  return {
    layout, options,
  };
};

export default useThree;
