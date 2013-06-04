
function Wizard()
{
	this.name = "Name";
	this.spell = "Spell";
	this.health = 0;
}

Wizard.prototype.setName = function(newName) 
{
	this.name = newName;
}

Wizard.prototype.getName = function()
{
	return this.name;
}

Wizard.prototype.setSpell = function(newSpell) 
{
	this.spell = newSpell;
}

Wizard.prototype.chooseSpell = function()
{
	var seed = Math.floor((Math.random()*4)+1);
	switch (seed)
	{
		case 1:
			this.takeSpell(magic_arrow);
			break;
		case 2:
			this.takeSpell(b_magic_arrow);
			break;
		case 3:
			this.takeSpell(fire_ball);
			break;
		case 4:
			this.takeSpell(combustion);
			break;
	}
}

Wizard.prototype.takeSpell = function(spell)
{
	document.write("<br/>"
		+this.getName()
		+" has chosen the "
		+spell.getName()
		+"!<br/>");
	this.setSpell(spell);
}

Wizard.prototype.getSpell = function()
{
	return this.spell;
}

Wizard.prototype.setHealth = function(newHealth) 
{
	this.health = newHealth;
}

Wizard.prototype.getHealth = function()
{
	return this.health;
}

/*---------------------------------------------------------*/

function Spell()
{
	this.name = "Spell Name";
	this.dmg = 0;
}

Spell.prototype.setName = function(newSpellName)
{
	this.name = newSpellName;
}

Spell.prototype.getName = function()
{
	return this.name;
}

Spell.prototype.setDmg = function(newDmg)
{
	this.dmg = newDmg;
}

Spell.prototype.getDmg = function()
{
	return this.dmg;
}

/*---------------------------------------------------------*/

function Duel()
{
	this.first = "first";
	this.second = "second";
	this.winner = this.getFirst();
	this.loser = this.getSecond();
}

Duel.prototype.setFirst = function(wizard)
{
	this.first = wizard;
}

Duel.prototype.setSecond = function(wizard)
{
	this.second = wizard;
}

Duel.prototype.setWinner = function(wizard)
{
	this.winner = wizard;
}

Duel.prototype.setLoser = function(wizard)
{
	this.loser = wizard;
}

Duel.prototype.getFirst = function()
{
	return this.first;
}

Duel.prototype.getSecond = function()
{
	return this.second;
}

Duel.prototype.getWinner = function()
{
	return this.winner;
}

Duel.prototype.getLoser = function()
{
	return this.loser;
}

Duel.prototype.displayHP = function()
{
	document.write("<br/>"
		+this.getFirst().getName()
		+" 's HP: "
		+this.getFirst().getHealth()
		+"<br/>");

	document.write("<br/>"
		+this.getSecond().getName()
		+" 's HP: "
		+this.getSecond().getHealth()
		+"<br/>");
}

Duel.prototype.castSpell = function(attacker, defender)
{
	document.write("<br/>"
		+attacker.getName()
		+" uses his motherfucking  "
		+attacker.getSpell().getName()
		+" to damage the shit out of "
		+defender.getName()
		+"<br/>");

	defender.setHealth(
		defender.getHealth()
		-attacker.getSpell().getDmg());
}

Duel.prototype.fight = function()
{
	this.castSpell(this.getFirst(), this.getSecond());
	this.displayHP();
	
	if (this.getSecond().getHealth() <= 0)
	{
		this.setWinner(this.getFirst());
		this.setLoser(this.getSecond());
	}
	else
	{
		this.castSpell(this.getSecond(), this.getFirst());
		this.displayHP();
	
		if (this.getFirst().getHealth() <= 0)
		{
			this.setWinner(this.getSecond());
			this.setLoser(this.getFirst());
		}
	}
}

/*---------------------------------------------------------*/
/*SPELLS DB*/

var magic_arrow = new Spell();
magic_arrow.setName("Magic Arrow");
magic_arrow.setDmg(4);

var b_magic_arrow = new Spell();
b_magic_arrow.setName("Badass Magic Arrow");
b_magic_arrow.setDmg(6);

var fire_ball = new Spell();
fire_ball.setName("Fire Ball");
fire_ball.setDmg(10);

var combustion = new Spell();
combustion.setName("Combustion");
combustion.setDmg(5);

/*---------------------------------------------------------*/
/*WIZARDS DB*/

var logan = new Wizard();
logan.setHealth(10);
logan.setName("Big Hat Logan");

var pyro = new Wizard();
pyro.setHealth(15);
pyro.setName("Laurentius");

var griggs = new Wizard();
griggs.setHealth(8);
griggs.setName("Griggs");

/*---------------------------------------------------------*/

function commence()
{
	var seed = Math.random();
	if (seed < 0.33)
	{
		var init = Math.random();
		init < 0.5 ? 
			duelBetween(logan, pyro) : duelBetween(pyro, logan);
	}
	else if (0.33 <= seed && seed < 0.66) 
	{
		var init = Math.random();
		init < 0.5 ? 
			duelBetween(logan, griggs) : duelBetween(griggs, logan);
	}
	else if (0.66 <= seed)
	{
		var init = Math.random();
		init < 0.5 ? 
			duelBetween(pyro, griggs) : duelBetween(griggs, pyro);
	}
}

function duelBetween(w1, w2)
{
	var duel = new Duel();
	duel.setFirst(w1);
	duel.setSecond(w2);

	document.write("\"We are the super powerful "
		+duel.getFirst().getName()
		+" and "
		+duel.getSecond().getName()
		+"!<br/>");

	document.write("You shall be the witness to our incredible duel! \"<br/>");

	duel.getFirst().chooseSpell();
	duel.getSecond().chooseSpell();

	duel.displayHP();
	
	while (duel.getFirst().getHealth() > 0 
		&& duel.getSecond().getHealth() > 0)
	{
		duel.fight();
	}
	
	document.write("<br/>");
	document.write(
		duel.getWinner().getName()
		+" fucking destroyed "
		+duel.getLoser().getName()
		+"!");
}

function evilLaugh()
{
	document.write("<br/>Muahahahahahah... <br />");
}

commence();

/*---------------------------------------------------------*/

function hideAll()
{
	document.getElementById("pw").style.visibility = 'hidden';
	document.getElementById("pc").style.visibility = 'hidden';
	document.getElementById("r").style.visibility = 'hidden';	
}

function pokeWinner()
{
	document.getElementById("whattodo").innerHTML 
	= "He beat the shit out of you for disrespecting him";
	hideAll();
}

function pokeCorpse()
{
	document.getElementById("whattodo").innerHTML 
	= "The victor beat the shit out of you for disrespecting his rival";		
	hideAll();
}

function run()
{
	document.getElementById("whattodo").innerHTML 
	= "You ran into an invisible wall and woke up finding yourself lying under your bed. Better go take a piss...";
	hideAll();
}