
/*Create the canvas--------------------------------*/
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1440;
canvas.height = 640;

document.body.appendChild(canvas);

/*Include images-----------------------------------*/
//Background image
var bgRdy = false;
var bgImg = new Image();

bgImg.onload = function()
{
	bgRdy = true;
};
bgImg.src = "images/bg.png";

//GRASS
var grassRdy = false;
var grassImg = new Image();

grassImg.onload = function()
{
	grassRdy = true;
};
grassImg.src = "images/grass.png";


//TREES
var treeRdy = false;
var treeImg = new Image();

treeImg.onload = function()
{
	treeRdy = true;
};
treeImg.src = "images/tree.png";

//STONE
var stoneRdy = false;
var stoneImg = new Image();

stoneImg.onload = function()
{
	stoneRdy = true;
};
stoneImg.src = "images/stone.png";

//WATER
var waterRdy = false;
var waterImg = new Image();

waterImg.onload = function()
{
	waterRdy = true;
};
waterImg.src = "images/water.png";

//-------------------------------------------------
//WIZARD
var wizRdy = false;
var wizImg = new Image();

wizImg.onload = function()
{
	wizRdy = true;
};
wizImg.src = "images/wizard.png";

//ORC
var orcRdy = false;
var orcImg = new Image();

orcImg.onload = function()
{
	orcRdy = true;
};
orcImg.src = "images/orc.png";

/*Game objects-------------------------------------*/
var wizard = 
{
	speed:256
};

var orc = 
{
	name: "orc"
};

var wood = 0;
var stone = 0;
var soul = 0;

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

/*Update objects------------------------------------*/
var update = function(modifier)
{
	//up
	if (38 in keysDown
		&& wizard.y > 0)
		wizard.y -= wizard.speed * modifier;
	//down
	if (40 in keysDown
		&& wizard.y < canvas.height-32-128)
		wizard.y += wizard.speed * modifier;
	//left
	if (37 in keysDown
		&& wizard.x > 0)
		wizard.x -= wizard.speed * modifier;
	//right
	if (39 in keysDown
		&& wizard.x < canvas.width-32-256)
		wizard.x += wizard.speed * modifier;

	//Touch the orc, u die
	//orc and wizard are two 32x32 pixels images
	if (
		wizard.x <= (orc.x+32)
		&& orc.x <= (wizard.x+32)
		&& wizard.y <= (orc.y+32)
		&& orc.y <= (wizard.y+32)
		)
	{
		//killedBy(orc);
		reset();
	}
};

var killedBy = function(creature)
{
	alert ("The "+creature.name + " smashed your head!");
	//document.getElementById('warning').innerHTML
	//= "The orc smashed your head!";
};


/*New Game------------------------------------------*/
//Reset the game when player touches the monster
var reset = function()
{
	//all resources lost
	wood = 0;
	stone = 0;
	soul = 0;
	//WIZARD INITIAL POSITION
	wizard.x = 64;
	wizard.y = 64;
};

/*Render Objects------------------------------------*/
//draw stuff
var render = function()
{

	//Background
	if (bgRdy)
	{
		var i =0;
		while (i < canvas.width)
		{
			var j =0;
			while (j < canvas.height)
			{
				ctx.drawImage(bgImg,i,j);
				j+=32;
			}
			i+=32;
		}
	}
	

	//Background Grass
	if (grassRdy)
	{
		var i =0;
		while (i < canvas.width-256)
		{
			var j =0;
			while (j < canvas.height-128)
			{
				ctx.drawImage(grassImg,i,j);
				j+=32;
			}
			i+=32;
		}
	}
	
	//Resources
	/*
	if (treeRdy)
	{
		var i =10;
		while (i < canvas.width*3/4)
		{
			var j =0;
			while (j < canvas.height/10)
			{
				ctx.drawImage(treeImg,i,j);
				j+=32;
			}
			i+=32;
		}
	}

	if (stoneRdy)
	{
		var i =0;
		while (i < canvas.width/2)
		{
			var j =canvas.height/2;
			while (j < canvas.height)
			{
				ctx.drawImage(stoneImg,i,j);
				j+=32;
			}
			i+=32;
		}
	}

	if (waterRdy)
	{
		ctx.drawImage(waterImg,canvas.width-128,canvas.height);
	}
	*/

	//Characters
	if (wizRdy)
		ctx.drawImage(wizImg,wizard.x,wizard.y);
	if (orcRdy)
		ctx.drawImage(orcImg,orc.x,orc.y);

	//resources
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Wood: "+wood,1300,32);
	ctx.fillText("Stone: "+stone,1300,64);
	ctx.fillText("Soul: "+soul,1300,96);
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

//ORC INITIAL POSITION
orc.x = canvas.width-64-256;
orc.y = canvas.height-64-128;

reset();
var then = Date.now();
setInterval(main,1);
