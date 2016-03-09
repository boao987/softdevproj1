var svg = document.getElementById("main");
var ballRadius = 20;
var points = 0;
var turns = 0;
var ballArray = [];
var currBall;
var rowSize = 20;
var frameid;
var offsetX = ballRadius/2;
var numRows = 5;

var collision = function(){
    
};

var ballMove = function(e){
    //First Get the slope between the mouse and the start circle
        var findgcd = function(a, b) {
        if ( ! b) {
            return a;
        }
    
        return findgcd(b, a % b);
        };
        var xcor = parseInt(currBall.getAttribute("cx"));
        var ycor = parseInt(currBall.getAttribute("cy"));
        var gcd = findgcd(Math.abs(e.offsetX - parseInt (currBall.getAttribute("cx"))), Math.abs(e.offsetY - parseInt(currBall.getAttribute("cy"))));
        var xchange = (e.offsetX - parseInt(currBall.getAttribute("cx")) / gcd);
        var ychange = (e.offsetY - parseInt(currBall.getAttribute("cy")) / gcd);
        console.log(xchange);
        console.log(ychange);
        var animate = function() {
            //Check if the ball collided with something
            if (collision){
            }
            //Check if it hit a wall
            if (ballRadius + parseInt(currBall.getAttribute("cx")) >= 500 || parseInt(currBall.getAttribute("cx")) - ballRadius <= 0) {
                //If it hits a wall, negate the xchange/ychange
                xchange = xchange * -1;
            }
            if (parseInt(currBall.getAttribute("cy")) + ballRadius >= 500 || parseInt(currBall.getAttribute("cy")) - ballRadius <= 0) {
                //If it hits a wall, negate the xchange/ychange
                ychange = ychange * -1;
            }
            //If nothing happens, move the ball
            xcor = xcor + xchange/100;
            ycor = ycor + ychange/100;
            console.log(xcor);
            console.log(ycor);
            currBall.setAttribute("cx", xcor);
            currBall.setAttribute("cy", ycor);
            //Add the ball to the element
            svg.appendChild(currBall);
        };
        frameid = setInterval(animate, 10);
        //animate();
    };

var shooterDirection = function(){//determines where the arrow points
    
};

var isPopping = function(){//will be used in collision
    
};


var isDead = function(){//checks if there are balls near the bottom
    
};

var moveDown = function(){//creates a newRow after a few turns
    
};

var newRow = function( rowNum ){//will be used in newGame and moveDown
    var rowArray = [];
    var ball = newBall();
   
    for(var i = 0; i<rowSize; i++) {
        
         ball.setAttribute("xcor", (2*i+1)*ballRadius + (rowNum%2)*offsetX );
         ball.setAttribute("ycor", (2*rowNum +1)*ballRadius);
         
         rowArray[i] = ball;
    }
    
    return rowArray;
};

var newBall = function(){//will be used in newRow
    var color = "";
    
    var chooseColor = function(){
         var randomNum = Math.random()*4
         if (randomNum <= 1){
            var color = "red";
         }
         else if(randomNum <= 2){
            var color = "blue";
         }
         else if(randomNum <= 3){
            var color = "green";
         }
         else {
            var color = "yellow";
         }
    }
    
    var ball = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ball.setAttribute("r", ballRadius);
    ball.setAttribute("fill", color);
    return ball;
};

var newGame = function(){//will be used in runGame
    points = 0;
    
    for(var i=0; i<numRows; i++){
        ballArray.concat(newRow(i));
    }
};

var runGame = function(){//will always be running
    var startButton = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    startButton.setAttribute("x", 250);
    startButton.setAttribute("y", 250);
    startButton.setAttribute("fill", "#ff0000");
    startButton.setAttribute("height", 20);
    startButton.setAttribute("width", 50);
    
    svg.appendChild((startButton));
};

//runGame();
//Bug Testing Stuff
currBall = document.createElementNS("http://www.w3.org/2000/svg", "circle");
currBall.setAttribute("cx", 250);
currBall.setAttribute("cy", 250);
currBall.setAttribute("fill", "#ff0000");
currBall.setAttribute("r", 20);
svg.appendChild(currBall);
svg.addEventListener("click", ballMove);
