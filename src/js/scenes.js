
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
  .text('ID: '+$user_id)
  .css($text_css);

  //indicate the resource that is touching character
  Crafty.e('2D, DOM, Text')
  .attr({ x: Game.menu_width()+4, 
    y: 192 })
  .text('t: ')
  .css($text_css);

  //Button
  /*
  Crafty.e("2D, DOM, Image, msg_button")
  .attr({ x: Game.menu_width()+4, 
    y: 224 })
  .areaMap([0,0],[128,0],[128,45],[0,45]);
  */

  /*----------------------------------------------------------------*/

// MAP DRAWING
// -----------

  Crafty.e("2D,DOM,TiledMapBuilder")
  //set data source
  .setMapDataSource(SOURCE_FROM_TILED_MAP_EDITOR)
  //create world
  .createWorld(function(tiledmap)
  {
    //water
    for (var water = 0; 
      water < tiledmap.getEntitiesInLayer('Water').length;
      water++)
    {
      tiledmap.getEntitiesInLayer('Water')[water]
      .addComponent("Water");
    }

    //obstacles
    for (var obstacle = 0; 
      obstacle < tiledmap.getEntitiesInLayer('Obstacle').length;
      obstacle++)
    {
      tiledmap.getEntitiesInLayer('Obstacle')[obstacle]
      .addComponent("Collision")
      .collision();
    } 

    //Trees
    for (var tree = 0; 
      tree < tiledmap.getEntitiesInLayer('Trees').length;
      tree++)
    {
      tiledmap.getEntitiesInLayer('Trees')[tree]
      .addComponent("Collision, Obstacle")
      .collision();
    }

    //Stones
    for (var stone = 0; 
      stone < tiledmap.getEntitiesInLayer('Stones').length;
      stone++)
    {
      tiledmap.getEntitiesInLayer('Stones')[stone]
      .addComponent("Collision, Obstacle")
      .collision();
    }

    //Iron
    for (var iron = 0; 
      iron < tiledmap.getEntitiesInLayer('Iron').length;
      iron++)
    {
      tiledmap.getEntitiesInLayer('Iron')[iron]
      .addComponent("Collision, Obstacle")
      .collision();
    }
    
    //Crystal
    for (var crystal = 0; 
      crystal < tiledmap.getEntitiesInLayer('Crystal').length;
      crystal++)
    {
      tiledmap.getEntitiesInLayer('Crystal')[crystal]
      .addComponent("Collision, Obstacle")
      .collision();
    }
    
    //Monsters
    for (var monster = 0; 
      monster < tiledmap.getEntitiesInLayer('Monsters').length;
      monster++)
    {
      tiledmap.getEntitiesInLayer('Monsters')[monster]
      .addComponent("Collision, Obstacle")
      .collision();
    }
    
  });

  //Hero
  this.player = Crafty.e('Wizard')
  .attr({x:304, y:256});

});
// Victory Scene
// -------------
Crafty.scene('Victory', function() 
{
  Crafty.e('2D, DOM, Text')
  .attr({ x: Game.width()/2-32, 
    y: Game.height()/2-32 })
  .text('Victory!')
  .css($text_css);

  this.restart_game 
  = this.bind('KeyDown', function() 
  {
    Crafty.scene('Game');
  });
}, function() 
{
  this.unbind('KeyDown', this.restart_game);
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
  Crafty.load(['assets/spr.png',
    'assets/ground.png',
    'assets/obstacles.png',
    'assets/water.png'], function()
    {
    // Once the image is loaded...

    // Define the individual sprites in the image
    // Each one (spr_water, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
    
    Crafty.sprite(16, 'assets/spr.png', 
    {
      //spr_water:   [0, 68],
      //spr_tree:    [0, 66],
      //spr_village: [0, 62],
      spr_scroll: [0, 46],
      spr_player:  [0, 70],
      //spr_grass:   [0, 36]
    });

    alert("Welcome to the Island!");    
    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  })
});