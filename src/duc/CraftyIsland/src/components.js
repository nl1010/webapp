//This file defines the components
//that will be used in the game. ie trees, water

// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid',
{
	init: function() 
	{
    	this.attr
    	({
      		w: Game.map_grid.tile.width,
      		h: Game.map_grid.tile.height
    	})
	},
 
  	// Locate this entity at the given position 
  	//on the grid
  	at: function(x, y) 
  	{
    	if (x === undefined && y === undefined) 
    	{
      		return { x: this.x/Game.map_grid.tile.width,
      			y: this.y/Game.map_grid.tile.height }
    	}
    	else
    	{
      		this.attr
      		({ 
      			x: x * Game.map_grid.tile.width, 
      			y: y * Game.map_grid.tile.height 
      		});
      		return this;
    	}
  	}
});

/*
Crafty.c('Sidebar',
{
  init: function()
  {
    this.requires('Grid');
    Crafty.e('2D, DOM, Text')
    .attr({ x: Game.menu_width()+10, 
            y: Game.height() })
    .text('Wood: ')
    .css($text_css);
  },
});
*/

//An Actor is an entitiy that is drawn 
//in 2D on canvas via our logical coordinate grid
Crafty.c('Actor',
{
	init: function()
	{
		this.requires('2D, Canvas, Grid');
	},
});

//Grass background
Crafty.c('Grass',
{
	init: function()
	{
		this.requires('Actor, spr_grass');
	},
});

//Now water and trees can be defined 
//using Actor, just change the color
Crafty.c('Water', 
{
	init: function() 
	{
    	this.requires('Actor, Solid, spr_water');
  	},
});
 
Crafty.c('Tree', 
{
  	init: function() 
  	{
    	this.requires('Actor, Solid, spr_tree');
  	},
});

Crafty.c('Wizard',
{
	init: function()
	{
		this.requires('Actor, Fourway, Collision, spr_player')
		.fourway(3)
		//collision handling
		.stopOnSolids()
		.onHit('Village', this.visitVillage);
	},

	//if onHit, stopMovement
	stopOnSolids: function()
	{
		this.onHit('Solid', this.stopMovement);
		return this;
	},

	//actual stopMovement code
	stopMovement: function()
	{
		this._speed = 0;
		if (this._movement)
		{
			this.x -= this._movement.x;
			this.y -= this._movement.y;
		}
	},

	// Respond to this player visiting a village
  	visitVillage: function(data) 
  	{
    	villlage = data[0].obj;
    	villlage.collect();
  	}
});

// A village is a tile on the grid that the PC 
//must visit in order to win the game
Crafty.c('Village', 
{
 	init: function() 
 	{
    	this.requires('Actor, spr_village');
  	},
 
  	collect: function() 
  	{
    	this.destroy();
    	//mark the village as visited
    	//so we can keep track of the score
    	Crafty.trigger('VillageVisited',this);
  	}
});
