/*
Vintage Quest Video Game

Authors: Nick Casazzone, Matthew Avallone
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// ***ACTION LIST***
const WALK = "walk";
const WALK_RIGHT = "walk right";

class Action {
  constructor(width, height, source){
    this.width = width;
    this.height = height;
    this.source = source;

    this.img = new Image();
    this.img.src = this.source;
  }
}

// ***CHARACTER LIST***
const LINK = "link";

class Character {
  constructor(name, frameX, frameY, x, y, speed, actions){
    //HERE write search for stat sheet based on type to set modifiers and sprite sheets

    this.name = name;
    this.frameX = frameX;
    this.frameY = frameY;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.actions = actions;
  }

  draw(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
  }

  animate(e){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(e.code == undefined){
      this.draw(this.actions.WALK.img, this.actions.WALK.width * this.frameX, this.actions.WALK.height * this.frameY, this.actions.WALK.width, this.actions.WALK.height, this.x, this.y, this.actions.WALK.width, this.actions.WALK.height);
      return;
    }

    switch(e.code) {
        case "ArrowUp":
          this.frameY = 0; //set up

          if(this.y >= 0){ 
            this.y -= this.speed;
            if(this.frameX < 7) this.frameX++;
            else this.frameX = 0;
          }
          else this.y = 0;

          this.draw(this.actions.WALK.img, this.actions.WALK.width * this.frameX, this.actions.WALK.height * this.frameY, this.actions.WALK.width, this.actions.WALK.height, this.x, this.y, this.actions.WALK.width, this.actions.WALK.height);
          break;

        case "ArrowDown":
          this.frameY = 2; //set down

          if(this.y < canvas.height - this.actions.WALK.height)
            this.y += this.speed;
            if(this.frameX < 7)
              this.frameX++;
            else this.frameX = 0;

          this.draw(this.actions.WALK.img, this.actions.WALK.width * this.frameX, this.actions.WALK.height * this.frameY, this.actions.WALK.width, this.actions.WALK.height, this.x, this.y, this.actions.WALK.width, this.actions.WALK.height);
          break;

        case "ArrowLeft":
          this.frameY = 1; //set left

          if(this.x >= 0)
            this.x -= this.speed;
            if(this.frameX < 7)
              this.frameX++;
            else this.frameX = 0;

          this.draw(this.actions.WALK.img, this.actions.WALK.width * this.frameX, this.actions.WALK.height * this.frameY, this.actions.WALK.width, this.actions.WALK.height, this.x, this.y, this.actions.WALK.width, this.actions.WALK.height);
          break;

        case "ArrowRight":
          this.frameY = 0; //set right

          if(this.x < canvas.width - this.actions.WALK.width)
            this.x += this.speed;
            if(this.frameX < 7)
              this.frameX++;
            else this.frameX = 0;

          if(this.actions.WALK_RIGHT === undefined){
            this.draw(this.actions.WALK.img, this.actions.WALK.width * this.frameX, this.actions.WALK.height * this.frameY, this.actions.WALK.width, this.actions.WALK.height, this.x, this.y, this.actions.WALK.width, this.actions.WALK.height);
          }
          else {
            this.draw(this.actions.WALK_RIGHT.img, this.actions.WALK_RIGHT.width * this.frameX, this.actions.WALK_RIGHT.height * this.frameY, this.actions.WALK_RIGHT.width, this.actions.WALK_RIGHT.height, this.x, this.y, this.actions.WALK_RIGHT.width, this.actions.WALK_RIGHT.height);
          }
          break;
    }
  }
}

// Create actions for character
let linkWalk = new Action('36.4','32','characters/link/walking_master.png');
let linkWalkRight = new Action('36.4','32','characters/link/walking_right.png');
let actions  = {
  WALK: linkWalk,
  WALK_RIGHT: linkWalkRight
};

// Create character
let link = new Character(LINK, 0, 0, 200, 100, 2, actions);

// On startup, show player on screen
window.addEventListener('load', function(){
  link.animate(window.event)
});

// On keystroke, perform player action
document.addEventListener('keydown', function(event) {
  link.animate(event)
});

// On window resize, update canvas dimensions and maintain player position
window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  link.animate(window.event)
})
