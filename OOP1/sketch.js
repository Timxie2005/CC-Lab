let instanceOfTaxi;
let taxi2;

let honk1;
let honk2;
let ambience;

function preload(){
    honk1 = loadSound("assets/honk1.mp3");
    honk2 = loadSound("assets/hink2.mp3");
    ambience = loadSound("assets/ambience.mp3");
}

function setup(){
    let cnv = createCanvas(400,400);
    cnv.parent("canvas-parent");

    instanceOfTaxi = new Taxi(width/2-100,height/2,1);
    taxi2 = new Taxi(width/2+100,height/2,0.7);

    console.log(instanceOfTaxi);
}

function draw(){
    background(0,49,167);

    instanceOfTaxi.display();
    instanceOfTaxi.update();
    instanceOfTaxi.maybeHonk();

    taxi2.display();
    taxi2.update();
}

class Taxi{
    constructor(startX,startY,scaleFactor){
        //properties
        this.x = startX;
        this.y = startY;
        this.s = scaleFactor;
        this.wheelAngle = 45;
        this.wheelSpeed = 1;
        this.speed = random(-2,2);
    }

    display(){
        push();
        translate(this.x, this.y);
        scale(this.s);

            noStroke();
            fill(240, 220, 60);

            // base:
            rect(-50, -50, 100, 30);
            // top"
            rect(-25, -70, 50, 20);
            // wheel 1:
            this.drawWheel(-30, -15);
            // wheel 2:
            this.drawWheel( 30, -15);


            // just to see origin 
            // of translation matrix:
            fill("red");
            circle(0, 0, 5); 

        pop();
    }

    drawWheel(wheelx, wheely){
        push();
        translate(wheelx, wheely);
        rotate(radians(this.wheelAngle));

            noStroke();
            fill(0);
            // circle(0,0,30);
            ellipse(0,0,30, 27);

        pop();
    }

    // spinWheel(){
    //     this.wheelAngle += this.wheelSpeed;
    // }

    // move(){
    //     this.x += this.speed
    // }
    maybeHonk(){
        if (random(0,10) < 1){
            if(random() < 0.5){
                honk1.play();
            }else{
                honk2.play();
            }
        }
    }

    update(){
        //spinWheel
        this.wheelAngle += this.wheelSpeed;
        //move
        this.x += this.speed;
        //reappear
        if(this.x>width){
            this.x = 0;
        }
        if(this.x<0){
            this.x = width;
        }
    }
}