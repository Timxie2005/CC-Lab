let circleX, circleY; // Current position of the main body
let targetX, targetY; // Next position of the main body

let alerting = false;

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container")

  // Body initial position setting
  circleX = random(175, 625); // The moving area of the creature
  circleY = random(75, 425);
  targetX = random(175, 625);
  targetY = random(75, 425);

}

function draw() {
  background(0);

  caution_area(); // Draw the caution area

  // Draw the main body
  fill(192, 192, 192); // Silver
  circle(circleX, circleY, 150);

  // Supporting arm movement
  push();
  stroke(192, 192, 192);
  strokeWeight(10);

  let twoCenterDistance = dist(400, 250, circleX, circleY);

  if (twoCenterDistance >= 225) {
    line(400, 250, circleX, circleY);
  } else if(twoCenterDistance == 0){
    //Do not show the bracket
  }else {
    let pointPosition = calculatePointPosition(
      circleX,
      circleY,
      twoCenterDistance
    ); // Calculate the position of the bracket connection point
    let armX = pointPosition[0];
    let armY = pointPosition[1];
    line(400, 250, armX, armY);
    line(circleX, circleY, armX, armY);
  }
  pop();

  // Draw the screen of the monitor
  push();
  fill(0);
  rectMode(CENTER);
  rect(circleX, circleY, 100, 75);
  pop();

  // Calculate the speed of the mouse
  let mouseDistance = dist(pmouseX, pmouseY, mouseX, mouseY);
  let mouseSpeed = mouseDistance / (deltaTime / 1000);

  // Respond to the mouseSpeed
  if (mouseSpeed == 0) { // Moving around casually
    alerting = false;
    // Draw the eye
    drawMonitorEye(circleX,circleY);
    // Draw the arms
    arms(circleX, circleY);
    // Make movements
    move(true);
  } else if (mouseSpeed >= 500) { // Alerting
    alerting = true;
    // Change the eye into !
    drawExclamationMark(circleX, circleY);
    // Draw the arms
    arms(circleX, circleY);
  } else {
    alerting = false;
    move(false);
  }
}

// Draw the caution area on the background
function caution_area() {
  // Text settings
  textSize(12);
  textAlign(CENTER);
  angleMode(DEGREES);

  let cx = width / 2;
  let cy = height / 2;
  let radius = 225;
  let textRadius = radius - 6;
  let textStr = "DANGER! ";
  let textLen = textWidth(textStr);
  let circumference = TWO_PI * textRadius;
  let numRepeats = int(circumference / textLen);

  fill(255, 165, 0);
  for (let i = 0; i < numRepeats; i++) {
    let angle = i * (360 / numRepeats);
    let x = cx + textRadius * cos(angle);
    let y = cy + textRadius * sin(angle);
    push();
    translate(x, y);
    rotate(angle + 90);
    text(textStr, 0, 0);
    pop();
  }
}

// Move the creature randomly to a new position
function move(decider) {
  if (decider){
    // Moving to the target position
  let dx = targetX - circleX;
  let dy = targetY - circleY;
  circleX += dx * 0.05;
  circleY += dy * 0.05;

  // Selecting another new position when reached the target
  let d = dist(circleX, circleY, targetX, targetY);
  if (d < 1) {
    targetX = random(175, 625);
    targetY = random(75, 425);
    }
  }else{
    circleX = 400;
    circleY = 250;
  }
  
}

// Calculate the position of the bracket
function calculatePointPosition(circleX, circleY, d) {
  let centerX = 400;
  let centerY = 250;
  let radius = 112.5;
  let a = (radius * radius - radius * radius + d * d) / (2 * d);
  let h = sqrt(radius * radius - a * a);
  let x2 = centerX + (a * (circleX - centerX)) / d;
  let y2 = centerY + (a * (circleY - centerY)) / d;
  let rx = -(circleY - centerY) * (h / d);
  let ry = -(circleX - centerX) * (h / d);

  let intersectionPoint = [x2 + rx, y2 - ry];

  return intersectionPoint;
}

// Draw the rotating arms
function arms(circleX, circleY) {
  push();
  translate(circleX, circleY);

  if (!alerting) { // Moving
    let angleOffset = frameCount;
    rotate(angleOffset);
    for (let i = 0; i < 4; i++) {
      let angle = 90 * i;
      push();
      rotate(angle);
      fill(192, 192, 192); // Silver
      rect(100, -10, 60, 20);
      pop();
    }
  } else { // Cross Shape
    for (let i = 0; i < 4; i++) {
      let angle = 90 * i;
      push();
      rotate(angle);
      fill(255, 165, 0); // Orange
      rect(100, -10, 60, 20);
      pop();
    }
  }
  pop();
}

// Draw a monitor-like eye
function drawMonitorEye(circleX,circleY) {
  push();
  fill(0);
  stroke(255);
  line(circleX - 40, circleY - 25, circleX + 40, circleY - 25);
  line(circleX - 40, circleY + 25, circleX + 40, circleY + 25);
  
  //Calculate the eye's position
  let vectorX = circleX - 400;
  let vectorY = circleY - 250;
  let vectorLength = dist(400, 250, circleX, circleY);
  let directionX = vectorX / vectorLength;
  let directionY = vectorY / vectorLength;
  
  let eyeDistance = 15; // Distance from the center of the circle
  eyeOffsetX = directionX * eyeDistance;
  eyeOffsetY = directionY * eyeDistance;

  fill(255, 0, 0);
  noStroke();
  circle(circleX + eyeOffsetX, circleY + eyeOffsetY, 10);

  pop();
}

// Draw a exclamation mark
function drawExclamationMark(circleX, circleY) {
  push();

  fill(255, 165, 0);
  ellipse(circleX, circleY - 10, 10, 50);
  circle(circleX, circleY + 25, 10);

  pop();
}
