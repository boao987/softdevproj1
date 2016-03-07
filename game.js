var svg = document.getElementById("main");
var ballRadius = svg.width/20;
var points = 0;
var turns = 0;
var ballArray;
var currBall;
var frameid;

var collision = function(){
    
}

var ballMove = function(e){
    //First Get the slope between the mouse and the start circle
        var findgcd = function(a, b) {
        if ( ! b) {
            return a;
        }
    
        return findgcd(b, a % b);
        };
        var gcd = findgcd(Math.abs(e.offsetX - currBall.getAttribute("xcor")), Math.abs(e.offsetY - currBall.getAttribute("ycor")));
        var xchange = (e.offsetX - currBall.getAttribute("xcor")) / gcd;
        var ychange = (e.offsetY - currBall.getAttribute("ycor")) / gcd;
        var animate = function() {
            //Check if the ball collided with something
            if (collision){
            }
            //Check if it hit a wall
            if (currBall.getAttribute("xcor") + ballRadius >= svg.width || currBall.getAttribute("xcor") - ballRadius <= 0) {
                //If it hits a wall, negate the xchange/ychange
                xchange = xchange * -1;
            }
            if (currBall.getAttribute("ycor") + ballRadius >= svg.height || currBall.getAttribute("ycor") - ballRadius <= 0) {
                //If it hits a wall, negate the xchange/ychange
                ychange = ychange * -1;
            }
            //If nothing happens, move the ball
            currBall.setAttribute("xcor", currBall.getAttribute("xcor") + xchange);
            currBall.setAttribute("ycor", currBall.getAttribute("ycor") + ychange);
            //Add the ball to the element
            svg.appendChild(currBall);
        };
        frameid = setInterval(animate, 10);
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
    var rowArray = 
    var ball = newBall();
    ball.setAttribute("xcor", );
    ball.setAttribute("ycor", );
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