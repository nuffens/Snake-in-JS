const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
// this this

class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let gameSpeed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let xVelocity=0;
let yVelocity=0;

let appleX = 5;
let appleY = 5;


let score = 0;

const dingSound = new Audio("Ding.mp3")

//this is the game loop
function drawgame (){    
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();
    

    checkApplePosition();
    drawApple();
    drawSnake();

    drawScore();

    if(score > 2){
        gameSpeed =11;
    }
    if(score > 5){
        gameSpeed = 15;
    }

    setTimeout(drawgame, 1000/ gameSpeed);
}

function isGameOver(){
    let gameOver = false;

    if(xVelocity ===0 && yVelocity ===0){
    return false
    }

    //walls
    if(headX < 0){
        gameOver = true;
    }
    if(headX >= tileCount){
        gameOver = true;
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY >= tileCount){
        gameOver = true;
    }

    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x == headX && part.y == headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver){
    ctx.fillStyle = "#ADD8E6";
    ctx.font = "20px verdana";
    ctx.fillText("Game Over. Refresh the page", canvas.width / 6.5, canvas.height / 2);
    return gameOver;
    }
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px verdana";
    ctx.fillText("Score " + score, canvas.width - 50, 10)
}


function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    ctx.fillStyle = 'green';
    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new snakePart(headX, headY));
    while(snakeParts.length > tailLength){
        snakeParts.shift();
    }
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);

}

function checkApplePosition(){
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        dingSound.play();
    }
}

document.body.addEventListener('keydown',keyDown);

function keyDown(event){
    //this is the keycode for up
    if(event.keyCode == 38){
        if(yVelocity == 1){
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }

    //this is the downarrow keycode
    if(event.keyCode == 40){
        if(yVelocity == -1){
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 37){
        if(xVelocity == 1){
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if(event.keyCode == 39){
        if(xVelocity == -1){
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawgame();


