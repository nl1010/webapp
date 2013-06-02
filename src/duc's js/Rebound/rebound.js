//Objects
var ball;
var paddle;
var score;

//Vars
//dx dy: speed
var dx = 6;
var dy = 6;
var currentScore = 0;
var timer;

//set initial conditions for ball and paddle
var paddleLeft = 228;
var ballLeft = 200;
var ballTop = 4;

//Initialisation, will be onLoad in <body>
function init()
{
	ball = document.getElementById('ball');
	paddle = document.getElementById('paddle');
	score = document.getElementById('score');	

	//register the key listener with document object
	document.onkeydown = keyListener;

	start();
}

/*---------------------------------------------------------*/

/*Keyboard Event Handler*/
function keyListener(e)
{
	if (!e)
	{
		//for IE
		e = windows.event;
	}

	//38 is UP, 40 is DOWN
	if (e.keyCode==37 && paddleLeft > 0)
	{
		//37 is LEFT ARROW
		//move left?
		paddleLeft -= 4; 
		//what the fuck?
		paddle.style.left = paddleLeft + 'px';
	}

	if (e.keyCode==39 && paddleLeft < 436)
	{
		//39 is RIGHT ARROW
		//move right?
		paddleLeft += 4; 
		//what the fuck?
		paddle.style.left = paddleLeft + 'px';
	}

}

/*---------------------------------------------------------*/

/*The Game's main Loop*/
function start()
{
	//game loop
	detectCollisions();
	render();
	difficulty();

	//end conditions
	if (ballTop < 470)
	{
		//ball above 470 from top: keep playing
		timer = setTimeout('start()', 50);
	}
	else
	{
		gameOver();
	}
}

/*---------------------------------------------------------*/

/*Functions used in the game loop*/

//reflect the ball when it touches the walls
function detectCollisions()
{
	if (collisionX())
		//reverse x speed
		dx = dx * -1;
	if (collisionY())
		//reverse y speed
		dy = dy * -1;
}

function collisionX()
{
	if (ballLeft < 4 || ballLeft > 480)
		return true;
	return false;
}

function collisionY()
{
	//check the ceiling collision
	if (ballTop < 4)
		return true;

	//check the paddle collision
	if (ballTop > 450)
	{
		if (ballLeft > paddleLeft 
			&& ballLeft < paddleLeft + 64)
			return true;
	}
	
	return false;
}

//rendering the board?
//keep doing this at start()
function render()
{
	moveBall();
	updateScore();
}

//real time movement
function moveBall()
{
	//this shit will be called every '50', check start()
	ballLeft += dx;
	ballTop += dy;
	//actual code for position changing
	ball.style.left = ballLeft;
	ball.style.top = ballTop;
}

function updateScore()
{
	//called every '50', so add 5 to everytime start() is called
	currentScore += 5;
	//?
	score.innerHTML = "Score: " + currentScore;
}

//inc speed as the game progress
function difficulty()
{
	//every '10000' or 200 start() calls
	if (currentScore % 1000 == 0)
	{
		//depends on direction
		if (dy > 0)
			dy+=1;
		else
			dy-=1;
	}
}

function gameOver()
{
	//end the game by
	// clearing the timer
	// modifying the score label
	clearTimeout(timer);
	score.innerHTML += "  Game Over";
	score.style.backgroundColor = "rgb(128,0,0)";
}