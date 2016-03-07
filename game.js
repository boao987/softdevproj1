var svg = document.getElementById("main");
var ballRadius = svg.width/20;
var points = 0;
var turns = 0;
var ballArray;
var currBall;
var rowSize = 20;

var collision = function(){
    
}

var ballMove = function(){
    
}

var shooterDirection = function(){//determines where the arrow points
    
}

var isPopping = function(){//will be used in collision
    
}


var isDead = function(){//checks if there are balls near the bottom
    
}

var moveDown = function(){//creates a newRow after a few turns
    
}

var newRow = function(){//will be used in newGame and moveDown
    var rowArray;
    var ball = newBall();
    ball.setAttribute("xcor", );
    ball.setAttribute("ycor", );
    
    return rowArray;
}

var newBall = function(){//will be used in newRow
    
    var chooseColor = function(){
         var randomNum = Math.random()*4
         if (randomNum <= 1){
            var color = "red"
         }
         else if(randomNum <= 2){
            var color = "blue"
         }
         else if(randomNum <= 3){
            var color = "green"
         }
         else {
            var color = "yellow"
         }
    }
    
    var ball = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ball.setAttribute("r", ballRadius);
    ball.setAttribute("fill", color);
    return ball;
}

var newGame = function(){//will be used in runGame
    points = 0;
    
}

var runGame = function(){//will always be running
    
}