
function Wizard()
{
	this.name = "Name";
	this.spell = "Spell";
	this.health = 0;
}

Wizard.prototype.setName = function(newName) 
{
	if (typeof newName != 'undefined')
	{
		this.name = newName;
	}
	else
	{
		document.write("Need a badass name");
	}
}

Wizard.prototype.getName = function()
{
	return this.name;
}

Wizard.prototype.setSpell = function(newSpell) 
{
	if (typeof newSpell != 'undefined')
	{
		this.spell = newSpell;
	}
	else
	{
		document.write("Need a badass spell");
	}
}

Wizard.prototype.getSpell = function()
{
	return this.spell;
}

Wizard.prototype.setHealth = function(newHealth) 
{
	if (typeof newHealth != 'undefined')
	{
		this.health = newHealth;
	}
	else
	{
		document.write("Need a valid HP");
	}
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
	if (typeof newSpellName != 'undefined')
	{
		this.name = newSpellName;
	}
	else
	{
		document.write("Need a valid Spell Name");
	}
}

Spell.prototype.getName = function()
{
	return this.name;
}

Spell.prototype.setDmg = function(newDmg)
{
	if (typeof newDmg != 'undefined')
	{
		this.dmg = newDmg;
	}
	else
	{
		document.write("Need a valid Damage");
	}
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

Duel.prototype.fight = function()
{
	this.getSecond().setHealth(
		this.getSecond().getHealth()
		-this.getFirst().getSpell().getDmg());

	if (this.getSecond().getHealth() <= 0)
	{
		this.winner = this.getFirst();
		this.loser = this.getSecond();
	}

	this.getFirst().setHealth(
		this.getFirst().getHealth()
		-this.getSecond().getSpell().getDmg());	

	if (this.getFirst().getHealth() <= 0)
	{
		this.winner = this.getSecond();
		this.loser = this.getFirst();
	}
}


/*---------------------------------------------------------*/

var magic_arrow = new Spell();
magic_arrow.setName("Magic Arrow");
magic_arrow.setDmg(10);

var fire_ball = new Spell();
fire_ball.setName("Fire Ball");
fire_ball.setDmg(15);


var logan = new Wizard();
logan.setHealth(10);
logan.setSpell(magic_arrow);
logan.setName("Big Hat Logan");

var pyro = new Wizard();
pyro.setHealth(15);
pyro.setSpell(fire_ball);
pyro.setName("Laurentius");

/*---------------------------------------------------------*/

function killMe(wizard)
{
	document.write("<br/> You poke "+wizard.getName()+"! <br/>");
	document.write(
		wizard.getName()
		+" uses "
		+wizard.getSpell().getName()
		+" to fucking destroy you, n00b! <br />");
}

function duelBetween(w1, w2)
{
	var duel = new Duel();
	duel.setSecond(w2);
	duel.setFirst(w1);
	duel.fight();
	document.write("<br/> A duel is commenced between "
		+duel.getFirst().getName()
		+" and "
		+duel.getSecond().getName()
		+"!<br/>");
	document.write(
		duel.getWinner().getName()
		+" uses "
		+duel.getWinner().getSpell().getName()
		+" to fucking destroy "
		+duel.getLoser().getName()
		+"!"
		+"<br />");
}

function evilLaugh()
{
	document.write("<br/>Muahahahahahah... <br />");
}

killMe(logan);
killMe(pyro);
duelBetween(pyro, logan);
evilLaugh();
