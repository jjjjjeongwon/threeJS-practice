// ex06 - 애니메이션 + 성능보정 (방법 2)

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
  // scene.background = new THREE.Color('blue');

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, //시야각
    window.innerWidth / window.innerHeight, //종횡비
    0.1, //near
    1000 //far
  );

  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  //Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    // color: 0xff0000
    // color:'0xff0000'
    color: 'red',
  });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  //그리기

  const clock = new THREE.Clock();

  function draw() {
    //각도는 Radian을 사용
    //360도는 2파이
    // mesh.rotation.y += 0.1;

    // mesh.rotation.y += THREE.MathUtils.degToRad(1);
    const delta = clock.getDelta(); //이전 draw 실행했을 때와 시간 차
    mesh.rotation.y += 2 * delta;
    mesh.position.y += 3 * delta;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
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
