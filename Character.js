/*
Class declaration for characters
*/

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
    if(e == undefined){
      this.draw(this.previousAction.img, this.previousAction.width * this.frameX, this.previousAction.height * this.frameY, this.previousAction.width, this.previousAction.height, this.x, this.y, this.previousAction.width, this.previousAction.height);
      return;
    }
    
    else if(e.code == "ArrowUp"){
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

    else if(e.code == "Space"){
      var i;
      for(i = 0 ; i < 3 ; i++) {
        this.frameY = 0; //set right

        if(this.x < canvas.width - this.actions.MELEE_LEFT.width)
          this.x += 0;
          if(this.frameX < 3)
            this.frameX++;
            else this.frameX = 0;

        try {
          this.draw(this.actions.MELEE_LEFT.img, this.actions.MELEE_LEFT.width * this.frameX, this.actions.MELEE_LEFT.height * this.frameY, this.actions.MELEE_LEFT.width, this.actions.MELEE_LEFT.height, this.x, this.y, this.actions.MELEE_LEFT.width, this.actions.MELEE_LEFT.height);
          this.previousAction = this.actions.MELEE_LEFT;
        }
        catch{
          this.draw(this.previousAction.img, this.previousAction.width * this.frameX, this.previousAction.height * this.frameY, this.previousAction.width, this.previousAction.height, this.x, this.y, this.previousAction.width, this.previousAction.height);
        }

      }
    }

  }
}