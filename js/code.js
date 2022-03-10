import { ball } from "./ball";
import {  bricks, collision, drawbricks, settin } from "./bricks";
export let canvas = document.getElementById("back");
export let context = canvas.getContext("2d");
export let smth = {
 started: false, //началась игра или нет
 nte:2, //кол-во кирпичей для победы
 level: 0, //уровень
missnum: 3, //кол-во жизней +1
breakedbricks: 0, //сломано кирпичей
btlevel: false, //переменная для паузы между уровнями
albreakbricks: 0 //все сломанные кирпичи
}

function fallpast() { //упал или нет мячик за границу
  if ( ball.y + ball.dy > 790){
    smth.started = false
    smth.missnum -= 1
    ball.dy = -ball.dy
}
}

function winorlose(){
  if (smth.btlevel == true){
  context.font = "50px verdana";
    context.fillStyle = "blue";
    context.fillText("You completed level", 280, 400);
  }
  if (smth.breakedbricks == smth.nte && smth.level < 3){
    smth.level++
    ball.dx = ball.dx/2 + ball.dx
    ball.dy = ball.dy/7 + ball.dy
    smth.breakedbricks = 0
    smth.started = false
    smth.btlevel = true
    for (let c = 0; c < settin.brickcolumns; c++) {
      for (let r = 0; r < settin.brickrows; r++) {
        let b = bricks[c][r];
        if (b.status == false){
        b.status = true
      }
      }
    }
  }
if (smth.level == 3 && smth.breakedbricks == smth.nte){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = "75px verdana";
      context.fillStyle = "blue";
      context.fillText("You completed game", 380, 200);
      context.font = "55px verdana";
      context.fillText("you break" + " " + smth.albreakbricks + " " + "bricks and you completed" + " " + smth.level + " " + "levels", 80, 600);
      context.font = "75px verdana";
      context.fillText("press f5 for restart", 380, 400);
      smth.started = false
  }
  if (smth.missnum < 0){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "75px verdana";
        context.fillStyle = "blue";
        context.fillText("You loose", 420, 200);
        context.fillText("press f5 for restart", 380, 400);
        smth.started = false
  }
}

function keyDownHandler(key) {
  if (key.which == 68) {
    rack.rightPressed = true;
  } else if (key.which == 65) {
    rack.leftPressed = true;
  }
  if (key.which == 32) {
    smth.started = true;
    smth.btlevel = false
  }
}
function keyUpHandler(key) {
  if (key.which == 68) {
    rack.rightPressed = false;
  } else if (key.which == 65) {
    rack.leftPressed = false;
  }
}
export let border = { //тёмная часть в левой части экрана
  x: 1012,
  y: 0,
  width: 348,
  height: 752,
  color: "black",
  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  },
  score() { //счёт жизней/уровня/кол-во сломаных кирпичей
    context.font = "40px serif";
      context.fillStyle = "white";
      context.fillText("level" + " " + smth.level, 1120 , 310);
      context.fillText("lives" + " " + smth.missnum, 1120 , 270);
      context.fillText("bricks breaked" + " " + smth.breakedbricks, 1050 , 220);
      // context.fillText(, 1135 , 170);
  }

};
export let rack = {
  x: 680,
  y: 687,
  width: 100,
  height: 20,
  color: "purple",
  rightPressed: false,
  leftPressed: false,
  step: 15,
  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  },
  move() {
    if (this.leftPressed && this.x > 0) {
      this.x -= this.step;
    } else if (
      this.rightPressed &&
      this.x + this.width < canvas.width - border.width
    ) {
      this.x += this.step;
    }
  },
};
function game() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  ball.draw();
  fallpast();
  border.draw();
  ball.drawletter();
  
  drawbricks();
  collision()
  border.score();
  rack.draw();
  ball.knock();
  ball.rebound();
  rack.move();
  winorlose() 
  ball.beforestart();
  ball.move();
 
  requestAnimationFrame(game);
  
}
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
// document.addEventListener("keyup", ball.start);
game();
