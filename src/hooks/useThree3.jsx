import {
  // useCallback, // useRef, useReducer,
  useState,
  useEffect,
} from 'react';
// import merge from 'deepmerge';
// import { Scene } from 'three';
import { TweenMax } from 'gsap';

import {
  Scene, Camera, DirectionalLight, BoxGeometry, Mesh, MeshLambertMaterial, WebGLRenderer, Matrix4, Vector3, PlaneGeometry,
} from 'three/build/three';

const useThree = ({ layout, options }) => {
  const [state, setState] = useState({
    scene: null,
    camera: null,
    renderer: null,
  });
  const { scene, camera, renderer } = state;
  // const maxBarΝumberFromData = 0;
  let maxNumberOfBars = 0;

  const minimizeBars = () => {
    for (let index = 0; index <= maxNumberOfBars; index += 1) {
      const bar = scene.getObjectByName(`bar-${index}`, true);
      TweenMax.to(bar.scale, 1, { y: 1 }); // 0 creates errors
      TweenMax.to(bar.position, 1, { y: 1 });
      TweenMax.to(bar.material, 1, { opacity: 0 });
    }
  };

  const raiseBars = () => {
    for (let index = 0; index <= maxNumberOfBars; index += 1) {
      const bar = scene.getObjectByName(`bar-${index}`, true);
      TweenMax.to(bar.scale, 2, { y: bar.userData.y }); // 0 creates errors
      TweenMax.to(bar.position, 2, { y: bar.userData.y / 2 });
      TweenMax.to(bar.material, 1, { opacity: 1 });
    }
  };

  // Create Bars
  const createBar = (posx, posz, posy, order, maxBarΝumberFromData) => new Promise((resolve) => {
    const max = 3000;
    const ratio = Number(posy) / Number(maxBarΝumberFromData); // ) / 100) * max;
    const y = max * ratio;
    const _posy = 1;
    const geometry = new BoxGeometry(150, 1, 150, 1, 1, 1);
    const material = new MeshLambertMaterial({ color: 0xfffff, transparent: true });
    const bar = new Mesh(geometry, material);
    bar.position.set(posx, _posy, posz);
    bar.name = `bar-${order}`;
    bar.userData.y = y;
    bar.material.opacity = 1;
    scene.add(bar);
    // Animate
    TweenMax.to(bar.scale, 1, { y, delay: order * 0.1 + 1 });
    TweenMax.to(bar.position, 1, { y: y / 2, delay: order * 0.1 + 1 });
    maxNumberOfBars = order;
    resolve(true);
  });

  // create two three.js lights to illuminate the model
  const createLights = () => {
    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.position.set(-90, 200, 130).normalize();
    scene.add(directionalLight);
    const directionalLight2 = new DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(90, 20, -100).normalize();
    scene.add(directionalLight2);
  };

  // Create Ground Plane
  const createGroundPlane = () => {
    // create the ground plane
    const planeGeometry = new PlaneGeometry(60, 20);
    const planeMaterial = new MeshLambertMaterial({ color: 0xffffff });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    // add the plane to the scene
    scene.add(plane);
  };

  const createScene = () => {  // eslint-disable-line
    console.log('createScene');
    if (!scene && !camera && !renderer) {
      setState({
        scene: new Scene(),
        camera: new Camera(),
        renderer: new WebGLRenderer({ // use the Mapbox GL JS map canvas for three.js
          canvas: options.canvas,
          context: options.context,
          antialias: true,
        }),
      });
    }
    createLights();

    // renderer.autoClear = false;
  };

  // For mapbox
  const renderScene = (mapboxgl, matrix) => {
    // parameters to ensure the model is georeferenced correctly on the map
    const modelOrigin = [-97.531708, 39.305878];
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];
    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude,
    );

    // transformation parameters to position, rotate and scale the 3D model onto the map
    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since our 3D model is in real world meters, a scale transform needs to be
    * applied since the CustomLayerInterface expects units in MercatorCoordinates.
    */
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    const rotationX = new Matrix4().makeRotationAxis(
      new Vector3(1, 0, 0),
      modelTransform.rotateX,
    );
    const rotationY = new Matrix4().makeRotationAxis(
      new Vector3(0, 1, 0),
      modelTransform.rotateY,
    );
    const rotationZ = new Matrix4().makeRotationAxis(
      new Vector3(0, 0, 1),
      modelTransform.rotateZ,
    );

    const m = new Matrix4().fromArray(matrix);
    const l = new Matrix4()
      .makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ,
      )
      .scale(
        new Vector3(
          modelTransform.scale,
          -modelTransform.scale,
          modelTransform.scale,
        ),
      )
      .multiply(rotationX)
      .multiply(rotationY)
      .multiply(rotationZ);

    camera.projectionMatrix = m.multiply(l);

    renderer.state.reset();
    renderer.render(scene, camera);
  };


  // const init = () => {
  //   layout.qHyperCube.qDataPages[0].qMatrix.forEach((row) => {
  //     maxBarΝumberFromData = (maxBarΝumberFromData < row[1].qNum) ? row[1].qNum : maxBarΝumberFromData;
  //   });
  // if (options.canvas) createScene();

  useEffect(() => {
    if (options.canvas) createScene();
  }, [createScene, options.canvas]);
  // };

  // init();

  return {
    scene, layout, createBar, minimizeBars, raiseBars, renderScene, createGroundPlane,
  };
};

export default useThree;
