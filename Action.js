/*
 Class declaration for character actions
*/

// ***ACTION LIST*** Add any new character actions here
const WALK_LEFT = "walk left";
const WALK_RIGHT = "walk right";
const WALK_UP = "walk up";
const WALK_DOWN = "walk down";
const RUN = "run";
const IDLE = "idle";
const MELEE_LEFT = "melee left";
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