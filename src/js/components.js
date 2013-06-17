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

/*Buildings-------------------------------------------------------*/
/*----------------------------------------------------------------*/

Crafty.c("Buildings",
{
  init: function()
  {
    this.requires('Obstacle');
  }
});

Crafty.c("Walls",
{
  init: function()
  {
    this.requires('Buildings');
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

Crafty.c('Wizard',
{
  //resources
  wood:0,
  stone:0,
  iron:0,
  crystal:0,
  soul:0,
  wood_display:0,
  stone_display:0,
  iron_display:0,
  crystal_display:0,
  soul_display:0,
  //building
  txt_buiding:0,
  //event
  txt_event:0,
  
  init: function()
  {
    this.requires('Actor, PlayerControls, Slide, spr_player')
		//collision handling
    this.collectResources();
    this.stopOnSolids();

    //creating resource display
    this.wood_display = Crafty.e('2D, DOM, Text')
    .attr({ x: Game.menu_width()+36, y: 0 })
    .css($text_css);
    this.stone_display = Crafty.e('2D, DOM, Text')
    .attr({ x: Game.menu_width()+36, y: 32 })
    .css($text_css);
    this.iron_display = Crafty.e('2D, DOM, Text')
    .attr({ x: Game.menu_width()+36, y: 64 })
    .css($text_css);
    this.crystal_display = Crafty.e('2D, DOM, Text')
    .attr({ x: Game.menu_width()+36, y: 96 })
    .css($text_css);
    this.soul_display = Crafty.e('2D, DOM, Text')
    .attr({ x: Game.menu_width()+36, y: 128 })
    .css($text_css);

    this.display_resources();

    //creating building menu
    this.txt_building = Crafty.e('2D, DOM, Text')
    .attr({ x: Game.menu_width(), y: 224 , w:164})
    .css($text_css_very_small);
    
    this.display_build_menu_outer();
    
    //Event Display
    this.txt_event = Crafty.e('2D, DOM, Text')
    .attr({ x: 4, y: 332, w: 512 })
    .css($text_css_very_small)
    .text("Fuck this crap! Chop them all!");
  },

  display_build_menu_outer: function()
  {
    this.txt_building.text("[B]uild stuff");
    this.bind('KeyDown', function(e)
    {
      if (e.key==Crafty.keys['B'])
        this.build_menu();
    })
  },

  display_build_menu: function()
  {
    this.txt_building.text("[A]ltar(free), [W]ooden Walls(1W)");
  },

  build_menu: function()
  {
    this.display_build_menu();
    this.bind('KeyDown', function(e)
    {
      if (e.key==Crafty.keys['A'])
        this.build_altar();
      if (e.key==Crafty.keys['W'])
        this.build_wood_wall();

      this.display_build_menu_outer();
    })
  },

  //buildings
  //Cheat
  build_altar: function()
  {
    this.txt_event.text("Praise the Sun!");
    this.wood += 50;
    this.stone += 50;
    this.iron += 50;
    this.crystal += 50;
    this.soul += 50;
    this.display_resources();
    //TODO: create a img object
  },

  build_wood_wall: function()
  {
    //TODO: build a 'Wall' object
  },

  display_resources: function()
  {
    this.wood_display.text(this.wood);
    this.stone_display.text(this.stone);
    this.iron_display.text(this.iron);
    this.crystal_display.text(this.crystal);
    this.soul_display.text(this.soul);
  },

  collectResources: function()
  {
    this.addComponent('Collision');
    this.onHit('Monsters', function(obj)
    {
      this.txt_event.text("Fight this monster![Y] / Nope![N]");
      this.bind('KeyDown', function(e)
      {
        if (e.key==Crafty.keys['Y'])
        {
          this.txt_event.text("The monster crushes your head! Press Enter to play again");
          this.bind('KeyDown', function(e)
          {
            Crafty.scene('Lose');
          })
        }
        else if (e.key==Crafty.keys['N'])
        {
          this.txt_event.text("You left it alone");
        }
        else this.txt_event.text("");
      })
    });
    this.onHit('Resources', function(res)
    {
      if (res[0].obj.has('Trees'))
      {
        this.txt_event.text("Chop this tree[Y] / Leave it[N]");
        this.bind('KeyDown', function(e)
        {
          if (e.key==Crafty.keys['Y'])
          {
            this.txt_event.text("You chopped the tree and gained 1 wood");
            this.wood++;
            this.display_resources();
            res[0].obj.destroy();
          }
          else if (e.key==Crafty.keys['N'])
          {
            this.txt_event.text("You left it alone");
          }
          else this.txt_event.text("");
        })
      } 

      if (res[0].obj.has('Stones'))
      {
        this.txt_event.text("Mine the stone[Y] / Leave it[N]");
        this.bind('KeyDown', function(e)
        {
          if (e.key==Crafty.keys['Y'])
          {
            this.txt_event.text("You smashed the rock and gained 1 stone");
            this.stone++;
            this.display_resources();
            res[0].obj.destroy();
          }
          else if (e.key==Crafty.keys['N'])
          {
            this.txt_event.text("You left it alone");
          }
          else this.txt_event.text("");
        })
      }

      if (res[0].obj.has('Iron'))
      {
        this.txt_event.text("Mine the iron[Y] / Leave it[N]");
        this.bind('KeyDown', function(e)
        {
          if (e.key==Crafty.keys['Y'])
          {
            this.txt_event.text("You mined the ore and gained 1 iron");
            this.iron++;
            this.display_resources();
            res[0].obj.destroy();
          }
          else if (e.key==Crafty.keys['N'])
          {
            this.txt_event.text("You left it alone");
          }
          else this.txt_event.text("");
        })
      }

      if (res[0].obj.has('Crystal'))
      {
        this.txt_event.text("Gather crystal[Y] / Leave it[N]");
        this.bind('KeyDown', function(e)
        {
          if (e.key==Crafty.keys['Y'])
          {
            this.txt_event.text("You found and gather 1 crystal");
            this.crystal++;
            this.display_resources();
            res[0].obj.destroy();
          }
          else if (e.key==Crafty.keys['N'])
          {
            this.txt_event.text("You left it alone");
          }
          else this.txt_event.text("");
        })
      }
    })
},

	//if onHit, stopMovement
	stopOnSolids: function()
	{
		this.addComponent('Collision')
    .onHit('Obstacle', function(obj)
    {
      this.cancelSlide();
    });
  }

});

//Controls
Crafty.c("PlayerControls", 
{
  _keys: { 
    UP_ARROW: [0,-1],
    DOWN_ARROW: [0,1],
    RIGHT_ARROW: [1,0],
    LEFT_ARROW: [-1,0],
  }, 

  init: function() 
  {
    this._moveX = 0;
    this._moveY = 0;

    for(var k in this._keys) 
    {
      var keyCode = Crafty.keys[k] || k;
      this._keys[keyCode] = this._keys[k];
    }

    this.bind("KeyDown",function(e) 
    {
      if(this._keys[e.key]) 
      {
        //create cookies--move this to the right position
        var direction = this._keys[e.key];
        createCookie("x",parseInt(this.x/Game.map_grid.tile.width),1);
        createCookie("y",parseInt(this.y/Game.map_grid.tile.height),1);
        createCookie("direction",direction,1);

        //Trigger the Slide animation
        this.trigger('Slide',direction);
        //Ending a 'Turn'
        Crafty.trigger('Turn');
      }
    })
  }
});

Crafty.c("Slide", 
{
  init: function() 
  {
    this._stepFrames = 5;
    this._tileSize = 16;
    this._moving = false;
    this._vx = 0; this._destX = 0; this._sourceX = 0;
    this._vy = 0; this._destY = 0; this._sourceY = 0;
    this._frames = 0;

    this.bind("Slide", function(direction) 
    {
        // Don't continue to slide if we're already moving
        if(this._moving) return false;
        this._moving = true;

        // keep our pre-movement location
        // Hey, Maybe we'll need it later :)
    this._sourceX = this.x;
    this._sourceY = this.y;

        // Figure out our destination
        this._destX = this.x + direction[0] * 16;
        this._destY = this.y + direction[1] * 16;

        // Get our x and y velocity
        this._vx = direction[0] * this._tileSize / this._stepFrames;
        this._vy = direction[1] * this._tileSize / this._stepFrames;

        this._frames = this._stepFrames;
      }).bind("EnterFrame", function(e) 
      {
        if(!this._moving) return false;

      // If we'removing, update our position by our per-frame velocity
      this.x += this._vx;
      this.y += this._vy;
      this._frames--;

      if(this._frames == 0) 
      {
        // If we've run out of frames,
        // move us to our destination to avoid rounding errors.
        this._moving = false;
        this.x = this._destX;
        this.y = this._destY;
      }
      this.trigger('Moved', {x: this.x, y: this.y});
    });
    }, 

    slideFrames: function(frames) 
    { 
      this._stepFrames = frames;
    },

    // A function we'll use later to 
    // cancel our movement and send us back to where we started
    cancelSlide: function() 
    {
      this.x = this._sourceX;
      this.y = this._sourceY;
      this._moving = false;
    }
  });