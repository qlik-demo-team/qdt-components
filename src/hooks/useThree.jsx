import { TweenMax } from 'gsap';
import {
  Scene, DirectionalLight, BoxGeometry, Mesh, MeshLambertMaterial, WebGLRenderer, Matrix4, Vector3, PlaneGeometry, SphereGeometry, SpotLight, PerspectiveCamera, CameraHelper,
} from 'three/build/three';

const useThree = ({ layout, options }) => {
  const scene = new Scene();
  let renderer;
  let maxNumberOfBars = 0;
  const showCameraHelper = 0;
  let mapWidth = window.innerWidth;
  let mapHeight = window.innerHeight;
  if (options.domElement) {
    mapWidth = options.domElement.getBoundingClientRect().width;
    mapHeight = options.domElement.getBoundingClientRect().height;
  } else if (options.canvas) {
    mapWidth = options.canvas.width;
    mapHeight = options.canvas.height;
  }
  const camera = new PerspectiveCamera(45, mapWidth / mapHeight, 0.1, 1000);
  camera.name = 'camera';

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
  const createBar = ({
    posx = 0,
    posz = 0,
    posy = 0,
    width = 4,
    height = 4,
    depth = 4,
    order = 1,
    maxBarΝumberFromData = 10,
    color = 0xfffff,
  }) => new Promise((resolve) => {
    const max = 3000;
    const ratio = Number(posy) / Number(maxBarΝumberFromData); // ) / 100) * max;
    const y = max * ratio;
    const _posy = 1;
    const geometry = new BoxGeometry(width, height, depth, 1, 1, 1);
    const material = new MeshLambertMaterial({ color, transparent: true });
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
    directionalLight.name = 'light-1';
    scene.add(directionalLight);
    const directionalLight2 = new DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(90, 20, -100).normalize();
    directionalLight2.name = 'light-2';
    scene.add(directionalLight2);
    if (showCameraHelper) {
      const helper = new CameraHelper(camera);
      scene.add(helper);
    }
  };

  const handleWindowResize = () => {
    mapWidth = window.innerWidth;
    mapHeight = window.innerHeight;
    if (options.domElement) {
      mapWidth = options.domElement.getBoundingClientRect().width;
      mapHeight = options.domElement.getBoundingClientRect().height;
    } else if (options.canvas) {
      mapWidth = options.canvas.width;
      mapHeight = options.canvas.height;
    }
    camera.aspect = mapWidth / mapHeight;
    renderer.setSize(mapWidth, mapHeight);
  };

  const finalRender = () => {
    if (!renderer) {
      if (options.domElement) {
        renderer = new WebGLRenderer();
        renderer.setSize(options.domElement.getBoundingClientRect().width, options.domElement.getBoundingClientRect().height);
        options.domElement.appendChild(renderer.domElement);
      } else {
        // use the Mapbox GL JS map canvas for three.js
        renderer = new WebGLRenderer({
          canvas: options.canvas,
          context: options.context,
          antialias: true,
        });
        renderer.autoClear = false;
      }
    }

    window.addEventListener('resize', handleWindowResize, false);
    renderer.state.reset();
    // call the render function
    renderer.render(scene, camera);
  };

  // Create Ground Plane
  const createGroundPlane = () => {
    // renderer.setClearColor(new Color(0xEEEEEE, 1.0));
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.shadowMapEnabled = true;

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

    // create a cube
    // const cubeGeometry = new BoxGeometry(4, 4, 4);
    // const cubeMaterial = new MeshLambertMaterial({ color: 0xff0000 });
    // const cube = new Mesh(cubeGeometry, cubeMaterial);
    // cube.castShadow = true;

    // // position the cube
    // cube.position.x = -4;
    // cube.position.y = 3;
    // cube.position.z = 0;

    // // add the cube to the scene
    // scene.add(cube);

    // createBar = (posx, posz, posy, width, height, depth, order, maxBarΝumberFromData)
    // createBar(-4, 0, 3, 4, 4, 4, 1, 8);
    createBar({ posx: -4, posy: 3 });

    const sphereGeometry = new SphereGeometry(4, 20, 20);
    const sphereMaterial = new MeshLambertMaterial({ color: 0x7777ff });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;

    // add the sphere to the scene
    scene.add(sphere);

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add spotlight for the shadows
    const spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    finalRender();
  };

  const createScene = () => {  // eslint-disable-line
    createLights();
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
  };

  if (options.canvas || options.domElement) createScene();

  return {
    scene, layout, createBar, minimizeBars, raiseBars, renderScene, createGroundPlane, finalRender,
  };
};

export default useThree;
