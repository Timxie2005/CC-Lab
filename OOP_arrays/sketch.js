let cow1;
let cowIMG;

let cows = [];
let numCows = 20;

function preload(){
    cowIMG = loadImage("assets/cow-poster.png");
}

function setup(){
    let cnv = createCanvas(windowWidth,windowHeight);
    cnv.parent("canvas-parent");

    // cow1 = new Cow(200,200,cowIMG);

    for (let i = 0 ; i< numCows; i++){
        let oneCow = new Cow(random(width),random(height),cowIMG);
        cows.push(oneCow);
    }
}

function draw(){
    background(220,50,120);

    // cow1.display();
    // cow1.update();

    for (let i = 0 ; i< cows.length; i++){
        cows[i].display();
        cows[i].update();
    }
}

class Cow{
    constructor(startX,startY,img){
        this.x = startX;
        this.y = startY;
        this.photo = img;
        this.scaleFactor = random(0.4,0.5);

        this.xSpeed = 1;
        this.ySpeed = 1;
    }

    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x>width){
            this.x = random(width);
            this.y = random(height);
        }
    }

    display(){
        push();
        translate(this.x,this.y);
        scale(this.scaleFactor);

        // rect(0,0,50,50);

        let imgW = this.photo.width;
        let imgH = this.photo.height;
        image(this.photo,-imgW/2,-imgH+90);

        fill("blue");
        circle(0,0,5);

        pop();
    }
}