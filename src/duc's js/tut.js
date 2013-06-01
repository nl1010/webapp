
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

var logan = new Wizard();
logan.setHealth(10);
logan.setSpell("Magic Arrow");
logan.setName("Big Hat Logan");

document.write(logan.getName()+" uses "+logan.getSpell()+" to destroy you, n00b! <br />");

