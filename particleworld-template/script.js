let particles = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(100);

  // Create new particles
  if (mouseIsPressed) {
    particles.push(new Particle(mouseX, mouseY));
  }

  // Limit the number of particles to 20
  if (particles.length > 50) {
    particles.splice(0, 1);
  }

  // Display all particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = 50;

    this.reverseX = width / 2 - (this.x - width / 2);
    this.reverseY = height / 2 - (this.y - height / 2);

    this.maxDist = dist(this.x,this.y,this.reverseX,this.reverseY);
    this.minDist = this.dia;

    this.approaching = true;
    this.xVector = (this.x - this.reverseX)/this.maxDist;
    this.yVector = (this.y - this.reverseY)/this.maxDist;

  }

  update() {
    this.createReverseParticle();
    this.connect();
    this.move();
  }

  createReverseParticle() {
    push();
    fill(255);
    // Draw reverse particle in global coordinates relative to the canvas center
    circle(this.reverseX, this.reverseY, this.dia);
    pop();
  }

  connect(){
    push();
    line(this.x, this.y,this.reverseX,this.reverseY);
    pop();
  }

  move(){
    if (this.approaching){
      this.x += this.xVector;
      this.y += this.yVector;
      this.reverseX -= this.xVector;
      this.reverseY -= this.yVector;
      if(dist(this.x,this.y,this.reverseX,this.reverseY) <= this.minDist){
        this.approaching = false;
      }
    }else{
      this.x -= this.xVector;
      this.y -= this.yVector;
      this.reverseX += this.xVector;
      this.reverseY += this.yVector;
      if(dist(this.x,this.y,this.reverseX,this.reverseY) <= this.minDist){
        this.approaching = false;
      }
    }
  }

  display() {
    push();
    fill(0);
    translate(this.x, this.y);
    circle(0, 0, this.dia);
    pop();
  }
}
