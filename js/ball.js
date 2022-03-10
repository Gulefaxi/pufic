import { border, canvas, context, rack, smth } from "./code";

export let ball = {
  x: 720,
  y: 680,
  radius: 20,
  color: "white",
  //   x: canvas.height / 4,
  //   y: canvas.height / 4,
  dx: 3,
  dy: -10,
  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  },
  move() {
    if (smth.started == true) {
      this.x += this.dx;
      this.y += this.dy;
    }
  },
  knock() {
    if (this.x > canvas.width - border.width || this.x < 0) {
      this.dx = -this.dx;
    } else if (this.y < 0) {
      this.dy = -this.dy;
    }
  },
  rebound() {
    if (this.y + this.dy > rack.y && this.y + this.dy < rack.y + rack.height) {
      if (
        this.x + this.dx > rack.x &&
        this.x + this.dx < rack.x + rack.width - 6
      ) {
        this.dy = -this.dy;
      }
    }
  },
  beforestart() {
    if (smth.started == false) {
      ball.x = rack.x + 50;
      ball.y = rack.y - 10
    }
  },

  drawletter() {
    if (smth.started == false) {
      context.font = "40px serif";
      context.fillStyle = "white";
      context.fillText("Press Space", 1038 , 70);
      context.fillText("to start or continue", 1032, 110);
    }
    context.font = "40px serif";
    context.fillStyle = "white";
    context.fillText("A-right, D-left", 1032, 670);
  },
 
};