/*
Vintage Quest Video Game

Authors: Nick Casazzone, Matthew Avallone
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


class Character {
  constructor(width, height, frameX, frameY, x, y, speed, walkSource){
    //HERE write search for stat sheet based on type to set modifiers and sprite sheets

    this.width = width;
    this.height = height;
    this.frameX = frameX;
    this.frameY = frameY;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.walkSource = walkSource;
    
    // Load images for walking action
    this.walking = []
    let player = new Image();
    player.src = this.walkSource;
    this.walking.push(player)

    if(this.walkSource.includes('link')){
      let player_right = new Image();
      player_right.src = "characters/link/walking_right.png";
      this.walking.push(player_right);
    }
  }

  draw(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
  }

  animate(e){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(e.code == undefined){
      this.draw(this.walking[0], this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
      return
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

          this.draw(this.walking[0], this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
          break;

        case "ArrowDown":
          this.frameY = 2; //set down

          if(this.y < canvas.height - this.height)
            this.y += this.speed;
            if(this.frameX < 7)
              this.frameX++;
            else this.frameX = 0;

          this.draw(this.walking[0], this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
          break;

        case "ArrowLeft":
          this.frameY = 1; //set left

          if(this.x >= 0)
            this.x -= this.speed;
            if(this.frameX < 7)
              this.frameX++;
            else this.frameX = 0;

          this.draw(this.walking[0], this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
          break;

        case "ArrowRight":
          this.frameY = 0; //set right

          if(this.x < canvas.width - this.width)
            this.x += this.speed;
            if(this.frameX < 7)
              this.frameX++;
            else this.frameX = 0;

          if(this.walkSource.includes('link')){
            this.draw(this.walking[1], this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
          }
          else {
            this.draw(this.walking[0], this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
          }
          break;
    }
  }
}

let link = new Character('36.4','32', 0, 0, 200, 100, 2, 'characters/link/walking_master.png');

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
