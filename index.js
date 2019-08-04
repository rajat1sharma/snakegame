var cvs = document.getElementById("canvas");
var start = document.getElementById("start");
var ctx = cvs.getContext("2d");
var snakew = 20;
var snakeh = 20;
var dir = "right";
let score1=0
function drawsnake(x, y, g) {
    ctx.fillStyle = "white";
    ctx.fillRect(x * snakew, y * snakeh, snakew, snakeh);
    ctx.fillStyle = "lime";
    ctx.strokeRect(x * snakew, y * snakeh, snakew, snakeh);
}

//create snake
var len = 10;
let snake = [];
for (var i = len - 1; i >= 0; i--) {
    snake.push({
        x: i,
        y: 0
    });
}

function reset()
{
    let ar=[]
    snake=ar
    score1=0
    dir="right"
    for (var i = len - 1; i >= 0; i--) {
        snake.push({
            x: i,
            y: 0
        });
    }
}

//control dir
let lengthdy = snake.length;
function dircontrol(e) {
    if (e.keyCode == 37 && dir != "right") dir = "left";
    else if (e.keyCode == 38 && dir != "down") dir = "up";
    else if (e.keyCode == 39 && dir != "left") dir = "right";
    else if (e.keyCode == 40 && dir != "up") dir = "down";
}
document.addEventListener("keydown", dircontrol);

//create food

var food = {
    x: Math.abs(Math.round((Math.random() * cvs.width) / snakew - 3) + 1),
    y: Math.abs(Math.round((Math.random() * cvs.height) / snakeh - 3) + 1)
};

//draw food

function drawfood(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x * snakew, y * snakeh, snakew, snakeh);
    ctx.fillStyle = "black";
    ctx.strokeRect(x * snakew, y * snakeh, snakew, snakeh);
}


var pause=false;
//draw function
function pause1()
{
    pause=!(pause);
}
function draw() {
   
   // console.log(pause)
    if(pause)
    return;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (var i = 0; i < snake.length; i++) {
        var x = snake[i].x;
        var y = snake[i].y;
        drawsnake(x, y, snake.length);
    }

    drawfood(food.x, food.y);
    //snake head

    var snakex = snake[0].x;
    var snakey = snake[0].y;

    for (var i = 1; i < snake.length; i++) {
        if(snakex==snake[i].x&&snakey==snake[i].y)
        {
            alert("Game over")
            return "helooo";
        }
    }
    
    if (snakex < 0) snakex = cvs.width / snakew -1;
    if (snakey < 0) snakey = cvs.height / snakeh -1;
    if (snakex >= cvs.width / snakew) snakex = -1;
    if (snakey >= cvs.height / snakeh) snakey = -1;
    if (dir == "right") {
        snakex++;
    } else if (dir == "left") {
        snakex--;
    } else if (dir == "up") {
        snakey--;
    } else if (dir == "down") {
        snakey++;
    }

    if (snakex == food.x && snakey == food.y) {
        score1+=10;
        food = {
            x: Math.abs(Math.round((Math.random() * cvs.width) / snakew - 3) + 1),
            y: Math.abs(Math.round((Math.random() * cvs.height) / snakeh - 3) + 1)
        };
    } 
    else 
        snake.pop();
    

    var newhead = {
        x: snakex,
        y: snakey
    };
    snake.unshift(newhead);
}


function game()
{ 
   var fun = setInterval(() => {
        var output=draw()    
        if(output==="helooo")
        {
            reset()
            output="0"
            clearInterval(fun);
        }
        document.getElementById("score").innerHTML="Score:"+score1;
    }, 50);
}

