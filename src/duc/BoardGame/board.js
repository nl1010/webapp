
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

//players
var heroReady = false;
var heroImage = new Image();

heroImage.onload = function()
{
	heroReady = true;
};
heroImage.src = "images/hero.png";

var wizReady = false;
var wizImage = new Image();

wizImage.onload = function()
{
	wizReady = true;
};
wizImage.src = "images/wiz.png";

//monster
var monsterReady = false;
var monsterImage = new Image();

monsterImage.onload = function()
{
	monsterReady = true;
};
monsterImage.src = "images/monster.png";


/*Game objects-------------------------------------*/
var p1 = 
{
	speed:256
};
var p2 = 
{
	speed:256
};

var monster = {};

var monsterCaught1 = 0;
var monsterCaught2 = 0;

var scoreA = 0;
var scoreB = 0;
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
		&& p1.y > 0)
		p1.y -= p1.speed * modifier;
	//down
	if (40 in keysDown
		&& p1.y < canvas.height-32)
		p1.y += p1.speed * modifier;
	//left
	if (37 in keysDown
		&& p1.x > 0)
		p1.x -= p1.speed * modifier;
	//right
	if (39 in keysDown
		&& p1.x < canvas.width-32)
		p1.x += p1.speed * modifier;

	//up
	if (87 in keysDown
		&& p2.y > 0)
		p2.y -= p2.speed * modifier;
	//down
	if (83 in keysDown
		&& p2.y < canvas.height-32)
		p2.y += p2.speed * modifier;
	//left
	if (65 in keysDown
		&& p2.x > 0)
		p2.x -= p2.speed * modifier;
	//right
	if (68 in keysDown
		&& p2.x < canvas.width-32)
		p2.x += p2.speed * modifier;

	//Monster is caught
	//monster and hero are two 32x32 pixels images
	if (
		p1.x <= (monster.x+32)
		&& monster.x <= (p1.x+32)
		&& p1.y <= (monster.y+32)
		&& monster.y <= (p1.y+32)
		)
	{
		monsterCaught1+=1;
		reset();
	}
	if (
		p2.x <= (monster.x+32)
		&& monster.x <= (p2.x+32)
		&& p2.y <= (monster.y+32)
		&& monster.y <= (p2.y+32)
		)
	{
		monsterCaught2+=1;
		reset();
	}

	if (monsterCaught1>=10){
		placePlayers();
		scoreA++;
		resetScore();
	}
		
	if (monsterCaught2>=10){
		placePlayers();
		scoreB++;
		resetScore();
	}
		
}

/*Render Objects------------------------------------*/
//draw stuff
var render = function()
{
	if (bgReady)
		ctx.drawImage(bgImage,0,0);
	if (heroReady)
		ctx.drawImage(heroImage,p1.x,p1.y);
	if (wizReady)
		ctx.drawImage(wizImage,p2.x,p2.y);
	if (monsterReady)
		ctx.drawImage(monsterImage,monster.x,monster.y);

	//score
	ctx.fillStyle = "rgb(250,250,250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(monsterCaught2,32,32);
	ctx.fillText(monsterCaught1,468,32);
	ctx.fillText("B: "+scoreB,32,420);
	ctx.fillText("A: "+scoreA,436,420);	
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


var resetScore = function()
{
	monsterCaught1=0;
	monsterCaught2=0;
};

var placePlayers = function()
{
	p1.x = canvas.width/2-32;
	p1.y = canvas.height/2-32;

	p2.x = canvas.width/2;
	p2.y = canvas.height/2-32;
}

/*Start the Game------------------------------------*/

placePlayers();
reset();
var then = Date.now();
setInterval(main,1);