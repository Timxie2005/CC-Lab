let heightOfscrollDiv = document.getElementById("scrollDiv").scrollHeight;
console.log("heightOfscrollDiv", heightOfscrollDiv)
let availableScrollSpace = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  console.log(windowHeight)
  canvas.parent("canvasContainer");
  
  availableScrollSpace = heightOfscrollDiv - windowHeight;
}

function draw() {
  background(220);
  //

  
  textSize(10)
  text("dog tooth", width/2, height/2);
  let scrollDistance = window.scrollY;
  text(scrollDistance, width/2, height/2 + 20);
  let scrollPercentage = scrollDistance/availableScrollSpace;
  text(scrollPercentage, width/2, height/2 + 40);

  let dogY = map(scrollPercentage, 0, 1, height/2, -20);
  textSize(30);
  // circle(width/2+100, dogY, 10);
  text("🦷", width/2+100, dogY);

  let dogXsin = map(scrollPercentage, 0, 1, PI, 4*PI);
  let dogX = map(sin(dogXsin), -1, 1, width/2+50, width/2+150)
  text("🦷", dogX, height/2);

  

}

