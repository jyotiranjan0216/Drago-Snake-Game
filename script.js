let inputDir = {x:0, y:0}
let board = document.querySelector(".board");

const moveSound = new Audio('./Images&Audios/move.mp3');
const gameOverSound = new Audio('./Images&Audios/gameover.mp3');
const foodSound = new Audio('./Images&Audios/food.mp3');
const musicSound = new Audio('./Images&Audios/music.mp3');

let scoreMsg = document.querySelector("#score");
let snakeBody = [
    { x: 13, y: 15 },
]
let food = { x: 10, y: 8 };
let lastPaint = 0;
let speed = 5;
let score = 0;

//Display rendering function
let main = (ctime) => {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaint) / 1000 < 1 / speed) return;
    lastPaint = ctime;
    updateGame();
}

let isCollide =(snake) => {
    //if collide with his body
    for(let i = 1; i < snakeBody.length; i++) {
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    ///if collide with wall
    if(snake[0].x > 20 || snake[0].x < 0 || snake[0].y > 20 || snake[0].y < 0) {
        return true;
    }
}

let updateGame = () => {
    //updating snake game
    if(isCollide(snakeBody)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over!!! Press any key to start again");
        scoreMsg.innerHTML = `Score = 0`;
        snakeBody = [
            { x: 13, y: 15 },
        ];
        musicSound.play();
        score = 0;
    }

    //if food was eaten
    if(snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
        foodSound.play();
        snakeBody.unshift({x : snakeBody[0].x + inputDir.x, y : snakeBody[0].y + inputDir.y});
        score += 5;
        scoreMsg.innerHTML = `Score = ${score}`;
        let a = 2;
        let b = 18;
        food = {x : Math.round(a + (b - a)* Math.random()), y : Math.round(a + (b - a)* Math.random())}
    }

    //moving snake
    for(let i = snakeBody.length -2; i >= 0; i--) {
        snakeBody[i+1] = {...snakeBody[i]}; 
    }
    snakeBody[0].x += inputDir.x;
    snakeBody[0].y += inputDir.y;
    
    // display snake
    board.innerHTML = "";
    snakeBody.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) snakeElement.classList.add('snakeHead');
        else snakeElement.classList.add('snakeBody');
        board.appendChild(snakeElement);
    })

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//Main Logic
window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 };
    musicSound.play();
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
             break;
    }
})