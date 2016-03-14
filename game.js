var svg = document.getElementById("main");
var ballRadius = 20;
var points = 0;
var turns = 0;
var ballArray = [];
var currBall;
var rowSize = 12;
var frameid;
var offsetX = ballRadius/2;
var numRows = 5;
var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
var score = document.createElementNS("http://www.w3.org/2000/svg", "text");
var nextBall;
var fired = false;
var inarow = 0;
var index = 0;

var distance = function(x1,y1,x2,y2) {
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}
//Check if 2 circles intersect

var isIntersect = function(element1, element2){
    if (distance(parseInt(element1.getAttribute("cx")),parseInt(element1.getAttribute("cy")),parseInt(element2.getAttribute("cx")),parseInt(element2.getAttribute("cy"))) <= ballRadius && distance(parseInt(element1.getAttribute("cx")),parseInt(element1.getAttribute("cy")),parseInt(element2.getAttribute("cx")),parseInt(element2.getAttribute("cy"))) > 0) {
        return true;
    }
    return false;
}

var collision = function(element){
    while (ballArray[index] != null) {
        console.log(index);
        console.log(inarow);
        //Check if the ball hit another ball
        if (isIntersect(element,ballArray[index])){
            //Check if they are the same color
            if (element.getAttribute("fill") != ballArray[index].getAttribute("fill")) {
                //If they are different colors dont do anything
                        index +=1;
            }
            //If same, then add to inarow and check again
            else {
                inarow +=1;
                index +=1;
                collision(ballArray[index -1]);
            }
        }

    }
    
};

var ballMove = function(e){
    fired = true;
    //First Get the slope between the mouse and the start circle
        var findgcd = function(a, b) {
        if ( ! b) {
            return a;
        }
    
        return findgcd(b, a % b);
        };
        currBall.setAttribute("cx", 250);
        currBall.setAttribute("cy", 400);
        var xcor = parseInt(currBall.getAttribute("cx"));
        var ycor = parseInt(currBall.getAttribute("cy"));
        var gcd = findgcd(Math.abs(e.offsetX - parseInt (currBall.getAttribute("cx"))), Math.abs(e.offsetY - parseInt(currBall.getAttribute("cy"))));
        var xchange = (e.offsetX - parseInt(currBall.getAttribute("cx")) / gcd);
        var ychange = (e.offsetY - parseInt(currBall.getAttribute("cy")) / gcd);
        
        var reachArray = function(){
            for(var i=0; i<ballArray.length; i++){
                if (currBall != ballArray[i]){
                    if (isIntersect(currBall,ballArray[i])){
                        return true;
                    }
                    
                }
            }
            return false;
        };
        
        var animate = function() {
        console.log(turns);
            //Check if the ball collided with something
      //  collision(currBall);
        if (inarow > 1){
            points += (inarow *40);
            index = 0;
            inarow= 0;
        }
        else {
            //Check if it hit a wall
            if (ballRadius + parseInt(currBall.getAttribute("cx")) >= 500 || parseInt(currBall.getAttribute("cx")) - ballRadius <= 0) {
                //If it hits a wall, negate the xchange/ychange
                xchange= xchange * -1;
            }
            if (parseInt(currBall.getAttribute("cy")) + ballRadius >= 450 || parseInt(currBall.getAttribute("cy")) - ballRadius <= 0) {
                    //If it hits a wall, negate the xchange/ychange
                ychange= ychange * -1;
            }
                //If nothing happens, move the ball
            if(!reachArray()){
            xcor= xcor + xchange/100;
            ycor= ycor + ychange/100;
                currBall.setAttribute("cx", xcor);
                currBall.setAttribute("cy", ycor);
            }
            else{
                while(reachArray()){
                     xcor= xcor - xchange/100;
                     ycor= (2*ballArray.length/rowSize + 1)*ballRadius;
                currBall.setAttribute("cx", xcor);
                currBall.setAttribute("cy", ycor);
                }
                xchange = 0;
                ychange = 0;
            }
            index= 0;
        }
            //Add the ball to the element
            svg.appendChild(currBall);
        };
        frameid = setInterval(animate, 10);
        turns +=1;
        animate();
    };

var shooterDirection = function(){//determines where the arrow points
    //load the image
    var img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    img.setAttributeNS("http://www.w3.org/1999/xlink", "href","arrow.jpeg");
    img.setAttribute("x", 250);
    img.setAttribute("y", 350);
    img.setAttribute("width", 100);
    img.setAttribute("height", 100);
    svg.appendChild(img);
};

var isPopping = function(){//will be used in collision
    
};


var isDead = function(){//checks if there are balls near the bottom
    
};

var moveDown = function(){//creates a newRow after a few turns
    
};

var newRow = function( rowNum ){//will be used in newGame and moveDown
    var rowArray = [];
    
   
    for(var i = 0; i<rowSize; i++) {
        var ball = newBall();
        ball.setAttribute("cx", (2*i+1)*ballRadius + (rowNum%2)*offsetX );
        ball.setAttribute("cy", (2*rowNum +1)*ballRadius);
         
         rowArray[i] = ball;
        svg.appendChild(ball);
    }
    
    
    return rowArray;
};

var newBall = function(){//will be used in newRow
    var color = "";
    
    var chooseColor = function(){
         var randomNum = Math.random()*4
         if (randomNum <= 1){
            color = "red";
         }
         else if(randomNum <= 2){
            color = "blue";
         }
         else if(randomNum <= 3){
            color = "green";
         }
         else {
            color = "yellow";
         }
    }
    
    chooseColor();
    
    var ball = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ball.setAttribute("r", ballRadius);
    ball.setAttribute("fill", color);
    return ball;
};
var once = false;
var newGame = function(){//will be used in runGame
    if (once){
    }
    else {
    populate();
    currBall = nextBall;
    populate();
    currBall.setAttribute("cx", 250);
    currBall.setAttribute("cy", 400);
    svg.appendChild(currBall);
    svg.removeChild(text);
    var next = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    next.setAttribute("x", 380);
    next.setAttribute("y", 480);
    next.textContent = "Next:";
    svg.appendChild(next);
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", 450);
    line.setAttribute("x2", 500);
    line.setAttribute("y2", 450);
    line.setAttribute("stroke", "black");
    score.setAttribute("x", 25);
    score.setAttribute("y", 480);
    score.setAttribute("fill", "#000");
    score.textContent = "Points:" + points;
    svg.appendChild(score);
    svg.appendChild(line);
    points = 0;
    svg = document.getElementById("main");
    ballArray = [];
    
    for(var i=0; i<numRows; i++){
        ballArray = ballArray.concat(newRow(i));
    }
    once = true;
    }
};

var populate = function() { //Fills up nextBall
    nextBall = newBall();
    nextBall.setAttribute("cx", 450);
    nextBall.setAttribute("cy", 475);
    svg.appendChild(nextBall);
};


var runGame = function(){//will always be running
    //var startButton = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    //startButton.setAttribute("x", 250);
    //startButton.setAttribute("y", 250);
    //startButton.setAttribute("fill", "#ff0000");
    //startButton.setAttribute("height", 20);
    //startButton.setAttribute("width", 50);

    // for(var i=0; i<ballArray.length; i++){
    //     svg.appendChild(ballArray[i]);
    // }
    if (once){
        score.textContent = "Points:" + points;
        if (fired) {
            currBall = nextBall;
            populate();
            fired = false;
        }
        svg.addEventListener("click", ballMove);
    }
    else {
        text.setAttribute('x', '175');
        text.setAttribute('y', '250');
        text.setAttribute('fill', '#000');
        text.textContent = 'Click anywhere to start.';
        svg.appendChild(text);
        svg.addEventListener("click",newGame);
    }
};
//shooterDirection();
var startid = setInterval(runGame, 10);
//Bug Testing Stuff
// currBall = document.createElementNS("http://www.w3.org/2000/svg", "circle");
// currBall.setAttribute("cx", 250);
// currBall.setAttribute("cy", 250);
// currBall.setAttribute("fill", "#ff0000");
// currBall.setAttribute("r", 20);
// svg.appendChild(currBall);
// svg.addEventListener("click", ballMove);
