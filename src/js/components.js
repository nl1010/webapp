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
    this.requires('Obstacle');
  }
});

Crafty.c("Wood_Wall",
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
  //bonfire rest
  rested_east:false,
  rested_west:false,
  east:0,
  west:0,

  init: function()
  {
    this.requires('Actor, PlayerControls, Slide, spr_player')
    //collect res
    this.collectResources();
    //fight monsters
    this.fightMonsters();
    //bonfires interaction
    this.east = Crafty.e('BonfireE')
    .attr({x:384, y:128});
    this.west = Crafty.e('BonfireW')
    .attr({x:80, y:176});
    this.restEast();
    this.restWest();
    //collision handling
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
    .text("The adventure begins!");
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
    this.txt_building.text("[A]ltar(free), [W]ooden Walls(1W), [G]ateway");
  },

  build_menu: function()
  {
    this.display_build_menu();
    var flag = true;
    this.bind('KeyDown', function(e)
    {
      if (e.key==Crafty.keys['A'] && flag)
        this.build_altar();
      if (e.key==Crafty.keys['W'] && flag)
        this.build_wood_wall();

      this.display_build_menu_outer();
      flag = false;
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

  restEast: function()
  {
    this.addComponent('Collision');
    this.onHit('BonfireE', function(bonfire)
    {
      var flag = true;
      if (!this.rested_east)
        this.txt_event.text("[R]est at campfire to save the resources")
      else 
      {
        this.txt_event.text("The fire was warm and comforting");
        if (flag)
        {
          var userid = readCookie('userid');
          var x = readCookie('x');
          var y = readCookie('y');
          var iron = readCookie('iron');
          var wood = readCookie('wood');
          var crystal = readCookie('crystal');
          var stone = readCookie('stone');
          $.post('PHP/save.php',{
            userid:userid,
            x:x,
            y:y,
            iron:iron,
            wood:wood,
            crystal:crystal,
            stone:stone
          },function (data){
            alert(data);
          });
          flag = false;
        }
      }


      this.bind('KeyDown', function(e)
      {
        if (this.rested_east && flag)
        {
          flag = false;
        } else if (e.key==Crafty.keys['R'] && flag && !this.rested_east)
        {
          flag = false;
          this.rested_east = true;
          this.east.image("assets/lit_fire.png");
          this.rested_west = false;
          this.west.image("assets/unlit_fire.gif");
        }
      });
    }, function(bonfire)
    {
      this.txt_event.text("");
      flag = false;
    })
},

restWest: function()
{
  this.addComponent('Collision');
  this.onHit('BonfireW', function(bonfire)
  {
    var flag = true;
    if (!this.rested_west)
      this.txt_event.text("[R]est at campfire to save the resources")
    else 
      this.txt_event.text("The fire was warm and comforting");

    this.bind('KeyDown', function(e)
    {
      if (this.rested_west && flag)
      {
        flag = false;
      } else if (e.key==Crafty.keys['R'] && flag && !this.rested_west)
      {
        flag = false;
        this.rested_west = true;
        this.west.image("assets/lit_fire.png");
        this.rested_east = false;
        this.east.image("assets/unlit_fire.gif");
      }
    });
  }, function(bonfire)
  {
    this.txt_event.text("");
    flag = false;
  })
},

fightMonsters: function()
{
  this.addComponent('Collision');
  this.onHit('Monsters', function(monster)
  {
    this.txt_event.text("Fight this monster![Y] / Nope![N]");
    var flag = true;
    this.bind('KeyDown', function(e)
    {
      if (e.key==Crafty.keys['Y'] && flag)
      {
        if (this.wood >= 1 && this.iron >= 1
          && this.stone >= 1 && this.crystal >= 1)
        {
          this.txt_event.text("Uraaa!");
          flag = false;
          monster[0].obj.destroy();
            //reduces resources
            this.wood--; this.iron--;
            this.stone--; this.crystal--;
            this.soul++;
            this.display_resources();
            var flag2 = true;
            this.bind('KeyDown', function(e)
            {
              if (flag2){this.txt_event.text("You throw everything you have to the monster. He got angry and injured himself to death");flag=false;flag2=false;}          
            })
          } 
          else
          {
            this.txt_event.text("The monster crushes your head!");
            flag = false;
            this.bind('KeyDown', function(e)
            {
              Crafty.scene('Lose');
            })
          }     
        }
        else if (e.key==Crafty.keys['N'] && flag)
        {
          this.txt_event.text("You ignore the beast");
          flag = false;
        }
        else if (flag) {this.txt_event.text("You ran as fast as you can!");flag = false}
      })
});
},

collectResources: function()
{
  this.addComponent('Collision');
  this.onHit('Resources', function(res)
  {
    if (res[0].obj.has('Trees'))
    {
      this.txt_event.text("Chop this tree[Y] / Leave it[N]");
        //need this to solve the resource keyboard bug
        var flag = true;
        this.bind('KeyDown', function(e)
        {
          if (e.key==Crafty.keys['Y'] && flag)
          {
            this.txt_event.text("You chopped the tree and gained 1 wood");
            this.wood++;
            createCookie('wood', this.wood, 1);
            this.display_resources();
            res[0].obj.destroy();
            flag = false;
          }
          else if (e.key==Crafty.keys['N'] && flag)
          {
            this.txt_event.text("You left it alone");
            flag = false;
          }
          else {this.txt_event.text("");flag = false}
        })
      } 

      if (res[0].obj.has('Stones'))
      {
        this.txt_event.text("Mine the stone[Y] / Leave it[N]");
        var flag = true;
        this.bind('KeyDown', function(e)
        {
          if (e.key==Crafty.keys['Y'] && flag)
          {
            this.txt_event.text("You smashed the rock and gained 1 stone");
            this.stone++;
            createCookie('stone', this.stone, 1);
            this.display_resources();
            res[0].obj.destroy();
            flag = false;
          }
          else if (e.key==Crafty.keys['N'] && flag)
          {
            this.txt_event.text("You left it alone");
            flag = false;
          }
          else {this.txt_event.text("");flag = false}
        })
      }

      if (res[0].obj.has('Iron'))
      {
        this.txt_event.text("Mine the iron[Y] / Leave it[N]");
        var flag = true;
        this.bind('KeyDown', function(e)
        {
          if (e.key==Crafty.keys['Y'] && flag)
          {
            this.txt_event.text("You mined the ore and gained 1 iron");
            this.iron++;
            createCookie('iron', this.iron, 1);
            this.display_resources();
            res[0].obj.destroy();
            flag = false;
          }
          else if (e.key==Crafty.keys['N'] && flag)
          {
            this.txt_event.text("You left it alone");
            flag = false;
          }
          else {this.txt_event.text("");flag = false}
        })
      }

      if (res[0].obj.has('Crystal'))
      {
        this.txt_event.text("Gather crystal[Y] / Leave it[N]");
        var flag = true;
        this.bind('KeyDown', function(e)
        {
          if (e.key==Crafty.keys['Y'])
          {
            this.txt_event.text("You found and gather 1 crystal");
            this.crystal++;
            createCookie('crystal', this.crystal, 1);
            this.display_resources();
            res[0].obj.destroy();
            flag = false;
          }
          else if (e.key==Crafty.keys['N'] && flag)
          {
            this.txt_event.text("You left it alone");
            flag = false;
          }
          else {this.txt_event.text("");flag = false}
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