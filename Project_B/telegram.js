let telegraph;
let morseCode;

function preload(){
    morseCode = loadSound("assets/morse_code.mp3");
}

function setup() {
  let cnv = createCanvas(600, 400);
  cnv.parent()
  telegraph = new Telegraph(100, 250, 400, 50);
}

function draw() {
  background(0,47,167);
  telegraph.display();
}

class Telegraph {
  constructor(x, y, baseWidth, baseHeight) {
    this.x = x;
    this.y = y;
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;

    this.leverAngle = 0;
    this.leverPressed = false;
  }

display() {
  strokeWeight(2);
  this.drawBase();
  this.drawLever();
  this.drawSupport();
  this.drawKnobs();
}

drawBase() {
  push();
  fill(139, 69, 19);
  rect(this.x, this.y, this.baseWidth, this.baseHeight);
  
  strokeWeight(2);
  for (let i = 0; i < 10; i++) {
    let x = this.x + this.baseWidth / 3;
    let y = this.y + i * 5;
    point(x, y);
  }
  for (let i = 0; i < 10; i++) {
    let x = this.x + this.baseWidth * 2 / 3;
    let y = this.y + i * 5;
    point(x, y);
  }
  
  fill(100);
  circle(this.x + this.baseWidth / 6, this.y + this.baseHeight / 2, 20);
  circle(this.x + this.baseWidth * 5 / 6, this.y + this.baseHeight / 2, 20);
  
  pop();
}

drawLever() {
  push();
  translate(this.x, this.y - 60);
  rotate(this.leverAngle);
  rectMode(CENTER);
  fill(181, 166, 66);
  rect(150, 10, 300, 20);
  pop();
}


drawKnobs() {
  fill(120);
  ellipse(this.x + 20, this.y - 70, 40, 30);
  ellipse(this.x + 120, this.y - 70, 40, 30);
}

drawSupport() {
  fill(181, 166, 66);
  rect(this.x, this.y - 60, 40, 60);
  rect(this.x + 100, this.y - 60, 40, 60);
}

press(mx, my) {
  if (mx > this.x && mx < this.x + this.baseWidth && my > this.y - 50 && my < this.y + this.baseHeight) {
    this.leverPressed = true;
    this.leverAngle = radians(8);
    morseCode.play();
  }
}

release() {
  this.leverPressed = false;
  this.leverAngle = 0;
  morseCode.pause();
}
}

function mousePressed() {
telegraph.press(mouseX, mouseY);
}

function mouseReleased() {
telegraph.release();
}