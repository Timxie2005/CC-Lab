let planeImg;
let heightOfScrollDiv;
let availableScrollSpace;

// Variables for iphone
let emojis = ['😊', '😂', '😅', '😢', '👍'];
let iphone;
let iphoneSketchX = 10;
let iphoneSketchY = 200;

// Variables for telegram
let telegraph;
let morseCode;
let telegramSketchX = 10;
let telegramSketchY = 200;

function preload() {
    morseCode = loadSound("assets/morse_code.mp3");
    planeImg = loadImage('assets/sandglass.png');
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvasContainer');

    heightOfScrollDiv = document.body.scrollHeight;
    availableScrollSpace = heightOfScrollDiv - windowHeight;

    // iphone part
    iphone = new iPhone(50, 50, 300, 500);

    // Initialize emoji buttons
    let emojiButtonWidth = 56;
    let emojiButtonHeight = 50;
    for (let i = 0; i < emojis.length; i++) {
        let x = 60 + i * emojiButtonWidth;
        let y = 450;
        iphone.addEmojiButton(new EmojiButton(x, y, emojiButtonWidth, emojiButtonHeight, emojis[i]));
    }

    // telegram part
    telegraph = new Telegraph(100, 250, 400, 50);
}

function draw() {
    background(0, 47, 167);

    let scrollDistance = window.scrollY;
    let scrollPercentage = scrollDistance / availableScrollSpace;

    // Increase the range of planeY to the full height of the canvas
    let planeY = map(scrollPercentage, 0, 1, 0, height); // Increased the range

    // Increase the range of planeX to the full width of the canvas
    let planeXsin = map(scrollPercentage, 0, 1, 0, PI * 8); // Increased to 8 full sine waves
    let planeX = map(sin(planeXsin), -1, 1, 50, width); // Increased the range to full width

    push();
    translate(planeX, planeY);
    scale(0.1);
    if (scrollPercentage < 0.98){
        image(planeImg, 0 - planeImg.width / 2, 0 - planeImg.height / 2); 
        circle(0, 0, 10);
    }
    
    pop();

    if (scrollPercentage > 0.37 && scrollPercentage < 0.48) {
        push();
        translate(iphoneSketchX, iphoneSketchY);
        iphone.display();
        pop();
    }

    if(scrollPercentage > 0.6 && scrollPercentage < 0.7){
        push();
        translate(telegramSketchX, telegramSketchY);
        telegraph.display();
        pop();
    }
}


function mousePressed() {
    iphone.handleMousePress(mouseX, mouseY);
    telegraph.press(mouseX, mouseY);
}

function mouseReleased() {
    telegraph.release();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class EmojiButton {
    constructor(x, y, w, h, emoji) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.emoji = emoji;
    }

    display() {
        fill(255);
        rect(this.x, this.y, this.w, this.h, 10);
        textAlign(CENTER, CENTER);
        text(this.emoji, this.x + this.w / 2, this.y + this.h / 2);
    }

    isClicked(mx, my) {
        return (mx > this.x+iphoneSketchX) && (mx < this.x+iphoneSketchX + this.w) && (my > this.y+iphoneSketchY) && (my < this.y+iphoneSketchY + this.h);
    }

    getEmoji() {
        return this.emoji;
    }
}

//---------------------------------------------------------
class Message {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.messages = [];
    }

    addMessage(emoji, sentByUser) {
        if (this.messages.length >= 6) {
            this.messages.splice(0, 1); // Remove the oldest message
        }
        this.messages.push({ emoji: emoji, sentByUser: sentByUser });
    }

    display() {
        fill(0);
        textSize(24);
        for (let i = 0; i < this.messages.length; i++) {
            let msg = this.messages[i];

            if (msg.sentByUser) {
                textAlign(RIGHT, TOP);
                fill(158, 234, 106);
                rect(this.x + this.w / 2 - 5, this.y + 10 + i * 50 - 5, this.w / 2, 40, 10);
                fill(0);
                text(msg.emoji, this.x + this.w - 10, this.y + 10 + i * 50);
            } else {
                textAlign(LEFT, TOP);
                fill(255);
                rect(this.x + 5, this.y + 10 + i * 50 - 5, this.w / 2, 40, 10);
                fill(0);
                text(msg.emoji, this.x + 10, this.y + 10 + i * 50);
            }
        }
    }

    clear() {
        this.messages = [];
    }
}

//---------------------------------------------------------
class iPhone {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.message = new Message(x + 10, y + 60, w - 20, h - 110);
        this.emojiButtons = [];
    }

    addEmojiButton(button) {
        this.emojiButtons.push(button);
    }

    drawShell() {
        push();
        fill(0);
        rect(this.x, this.y, this.w, this.h, 20);
        fill(255);
        circle(this.x + 100, this.y + 30, 10);
        rect(this.x + 120, this.y + 25, 100, 10, 10);
        pop();
    }

    drawChatArea() {
        push();
        fill(255);
        rect(this.x + 10, this.y + 60, this.w - 20, this.h - 110, 10);
        pop();
    }

    display() {
        this.drawShell();

        this.drawChatArea();
        // Draw chat messages
        this.message.display();

        // Draw emoji buttons
        for (let button of this.emojiButtons) {
            button.display();
        }
    }

    handleMousePress(mx, my) {
        for (let button of this.emojiButtons) {
            if (button.isClicked(mx, my)) {
                let emoji = button.getEmoji();
                this.message.addMessage(emoji, true);
                setTimeout(() => {
                    this.message.addMessage(emoji, false);
                }, 500);
            }
        }
    }
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
        if (mx > this.x+telegramSketchX && mx < this.x+telegramSketchX + this.baseWidth && my > this.y+telegramSketchY - 50 && my < this.y+telegramSketchY + this.baseHeight) {
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



