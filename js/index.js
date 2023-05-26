
//Game constants and variables.. 
let inputDir={x: 0,y: 0};
const foodsound=new Audio('food.mp3.wav');
const gameOverSound=new Audio('game-over.mp3.wav');
const moveSound= new Audio('move.mp3.wav');
const musicSound=new Audio('pubg.mp3.mp3');
let speed= 8;
let lastPaintTime=0;
let snakeArr=[
    {x: 13,y: 15}
]
food = { x: 6,y: 7};
let score=0;




//Game functions
function main(ctime){               //ctime-> current time
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    } 
    lastPaintTime=ctime;
   gameEngine();  
}

function isCollide(sarr){
    //if you bump ionto yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y===snakeArr[0].y){
            return true;
        }
    }
        if(snakeArr[0].x>18 || snakeArr[0].x<0 || snakeArr[0].y>18 || snakeArr[0].y<0){
            return true;
        }   
}

function gameEngine(){
    //part 1: updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game over. press any key to restart");
        snakeArr=[{x: 13,y: 15}];
        musicSound.play();
        score=0;
    }


    //if you eaten the food, increament the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodsound.play();
        score +=1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            highscoreBox.innerHTML= "High Score: " + highscoreval;
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x+ inputDir.x,y: snakeArr[0].y+ inputDir.y});
        let a=3;
        let b=16;
        food={x:2+ Math.round(a+(b-a)*Math.random()),y:2+ Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for (let i = snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]}       
    }
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;

    //part 2: Display the snake and food
    //Display the snake
    board.innerHTML=""
    snakeArr.forEach((e, index)=>{
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart = e.y; 
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake')
        }
        snakeElement.classList.add('head');
        board.appendChild(snakeElement);
    });
   //displaying the food
   foodElement= document.createElement('div');
   foodElement.style.gridRowStart = food.y; 
   foodElement.style.gridColumnStart = food.x;
   foodElement.classList.add('food');
   board.appendChild(foodElement);
}




//Main logic starts here
let highscore=localStorage.getItem("highscore");
if( highscore ===null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(localStorage.getItem("highscore"));
    highscoreBox.innerHTML= "High Score: " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    musicSound.play();
    inputDir={ x: 0, y: 1}//start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
        console.log("arrowup");
        inputDir.x= 0;
        inputDir.y= -1;
        break;

        case "ArrowDown":
        console.log("arrowdown");
        inputDir.x= 0;
        inputDir.y= 1;
        break;

        case "ArrowLeft":
        console.log("arrowleft");
        inputDir.x= -1;
        inputDir.y= 0;
        break;
        
        case "ArrowRight":
        console.log("arrowright");
        inputDir.x= 1;
        inputDir.y= 0;
        break;

        default:
            break;
    }
});
