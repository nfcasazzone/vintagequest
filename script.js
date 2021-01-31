/*
Vintage Quest Video Game

Authors: Nick Casazzone, Matthew Avallone
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


// ***ACTION LIST*** Add any new character actions here
const WALK_LEFT = "walk left";
const WALK_RIGHT = "walk right";
const WALK_UP = "walk up";
const WALK_DOWN = "walk down";
const RUN = "run";
const IDLE = "idle";
const MELEE = "melee";
const RANGE = "range";
const JUMP = "jump";

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
const SLIME = "slime";

class Character {
  constructor(name, frameX, frameY, x, y, speed, actions){
    //HERE write search for stat sheet based on type to set modifiers and sprite sheets

    this.name = name;
    this.frameX = frameX;
    this.frameY = frameY;
    this.x = x; //top left location of sprite use width/height to find center
    this.y = y;
    this.speed = speed;
    this.actions = actions;
    this.previousAction = this.actions.WALK_RIGHT; // pick a default action that every character has
    
    //Add all types of stats below (read from table)
  }

  draw(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
  }

  animate(e){ //Screen refresh containing all screen animation
    if(e.code == undefined){
      this.draw(this.previousAction.img, this.previousAction.width * this.frameX, this.previousAction.height * this.frameY, this.previousAction.width, this.previousAction.height, this.x, this.y, this.previousAction.width, this.previousAction.height);
      return;
    }

    else if(e.code == "ArrowUp"){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      
      this.frameY = 0; //set up

      if(this.y >= 0){ 
        this.y -= this.speed;
        if(this.frameX < 7) this.frameX++;
        else this.frameX = 0;
      }
      else this.y = 0;
      
      try {
        this.draw(this.actions.WALK_UP.img, this.actions.WALK_UP.width * this.frameX, this.actions.WALK_UP.height * this.frameY, this.actions.WALK_UP.width, this.actions.WALK_UP.height, this.x, this.y, this.actions.WALK_UP.width, this.actions.WALK_UP.height);      
        this.previousAction = this.actions.WALK_UP;
      }
      catch{
        this.draw(this.previousAction.img, this.previousAction.width * this.frameX, this.previousAction.height * this.frameY, this.previousAction.width, this.previousAction.height, this.x, this.y, this.previousAction.width, this.previousAction.height);
      }
    }
    
    else if(e.code == "ArrowDown"){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      
      this.frameY = 2; //set down
      try {
        if(this.y < canvas.height - this.actions.WALK_DOWN.height)
          this.y += this.speed;
          if(this.frameX < 7)
            this.frameX++;
          else this.frameX = 0;
      
        this.draw(this.actions.WALK_DOWN.img, this.actions.WALK_DOWN.width * this.frameX, this.actions.WALK_DOWN.height * this.frameY, this.actions.WALK_DOWN.width, this.actions.WALK_DOWN.height, this.x, this.y, this.actions.WALK_DOWN.width, this.actions.WALK_DOWN.height);
        this.previousAction = this.actions.WALK_DOWN;
      }
      catch{
        if(this.y < canvas.height - this.previousAction.height)
          this.y += this.speed;
          if(this.frameX < 7)
            this.frameX++;
          else this.frameX = 0;

        this.draw(this.previousAction.img, this.previousAction.width * this.frameX, this.previousAction.height * this.frameY, this.previousAction.width, this.previousAction.height, this.x, this.y, this.previousAction.width, this.previousAction.height);
      }
    }
    
    else if(e.code == "ArrowLeft"){
      ctx.clearRect(0,0,canvas.width,canvas.height);

      this.frameY = 1; //set left

      if(this.x >= 0)
        this.x -= this.speed;
        if(this.frameX < 7)
          this.frameX++;
        else this.frameX = 0;
      
      try {
        this.draw(this.actions.WALK_LEFT.img, this.actions.WALK_LEFT.width * this.frameX, this.actions.WALK_LEFT.height * this.frameY, this.actions.WALK_LEFT.width, this.actions.WALK_LEFT.height, this.x, this.y, this.actions.WALK_LEFT.width, this.actions.WALK_LEFT.height);
        this.previousAction = this.actions.WALK_LEFT;
      }
      catch{
        this.draw(this.previousAction.img, this.previousAction.width * this.frameX, this.previousAction.height * this.frameY, this.previousAction.width, this.previousAction.height, this.x, this.y, this.previousAction.width, this.previousAction.height);
      }
    }
    
    else if(e.code == "ArrowRight"){
      ctx.clearRect(0,0,canvas.width,canvas.height);

      this.frameY = 0; //set right

      if(this.x < canvas.width - this.actions.WALK_RIGHT.width)
        this.x += this.speed;
        if(this.frameX < 7)
          this.frameX++;
        else this.frameX = 0;
      
      try {
        this.draw(this.actions.WALK_RIGHT.img, this.actions.WALK_RIGHT.width * this.frameX, this.actions.WALK_RIGHT.height * this.frameY, this.actions.WALK_RIGHT.width, this.actions.WALK_RIGHT.height, this.x, this.y, this.actions.WALK_RIGHT.width, this.actions.WALK_RIGHT.height);
        this.previousAction = this.actions.WALK_RIGHT;
      }
      catch{
        this.draw(this.previousAction.img, this.previousAction.width * this.frameX, this.previousAction.height * this.frameY, this.previousAction.width, this.previousAction.height, this.x, this.y, this.previousAction.width, this.previousAction.height);
      }
    }

  }
}

// Create actions for character
// Slime
let slimeidle = new Action('16','16','characters/slime/slime_idle_spritesheet.png');
let slimemoveright = new Action('16','16','characters/slime/slime_run_right_spritesheet.png');
let slimemoveleft = new Action('16','16','characters/slime/slime_run_left_spritesheet.png'); //flipped but should not make a difference visually
let actions_slime  = {
  IDLE: slimeidle,
  WALK_RIGHT: slimemoveright,
  WALK_LEFT: slimemoveleft

};
// Link
let linkWalkLeft = new Action('36.4','32','characters/link/walking_master.png');
let linkWalkRight = new Action('36.4','32','characters/link/walking_right.png');
let linkWalkUp = new Action('36.4','32','characters/link/walking_master.png');
let linkWalkDown = new Action('36.4','32','characters/link/walking_master.png');
let actions_link  = {
  WALK_LEFT: linkWalkLeft,
  WALK_RIGHT: linkWalkRight,
  WALK_UP: linkWalkUp,
  WALK_DOWN: linkWalkDown
};

// Create characters
let link = new Character(LINK, 0, 0, 200, 100, 2, actions_link);
let slime = new Character(SLIME, 20,20, 200, 200, 0.3, actions_slime);

// On window resize, update canvas dimensions and maintain player position
window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  link.animate(window.event)
})

// On startup, show player on screen
window.addEventListener('load', function(){
  link.animate(window.event);
});

// On keystroke, perform player action
window.addEventListener('keydown', function(event) {
  link.animate(event);
});

// Create a game loop for enemies to move in 
window.requestAnimationFrame(gameLoop);
function gameLoop(timeStamp){
  animate_slime();

  // Keep requesting new frames
  window.requestAnimationFrame(gameLoop);
}

//window.onload = setInterval(animate_slime, 1000/7);

function animate_slime(){
  //this.draw(this.actions.WALK.img, this.actions.WALK.width * this.frameX, this.actions.WALK.height * this.frameY, this.actions.WALK.width, this.actions.WALK.height, this.x, this.y, this.actions.WALK.width, this.actions.WALK.height);

  slime.draw(actions_slime.WALK_RIGHT.img, actions_slime.WALK_RIGHT.width * slime.frameX, actions_slime.WALK_RIGHT.height * slime.frameY, actions_slime.WALK_RIGHT.width, actions_slime.WALK_RIGHT.height, slime.x, slime.y, actions_slime.WALK_RIGHT.width, actions_slime.WALK_RIGHT.height);

  if (slime.frameX < 5) slime.frameX++;
  else slime.frameX = 0;

  slime.x += slime.speed;

}
