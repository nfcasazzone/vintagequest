/*
Vintage Quest Video Game

Authors: Nick Casazzone, Matthew Avallone
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// load img
const  images = [];
images.player = new Image();
images.player.src = "characters/link/walking_master.png"; // link walking is 306x100


images.player_right = new Image();
images.player_right.src = "characters/link/walking_right.png";
images.push(images.player_right);

/*
const characters = [];
characters.push(new Character());

//CLASS
class Character { //create character class
  constructor(){

    //HERE write search for stat sheet based on type to set modifiers and sprite sheets

    this.width = '36.875';
    this.height = '31';
    this.frameX = 0;
    this.frameY = 0;
    this.x = 200;
    this.y = 200;
    this.speed = (Math.random()*1.5 + 3); //random speed for now
  }

  draw(){
    drawSprite(images.player, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
  }
}

update(){

  this.frameY = 2; //set down
  if(this.y < canvas.height - this.height)
    this.y += this.speed;
    if(this.frameX<7)
      this.frameX++;
    else this.frameX = 0;
  break
}

//CLASS*/

const playerWidth = '36.4'; //8
const playerHeight = '32'; //3
let playerFrameX = 0; //sprite frame location
let playerFrameY = 0;
let playerX = 200; //player positions
let playerY =100;
const playerSpeed = 2;


function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}


function animate_player(e){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(e == undefined){
    return
  }
  switch(e.code) {
        case "ArrowUp": //up
          playerFrameY = 0; //set up facing link on link sprite sheet

          if(playerY >= 0){ 
            playerY -= playerSpeed;
            if(playerFrameX<7) playerFrameX++;
            else playerFrameX = 0;
          }
          else playerY = 0;

          drawSprite(images.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth, playerHeight);
          break;

        case "ArrowDown": //down
          playerFrameY = 2; //set down

          if(playerY < canvas.height - playerHeight)
            playerY += playerSpeed;
            if(playerFrameX<7)
              playerFrameX++;
            else playerFrameX = 0;

          drawSprite(images.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth, playerHeight);
          break;

        case "ArrowLeft": //left
          playerFrameY = 1; //set left

          if(playerX >= 0)
            playerX -= playerSpeed;
            if(playerFrameX<7)
              playerFrameX++;
            else playerFrameX = 0;

          drawSprite(images.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth, playerHeight);
          break;

        case "ArrowRight": //right
          playerFrameY = 0; //set left

          if(playerX < canvas.width - playerWidth)
            playerX += playerSpeed;
            if(playerFrameX<7)
              playerFrameX++;
            else playerFrameX = 0;

          drawSprite(images.player_right, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth, playerHeight);
          break;
  }
}

// On startup, show player on screen
window.addEventListener("load", function(){
  drawSprite(images.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth, playerHeight)
});

// On keystroke, perform player action
document.addEventListener('keydown', animate_player);

// On window resize, update canvas dimensions and maintain player position
window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  drawSprite(images.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth, playerHeight)
})
