let confettis = [];
let numConfetti = 100;
let backgroundHUE;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  backgroundHUE = random(360);
}

function draw() {
  background(backgroundHUE, 10, 100);

  if(mouseIsPressed == true){
    for(let i = 0; i < numConfetti; i++){
      confettis.push(new Confetti(mouseX, mouseY))
    }
  }
  
  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].checkOutCanvas();
    confettis[i].display();
  }

  text(confettis.length,20,20);

  for(let i = 0; i < confettis.length; i++){
    if (confettis[i].onCanvas == false){
        confettis.splice(i,1);
    }
  }


}

class Confetti {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);

    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3); 

    this.cHUE = random(0, 360);

    this.onCanvas = true;

  }

  checkOutCanvas(){
    if(this.y>height){
        this.onCanvas = false;
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.1;
    this.speedX *= 0.99;
  }

  display() {    
    push();
    translate(this.x, this.y);
    fill(this.cHUE, 100, 100);
    noStroke();
    circle(0, 0, this.size);
    pop();
  }
}
