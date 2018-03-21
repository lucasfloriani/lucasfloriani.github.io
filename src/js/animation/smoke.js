import { Clock, CubeGeometry, DirectionalLight, ImageUtils, Mesh, MeshLambertMaterial, PerspectiveCamera, PlaneGeometry, Scene, WebGLRenderer } from 'three';

let camera;
let scene;
let renderer;
let material;
let mesh;
let cubeSineDriver;
let smokeParticles;
let delta;
let clock;

function init() {
  clock = new Clock();

  renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new Scene();

  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;
  scene.add(camera);

  const geometry = new CubeGeometry(200, 200, 200);
  material = new MeshLambertMaterial({ color: 0xaa6666, wireframe: false });
  mesh = new Mesh(geometry, material);
  cubeSineDriver = 0;

  const light = new DirectionalLight(0xffffff, 0.5);
  light.position.set(-1, 0, 1);
  scene.add(light);

  const textureUrl = 'src/img/smoke.png';
  const smokeTexture = ImageUtils.loadTexture(textureUrl);
  const smokeOjb = { color: 0xa28aaa, map: smokeTexture, transparent: true };
  const smokeMaterial = new MeshLambertMaterial(smokeOjb);
  const smokeGeo = new PlaneGeometry(300, 300);
  smokeParticles = [];


  for (let p = 0; p < 150; p += 1) {
    let particle = new Mesh(smokeGeo, smokeMaterial);
    let firstPosition = (Math.random() * 500) - 250;
    let secondPosition = (Math.random() * 500) - 250;
    let thirdPosition = (Math.random() * 1000) - 100;

    particle.position.set(firstPosition, secondPosition, thirdPosition);
    particle.rotation.z = Math.random() * 360;
    scene.add(particle);
    smokeParticles.push(particle);
  }

  document.body.appendChild(renderer.domElement);
}

function evolveSmoke() {
  let sp = smokeParticles.length;
  while (sp) {
    sp -= 1;
    smokeParticles[sp].rotation.z += (delta * 0.2);
  }
}

function render() {
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;
  cubeSineDriver += 0.01;
  mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
  renderer.render(scene, camera);
}

function animate() {
  delta = clock.getDelta();
  requestAnimationFrame(animate);
  evolveSmoke();
  render();
}

init();
animate();
