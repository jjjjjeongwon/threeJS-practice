// ex03 - 배경 색, 투명도 설정

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
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // console.log(window.devicePixelRatio);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // renderer.setClearColor('#00ff00');
  // renderer.setClearAlpha(0.5);

  //Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('blue');

  // Camera
  // const camera = new THREE.PerspectiveCamera(
  //   75, //시야각
  //   window.innerWidth / window.innerHeight, //종횡비
  //   0.1, //near
  //   1000 //far
  // );

  // camera.position.z = 5;
  // camera.position.y = 2;
  // camera.position.x = 1;
  // scene.add(camera);

  //Orthographic Camera
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), //left
    window.innerWidth / window.innerHeight, //right
    1,
    -1,
    0.1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 3;
  camera.position.z = 8;
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5; //Orthographic Camera에서는 zoom out 효과를 주려면 z로 수정하는게 아니라 이걸로 수정해야함
  camera.updateProjectionMatrix(); //zoom설정하려면 이것까지 같이 사용
  scene.add(camera);

  //Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    // color: 0xff0000
    // color:'0xff0000'
    color: 'red',
  });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  //그리기
  renderer.render(scene, camera);

  function setSize() {
    //카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  //이벤트
  window.addEventListener('resize', setSize);
}
