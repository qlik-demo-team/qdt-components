import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three/build/three';
import { TweenMax } from 'gsap';

const Box = ({
  posx = 0,
  posz = 0,
  posy = 0,
  width = 4,
  height = 4,
  depth = 4,
  order = 1,
  maxBarΝumberFromData = 10,
  scene = null,
}) => {
  const max = 3000;
  const ratio = Number(posy) / Number(maxBarΝumberFromData);
  const y = max * ratio;
  const _posy = 1;
  const geometry = new BoxGeometry(width, height, depth, 1, 1, 1);
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
};

export default Box;
