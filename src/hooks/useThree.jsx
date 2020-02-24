// import {
//   useCallback, useRef, useReducer, useEffect,
// } from 'react';
import merge from 'deepmerge';
// import { Scene } from 'three';
import { TweenMax } from 'gsap';
import { Scene, Camera, DirectionalLight } from '../../node_modules/three/build/three';

const useThree = ({ layout, options: optionsProp }) => {
  const defaultOptions = {
  };
  const options = (optionsProp) ? merge(defaultOptions, optionsProp) : defaultOptions;
  const scene = new Scene();
  const camera = new Camera();

  // create two three.js lights to illuminate the model
  const directionalLight = new DirectionalLight(0xffffff);
  directionalLight.position.set(-90, 200, 130).normalize();
  scene.add(directionalLight);
  const directionalLight2 = new DirectionalLight(0xffffff, 0.3);
  directionalLight2.position.set(90, 20, -100).normalize();
  scene.add(directionalLight2);


  console.log(5, layout, options, scene, TweenMax, camera);

  return {
    layout, options,
  };
};

export default useThree;
