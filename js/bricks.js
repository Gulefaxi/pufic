import { ball } from "./ball";
import { context, smth } from "./code";

let brickwidth = 80;
let brickheight = 15;
let brickcolor = "darkblue";
let offsetleft = 30;
let offsetdown = 80;
let padding = 27;
export let settin ={
 brickrows: 6,
 brickcolumns: 9,
}
export let bricks = [];
for (let c = 0; c < settin.brickcolumns; c++) {
  bricks[c] = [];

  for (let r = 0; r < settin.brickrows; r++) {
    bricks[c][r] = {
      x: 20,
      y: 20,
      status: true,
    };
  }
  console.log(bricks);
}

export function drawbricks() {
  for (let c = 0; c < settin.brickcolumns; c++) {
    for (let r = 0; r < settin.brickrows; r++) {
      let b = bricks[c][r];
      let bx = c * (brickwidth + padding) + offsetleft;
      let by = r * (brickheight + padding) + offsetdown;
      bricks[c][r].x = bx;
      bricks[c][r].y = by;
      if (b.status == true){
      context.fillStyle = brickcolor;
      context.fillRect(bricks[c][r].x, bricks[c][r].y, brickwidth, brickheight);
    }
    }
  }
};
export function collision(){
  for (let c = 0; c < settin.brickcolumns; c++) {
    for (let r = 0; r < settin.brickrows; r++){
      let b = bricks[c][r];
      if (b.status == true){
      if (  ball.x > b.x &&
        ball.x < b.x + brickwidth &&
        ball.y > b.y &&
        ball.y < b.y + brickheight){
         ball.dy = -ball.dy
         b.status = false
        smth.breakedbricks++
        smth.albreakbricks++
        }
      }  
    }
  }
};
// export let brick = {
//   x: 700,
//   y: 300,
//   width: 50,
//   height: 15,
//   color: "red",
//   status: true,
//   breakingbricks() {
//     if (ball.y > this.y && ball.y < this.y + 15) {
//       if (ball.x > this.x && ball.x < this.x + this.width) {
//         this.status = false;
//         ball.dy = -ball.dy;
//       }
//     }
//   },
//   draw() {
//     context.fillStyle = this.color;
//     context.fillRect(this.x, this.y, this.width, this.height);
//   },
// };
// function Brick(x, y) {
//   this.x = x;
//   this.y = y;
//   this.width = 50;
//   this.height = 15;
//   this.color = "red";
//   this.status = true;
//   this.breakingbricks = function () {
//     if (ball.y > this.y && ball.y < this.y + 15) {
//       //if (ball.x > this.x && ball.x < this.x + this.width) {
//       this.status = -this.status;
//       ball.dy = -ball.dy;
//       //}
//     }
//   };
//   this.draw = function () {
//     context.fillStyle = this.color;
//     context.fillRect(this.x, this.y, this.width, this.height);
//   };
// if (this.y + this.dy > rack.y && this.y + this.dy < rack.y + rack.height) {
//   if (
//     this.x + this.dx > rack.x &&
//     this.x + this.dx < rack.x + rack.width - 6
//   ) {
//     this.dy = -this.dy;
//   }
// }
// }
// let brick1 = new Brick("200", "200");
// export default brick1;
