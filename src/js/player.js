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
  sent_east:false,
  sent_west:false,

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
        if (!this.sent_east)
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
          this.sent_east = true;
          this.sent_west = false;
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
    {
      this.txt_event.text("The fire was warm and comforting");
      if (!this.sent_west)
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
        this.sent_west = true;
        this.sent_east = false;
      }
    }


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
        else if (flag) {this.txt_event.text("You ran away as fast as you can!");flag = false}
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
