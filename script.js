const gameSpeed = 80; //used with setTimeout, determines how quick update, relating to speed
const canvasBorder = 'blue';
const canvasBackground = "white";
const snakeColor = 'lightgreen';
const snakeBorder = 'darkgreen';
const foodBorder = 'darkred';
const foodColor = 'red';
const snakeTail = 'blue';

let snake = [ //spawns snake in center of board, 5 blocks long
{x: 150, y: 150},
{x: 140, y: 150},
{x: 130, y: 150},
{x: 120, y: 150},
{x: 110, y: 150}
]


  // When set to true the snake is changing direction
let changingDirection = false;
// Food x-coordinate
let foodX;
// Food y-coordinate
let foodY;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;
//snake Tail
let snakeT = snake[snake.length - 1];

var gameCanvas = document.getElementById("gameCanvas");

//Let game know its on 2d 
var ctx = gameCanvas.getContext("2d");


main(); //starts game
createFood();//creates food on screen
document.addEventListener("keydown", changeDirection) //calls when key pressed, uses change direction function

function main() {

  if (didGameEnd(true)) //if game is over, alerts and resets game
  {
    alert("game over");
    reset();
  } 

setTimeout(function onTick() { 
  changingDirection = false;
  drawCanvas();
  drawFood();
  updateSnake();
  drawSnake();
  // Call main again
  main();
  }, gameSpeed) //everything within the function is happening after gameSpeed, which is a very short time, and main is called again, so its constantly updating
}



function drawSnake() {
snake.forEach(drawSnakePart) //for each refers to each part of arraym fill
//snakeT(drawSnakeT)
}

function drawSnakePart(snakePart) {



//color of the snake part
ctx.fillStyle = snakeColor;

//border color of the snake part
ctx.strokestyle = snakeBorder;

// Draw a rectangle to represent the snake
// the part is located
ctx.fillRect(snakePart.x, snakePart.y, 10, 10);

// Draw a border around the snake part
ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);

}


function updateSnake() {
const head = {x: snake[0].x + dx, y: snake[0].y + dy};   //dx attribute indicates a shift along the x-axis on the position of an element or its content
snake.unshift(head); //unshift() method adds new items to the beginning of an array, and returns the new length.


const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
if (didEatFood) {
  createFood();
} 
else {
  snake.pop();//will remove the last array,... or last part of snake
}
}
function drawCanvas() {            
ctx.fillStyle = canvasBackground;
ctx.strokeStyle = canvasBorder;     
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function changeDirection(event) {
const LEFT_KEY = 37;                //identifies for keys
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;



if (changingDirection) return;      

changingDirection = true;   //so if direction is changed, the position is changed depending on key and in relation to x and y axis

const keyPressed = event.keyCode;
const goingUp = dy === -10;
const goingDown = dy === 10;
const goingRight = dx === 10;
const goingLeft = dx === -10;
  
  if (keyPressed === LEFT_KEY && !goingRight) { //when key is pressed, makes sure it is also not opposite direction, changes position
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) { 
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function randomnum(min, max) { //creates random number, math . random gives between 1 and 0, so random num turns that into a random number within the canvas
return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
function createFood() {
foodX = randomnum(0, gameCanvas.width - 10);
foodY = randomnum(0, gameCanvas.height - 10); //creates food coordinates within canvas not on borders
  snake.forEach(function isFoodOnSnake(part) {
  const foodIsOnSnake = part.x == foodX && part.y == foodY //if the x and y coordinates of snake match the food, food is created again
  if (foodIsOnSnake)
    createFood();
  });
}

function drawFood() {
ctx.fillStyle = foodColor;
ctx.strokestyle = foodBorder;
ctx.fillRect(foodX, foodY, 10, 10);
ctx.strokeRect(foodX, foodY, 10, 10);
}

function didGameEnd() { //if the snake part collides within itself, game is over
for (let i = 4; i < snake.length; i++) {
const didCollide = snake[i].x === snake[0].x &&
  snake[i].y === snake[0].y

if (didCollide) {
 return true
}
}
const hitLeftWall = snake[0].x < 0;             // left wall the snake array is passed left side, which is out of x axis, it hit the wall
const hitRightWall = snake[0].x > gameCanvas.width - 10;        // right wall is the width of the board - 10
const hitToptWall = snake[0].y < 0; //top wall is the y axis, so if passed that it hit the wall
const hitBottomWall = snake[0].y > gameCanvas.height - 10; //bottom wall is opposite, height - 10
return hitLeftWall || 
    hitRightWall ||     //if ANY of these are true, the snake has collided, therefore the game has ended
    hitToptWall ||
    hitBottomWall
}

function reset() { //resets snake back to starting position, same length, and spawns food in random location
    snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150}
    ]
    // Horizontal velocity
    dx = 10;
    // Vertical velocity
    dy = 0;
    
    createFood();
    return;
    }
