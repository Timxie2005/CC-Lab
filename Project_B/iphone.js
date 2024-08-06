let emojis = ['😊', '😂', '😅', '😢','👍'];
let iphone;

console.log("iphone loaded");

function setup() {
  let cnv = createCanvas(400, 600);
  cnv.parent("iphone-parent")

  iphone = new iPhone(50, 50, 300, 500);
  
  // Initialize emoji buttons
  let emojiButtonWidth = 56;
  let emojiButtonHeight = 50;
  for (let i = 0; i < emojis.length; i++) {
    let x = 60 + i * emojiButtonWidth;
    let y = 450;
    iphone.addEmojiButton(new EmojiButton(x, y, emojiButtonWidth, emojiButtonHeight, emojis[i]));
  }
}

function draw() {
  background(0,47,167);
  
  // Draw the iPhone interface
  iphone.display();
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
    return (mx > this.x) && (mx < this.x + this.w) && (my > this.y) && (my < this.y + this.h);
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
    this.messages.push({emoji: emoji, sentByUser: sentByUser});
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

function mousePressed() {
  iphone.handleMousePress(mouseX, mouseY);
}
