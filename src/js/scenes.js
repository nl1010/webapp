
function readCookie(name) {
  var ca = document.cookie.split(';');
  var nameEQ = name + "=";
  for(var i=0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1, c.length); //delete spaces
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return "";
}

$user_id =readCookie("userid");
//-------------above is prototype cookie reading function-------------------------------

Crafty.scene('Game', function() 
{
// MAP DRAWING
// -----------

Crafty.e("2D,DOM,TiledMapBuilder")
  //set data source
  .setMapDataSource(SOURCE_FROM_TILED_MAP_EDITOR)
  //create world
  .createWorld(function(tiledmap)
  {
    //obstacles
    for (var obstacle = 0; 
      obstacle < tiledmap.getEntitiesInLayer('Obstacle').length;
      obstacle++)
    {
      tiledmap.getEntitiesInLayer('Obstacle')[obstacle]
      .addComponent('Collision')
      .collision();
    } 

    //Trees
    for (var tree = 0; 
      tree < tiledmap.getEntitiesInLayer('Trees').length;
      tree++)
    {
      tiledmap.getEntitiesInLayer('Trees')[tree]
      .addComponent("Trees")
      .collision();
    }

    //Stones
    for (var stone = 0; 
      stone < tiledmap.getEntitiesInLayer('Stones').length;
      stone++)
    {
      tiledmap.getEntitiesInLayer('Stones')[stone]
      .addComponent("Stones")
      .collision();
    }

    //Iron
    for (var iron = 0; 
      iron < tiledmap.getEntitiesInLayer('Iron').length;
      iron++)
    {
      tiledmap.getEntitiesInLayer('Iron')[iron]
      .addComponent("Iron")
      .collision();
    }
    
    //Crystal
    for (var crystal = 0; 
      crystal < tiledmap.getEntitiesInLayer('Crystal').length;
      crystal++)
    {
      tiledmap.getEntitiesInLayer('Crystal')[crystal]
      .addComponent("Crystal")
      .collision();
    }
    
    //Monsters
    for (var monster = 0; 
      monster < tiledmap.getEntitiesInLayer('Monsters').length;
      monster++)
    {
      tiledmap.getEntitiesInLayer('Monsters')[monster]
      .addComponent("Monsters")
      .collision();
    }
    
  });

  //Hero
  this.player = Crafty.e('Wizard')
  .attr({x:304, y:144});

  //Side Bar---------------------------
  /*----------------------------------------------------------------*/
  //Resources:
  Crafty.e('2D, DOM, Text')
  .attr({ x: Game.menu_width()+4, 
    y: 0 })
  .text('Wood: ')
  .css($text_css);

  Crafty.e('2D, DOM, Text')
  .attr({ x: Game.menu_width()+4, 
    y: 32 })
  .text('Stone: ')
  .css($text_css);

  Crafty.e('2D, DOM, Text')
  .attr({ x: Game.menu_width()+4, 
    y: 64 })
  .text('Iron: ')
  .css($text_css);

  Crafty.e('2D, DOM, Text')
  .attr({ x: Game.menu_width()+4, 
    y: 96 })
  .text('Crystal: ')
  .css($text_css);

  Crafty.e('2D, DOM, Text')
  .attr({ x: Game.menu_width()+4, 
    y: 128 })
  .text('Soul: ')
  .css($text_css);

  Crafty.e('2D, DOM, Text')
  .attr({ x: Game.menu_width()+4, 
    y: 160 })
  .text('ID:')
  .css($text_css);

  Crafty.e('2D, DOM, Text')
  .attr({ x: Game.menu_width()+48, 
    y: 160 })
  .text($user_id)
  .css($text_css);

});
// Victory Scene
// -------------
Crafty.scene('Victory', function() 
{
  Crafty.e('2D, DOM, Text')
  .attr({ x: Game.width()/2-256, 
    y: Game.height()/2-100,
    w: 512 })
  .text('Finally you have succeeded in building the Gateway. You can now escape the island!...bye :(')
  .css($text_css);

  this.restart_game1
  = this.bind('KeyDown', function() 
  {
    Crafty.scene('Game');
  });
}, function() 
{
  this.unbind('KeyDown', this.restart_game1);
});

//Die Scene
Crafty.scene('Lose', function()
{
  Crafty.e('2D, DOM, Text')
  .text('YOU DIED! ...noob')
  .attr({ x: 0, 
    y: Game.height()/2, 
    w: Game.width() })
  .css($text_css);
  
  this.restart_game2
  = this.bind('KeyDown', function() 
  {
    Crafty.scene('Game');
  });
}, function() 
{
  this.unbind('KeyDown', this.restart_game2);
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function()
{
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  Crafty.e('2D, DOM, Text')
  .text('Loading...')
  .attr({ x: 0, 
    y: Game.height()/2, 
    w: Game.width() })
  .css($text_css);

  // Load our sprite map image
  Crafty.load(['assets/all_spr.png',
    'assets/ground.png',
    'assets/obstacles.png',
    'assets/water.png',
    'assets/lit_fire.png'], function()
    {
    // Once the image is loaded...

    // Define the individual sprites in the image
    // Each one (spr_water, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
    
    Crafty.sprite(16, 'assets/all_spr.png', 
    {
      spr_scroll: [0, 46],
      spr_player: [0, 90],
      spr_altar: [0, 62],
      spr_wood_wall: [0, 50],
      spr_bonfire: [0, 12],
      spr_library: [0, 8],
      spr_gateway: [0, 60]
    });

    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  })
});
