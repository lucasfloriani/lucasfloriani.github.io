import { Clock, CubeGeometry, DirectionalLight, ImageUtils, Mesh, MeshLambertMaterial, PerspectiveCamera, PlaneGeometry, Scene, WebGLRenderer } from 'three';

class Smoke {
  constructor() {
    this.clock = new Clock();
  }


  init() {
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new Scene();

    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;
    this.scene.add(this.camera);

    const geometry = new CubeGeometry(200, 200, 200);
    this.material = new MeshLambertMaterial({ color: 0xaa6666, wireframe: false });
    this.mesh = new Mesh(geometry, this.material);
    this.cubeSineDriver = 0;

    const light = new DirectionalLight(0xffffff, 0.5);
    light.position.set(-1, 0, 1);
    this.scene.add(light);

    const textureUrl = 'src/img/smoke.png';
    const smokeTexture = ImageUtils.loadTexture(textureUrl);
    const smokeOjb = { color: 0xa28aaa, map: smokeTexture, transparent: true };
    const smokeMaterial = new MeshLambertMaterial(smokeOjb);
    const smokeGeo = new PlaneGeometry(300, 300);
    this.smokeParticles = [];


    for (let p = 0; p < 150; p += 1) {
      let particle = new Mesh(smokeGeo, smokeMaterial);
      let firstPosition = (Math.random() * 500) - 250;
      let secondPosition = (Math.random() * 500) - 250;
      let thirdPosition = (Math.random() * 1000) - 100;

      particle.position.set(firstPosition, secondPosition, thirdPosition);
      particle.rotation.z = Math.random() * 360;
      this.scene.add(particle);
      this.smokeParticles.push(particle);
    }

    document.body.appendChild(this.renderer.domElement);

    this.animate();
  }

  evolveSmoke() {
    let sp = this.smokeParticles.length;
    while (sp) {
      sp -= 1;
      this.smokeParticles[sp].rotation.z += (this.delta * 0.2);
    }
  }

  render() {
    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.01;
    this.cubeSineDriver += 0.01;
    this.mesh.position.z = 100 + (Math.sin(this.cubeSineDriver) * 500);
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    this.delta = this.clock.getDelta();
    requestAnimationFrame(this.animate.bind(this));
    this.evolveSmoke();
    this.render();
  }
}

const smoke = new Smoke();
smoke.init();
