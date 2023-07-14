// ex07 - 안개

import * as THREE from 'three';

export default function example() {
  // 동적으로 캔버스 조립하기
  // const renderer = new THREE.WebGL1Renderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    // alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // console.log(window.devicePixelRatio);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // renderer.setClearColor('#00ff00');
  // renderer.setClearAlpha(0.5);

  //Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('black', 3, 7); // Fog(color, near, far)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, //시야각
    window.innerWidth / window.innerHeight, //종횡비
    0.1, //near
    1000 //far
  );

  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 5;

  scene.add(light);

  //Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 'red',
  });

  const meshes = [];
  let mesh;

  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  scene.add(mesh);

  //그리기
  let oldTime = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;

    meshes.forEach((item) => {
      item.rotation.y += deltaTime * 0.001;
    });

    renderer.render(scene, camera);

    // 같은 기능
    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    //카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  //이벤트
  window.addEventListener('resize', setSize);

  draw();
}
