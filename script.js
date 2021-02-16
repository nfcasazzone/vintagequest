/*
Vintage Quest Video Game

Authors: Nick Casazzone, Matthew Avallone
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


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
let linkMeleeLeft = new Action('37','31','characters/link/link_swordtest.png'); //correct sword
let actions_link  = {
  WALK_LEFT: linkWalkLeft,
  WALK_RIGHT: linkWalkRight,
  WALK_UP: linkWalkUp,
  WALK_DOWN: linkWalkDown,
  MELEE_LEFT: linkMeleeLeft
};

// Create characters
let link = new Character(LINK, 0, 0, 200, 100, 2, actions_link);
let slime = new Character(SLIME, 20,20, 200, 200, 0.05, actions_slime);

// On window resize, update canvas dimensions and maintain player position
window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  link.animate(window.event);
  slime.animate(window.event);
});

// On startup, show player on screen
window.addEventListener('load', function(){
  link.animate(window.event);
  slime.animate(window.event);
});

// On keystroke, perform player action
let keys = [];
window.addEventListener('keydown', function(event) {
  keys.push(event);
});

// Create a game loop for enemies to move in
window.requestAnimationFrame(gameLoop);
function gameLoop(timeStamp){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Get event for each character
  playerEvent = keys.pop();
  enemyEvent = DFS(link.previousAction, link.x, link.y, slime.x, slime.y);
  
  slime.animate(enemyEvent);
  link.animate(playerEvent);

  // Keep requesting new frames
  window.requestAnimationFrame(gameLoop);
}

// Calculates intelligent enemy action
function DFS(playerPrevAction, playerX, playerY, currX, currY){
  code = "ArrowRight";
  let event = {
    "code": code
  };
  return event;
}
