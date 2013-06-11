Crafty.scene('Game', function() 
{
  
  //Side Bar---------------------------
  //Resources:
  Crafty.e('2D, DOM, Text')
    .attr({ x: Game.menu_width()+2, 
            y: 0 })
    .text('Wood: ')
    .css($text_css);

  Crafty.e('2D, DOM, Text')
    .attr({ x: Game.menu_width()+2, 
            y: 32 })
    .text('Stone: ')
    .css($text_css);

  Crafty.e('2D, DOM, Text')
    .attr({ x: Game.menu_width()+2, 
            y: 64 })
    .text('Iron: ')
    .css($text_css);

  Crafty.e('2D, DOM, Text')
    .attr({ x: Game.menu_width()+2, 
            y: 96 })
    .text('Souls: ')
    .css($text_css);

  //Items------------------------------
  //Message
  


  // A 2D array to keep track of all occupied tiles
  this.occupied = new Array(Game.map_grid.width
                            -Game.menu.width);
  for (var i = 0; i < Game.map_grid.width
                            -Game.menu.width; i++) 
  {
    this.occupied[i] = new Array(Game.map_grid.height);
    for (var j = 0; j < Game.map_grid.height; j++)
    {
      this.occupied[i][j] = false;
      Crafty.e('Grass').at(i,j);
    }
  }
 
  // Player character, placed at 5, 5 on our grid
  this.player = Crafty.e('Wizard').at(5, 5);
  this.occupied[this.player.at().x][this.player.at().y] 
      = true;
 
  // Place a water at every edge square 
  //on our grid of 16x16 tiles
  for (var x = 0; x < Game.map_grid.width
                      -Game.menu.width; x++) 
  {
    for (var y = 0; y < Game.map_grid.height; y++) 
    {
      var at_edge = x == 0 
      || x == Game.map_grid.width 
              -Game.menu.width - 1 
      || y == 0 
      || y == Game.map_grid.height - 1;
 
      if (at_edge) 
      {
        // Place a water entity at the current tile
        Crafty.e('Water').at(x, y);
        this.occupied[x][y] = true;
      } 
      else if (Math.random() < 0.03 
        && !this.occupied[x][y]) 
      {
        // Place a tree entity at the current tile
        Crafty.e('Tree').at(x, y);
        this.occupied[x][y] = true;
      }
    }
  }
 
  // Generate up to five villages on the map in random locations
  var max_villages = 5;
  for (var x = 0; x < Game.map_grid.width
                      -Game.menu.width; x++) 
  {
    for (var y = 0; y < Game.map_grid.height; y++) 
    {
      if (Math.random() < 0.02) 
      {
        if (Crafty('Village').length < max_villages 
          && !this.occupied[x][y]) 
          Crafty.e('Village').at(x, y);
      }
    }
  }
 
  this.show_victory 
  = this.bind('VillageVisited', function() 
  {
    if (!Crafty('Village').length) 
      //All villages visited,
      //victory condition met
      Crafty.scene('Victory');
  });
}, function() 
  {
    this.unbind('VillageVisited', this.show_victory);
  });
 
//Victory Scene------------------------------------
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
            y: Game.height()/2 - 24, 
            w: Game.width() })
    .css($text_css);
 
  // Load our sprite map image
  Crafty.load(['assets/spr1.gif'], function()
  {
    // Once the image is loaded...
 
    // Define the individual sprites in the image
    // Each one (spr_water, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
    
    Crafty.sprite(16, 'assets/spr1.gif', 
    {
      spr_water:    [18, 0],
      spr_tree:    [16,  0],
      spr_village: [14, 0],
      spr_player:  [20, 0],
      spr_grass:   [4,  0]
    });

 
    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  })
});