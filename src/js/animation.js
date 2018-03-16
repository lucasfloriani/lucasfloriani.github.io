class Animation {
  constructor() {
    this.bio = document.getElementById('js-bio');
    this.intro = document.getElementById('js-intro');
    this.spectre = document.getElementById('js-spectre');
    this.contact = document.getElementById('js-contact');
    this.projects = document.getElementById('js-projects');
    this.tecnologiesBackend = document.getElementById('js-tecnologies-backend');
    this.tecnologiesFrontend = document.getElementById('js-tecnologies-frontend');
  }

  rotateHexagon() {
    console.log(this.spectre);
  }

  smokeEffect() {
    console.log(this.spectre);
  }
}

const animation = new Animation();
animation.rotateHexagon();
