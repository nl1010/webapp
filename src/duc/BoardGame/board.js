
/*Create the canvas--------------------------------*/
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;

document.body.appendChild(canvas);

/*Include images-----------------------------------*/
//Background image
var bgReady = false;
var bgImage = new Image();

bgImage.onload = function()
{
	bgReady = true;
};
bgImage.src = "images/background.png";

//hero
var heroReady = false;
var heroImage = new Image();

heroImage.onload = function()
{
	heroReady = true;
};
heroImage.src = "images/hero.png";


//monster
var monsterReady = false;
var monsterImage = new Image();

monsterImage.onload = function()
{
	monsterReady = true;
};
monsterImage.src = "images/monster.png";


/*Game objects-------------------------------------*/
var hero = 
{
	speed:256
	//x:0
	//y:0
};

var monster =
{
	//x:0
	//y:0
};

var monsterCaught = 0;
//document.getElementById("score").innerHTML = monsterCaught;

/*Player input--------------------------------------*/
var keysDown = {};

addEventListener("keydown", function (e) 
	{
		keysDown[e.keyCode] = true;
	}
	, false);

addEventListener("keyup", function (e) 
	{
		delete keysDown[e.keyCode];
	}
	, false);

/*New Game------------------------------------------*/
//Reset the game when player catches a monster
var reset = function()
{
	//throw monster randomly on the screen
	monster.x = 32+(Math.random()*(canvas.width-64));
	monster.y = 32+(Math.random()*(canvas.height-64));
};


/*Update objects------------------------------------*/
var update = function(modifier)
{
	//up
	if (38 in keysDown
		&& hero.y > 0)
		hero.y -= hero.speed * modifier;
	//down
	if (40 in keysDown
		&& hero.y < canvas.height-32)
		hero.y += hero.speed * modifier;
	//left
	if (37 in keysDown
		&& hero.x > 0)
		hero.x -= hero.speed * modifier;
	//right
	if (39 in keysDown
		&& hero.x < canvas.width-32)
		hero.x += hero.speed * modifier;

	//Monster is caught
	//monster and hero are two 32x32 pixels images
	if (
		hero.x <= (monster.x+32)
		&& monster.x <= (hero.x+32)
		&& hero.y <= (monster.y+32)
		&& monster.y <= (hero.y+32)
		)
	{
		monsterCaught+=1;
		document.getElementById("score").innerHTML
		=monsterCaught;
		//?
		reset();
	}
}

/*Render Objects------------------------------------*/
//draw stuff
var render = function()
{
	if (bgReady)
		ctx.drawImage(bgImage,0,0);
	if (heroReady)
		ctx.drawImage(heroImage,hero.x,hero.y);
	if (monsterReady)
		ctx.drawImage(monsterImage,monster.x,monster.y);

	//score
	ctx.fillStyle = "rgb(250,250,250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: "+monsterCaught,32,32);
};

/*Main Game Loop------------------------------------*/
var main = function()
{
	//Time stamp
	var now = Date.now();
	var delta = now - then;

	update(delta/1000);
	render();

	then = now;
};

/*Start the Game------------------------------------*/
hero.x = canvas.width/2;
hero.y = canvas.height/2;

reset();
var then = Date.now();
setInterval(main,1);