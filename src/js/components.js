//--import function
function createCookie(name, value, days) 
{
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

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

Crafty.c('Actor',
{
	init: function()
	{
		this.requires('2D, DOM, Grid');
	},
});

Crafty.c('Obstacle',
{
  init: function()
  {
    this.requires('Actor, Collision');
  }
});

/*Traps  ---------------------------------------------------------*/
/*----------------------------------------------------------------*/

Crafty.c('Trap',
{
  init: function()
  {
    this.requires('Actor');
  }
});

Crafty.c('Between',
{
  init: function()
  {
    this.requires('Trap');
  }
});

Crafty.c('Graveyard',
{
  init: function()
  {
    this.requires('Trap');
  }
});

Crafty.c('Dragon',
{
  init: function()
  {
    this.requires('Trap');
  }
});

/*Bonfire---------------------------------------------------------*/
/*----------------------------------------------------------------*/

Crafty.c("BonfireE",
{
  init: function()
  {
    this.requires('Actor,Image').image("assets/unlit_fire.gif");
  }
});

Crafty.c("BonfireW",
{
  init: function()
  {
    this.requires('Actor,Image').image("assets/unlit_fire.gif");
  }
});

/*Buildings-------------------------------------------------------*/
/*----------------------------------------------------------------*/

Crafty.c("Buildings",
{
  init: function()
  {
    this.requires('Actor');
  }
});

Crafty.c("Wood_Wall",
{
  init: function()
  {
    this.requires('Buildings, spr_wood_wall, Obstacle');
  }
});

Crafty.c("Library",
{
  init: function()
  {
    this.requires('Buildings, spr_library');
  }
});

Crafty.c("Gateway",
{
  init: function()
  {
    this.requires('Buildings, spr_gateway');
  }
});

Crafty.c("Altar",
{
  init: function()
  {
    this.requires('Buildings');
  }
});
/*Resources-------------------------------------------------------*/
/*----------------------------------------------------------------*/

Crafty.c("Resources",
{
  init: function()
  {
    this.requires('Obstacle');
  }
});

Crafty.c("Trees",
{
  init: function()
  {
    this.requires('Resources');
  }
});

Crafty.c("Stones",
{
  init: function()
  {
    this.requires('Resources');
  }
});

Crafty.c("Iron",
{
  init: function()
  {
    this.requires('Resources');
  }
});

Crafty.c("Crystal",
{
  init: function()
  {
    this.requires('Resources');
  }
});

/*Monsters--------------------------------------------------------*/
/*----------------------------------------------------------------*/
Crafty.c("Monsters",
{
  init: function()
  {
    this.requires('Obstacle');
  }
});

Crafty.c('Message',
{
  init: function()
  {
    this.requires('Actor, spr_scroll');
  },
});

