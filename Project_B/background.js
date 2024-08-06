let planeImg;
let heightOfScrollDiv;
let availableScrollSpace;

function preload() {
    planeImg = loadImage('assets/sandglass.png');
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvasContainer');
    
    heightOfScrollDiv = document.body.scrollHeight;
    availableScrollSpace = heightOfScrollDiv - windowHeight;
}

function draw() {
    clear();
    
    let scrollDistance = window.scrollY;
    let scrollPercentage = scrollDistance / availableScrollSpace;
    
    let planeY = map(scrollPercentage, 0, 1, 0, height - 50);
    let planeXsin = map(scrollPercentage, 0, 1, 0, PI * 4); // 4 full sine waves
    let planeX = map(sin(planeXsin), -1, 1, 50, width / 2); // Move within the left half of the screen
    
    image(planeImg, planeX, planeY, 100, 50); // Adjust the size as needed

    // push();
    // translate(100, 100);
    // iphone.display();
    // pop();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

  