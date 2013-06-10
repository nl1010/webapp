Game = 
{
    //menu, resource bar
    menu: 
    {
        width: 18
    },
    //Grids
    map_grid:
    {
        width: 56+18,
        height: 56,
        //tile size
        tile:
        {
            width: 16,
            height: 16,
        }
    },

    //Total width of game screen,
    //calc by pixels
    width: function()
    {
        return this.map_grid.width
                * this.map_grid.tile.width;
    },

    //same as above
    height: function()
    {
        return this.map_grid.height
                * this.map_grid.tile.height;
    },

    menu_width: function()
    {
        return (this.map_grid.width-18)
                * this.map_grid.tile.width;
    },

    // Initialize and start our game
    start: function() 
    {
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(0, 0, 255)');

        //Set this thing to be scene 'Game'
        //All scenes will be in scenes.js

        //Actually start by the Loading scene
        Crafty.scene('Loading');
    }
}

$text_css = { 'font-size': '24px', 
            'font-family': 'Arial', 
            'color': 'white', 
            'text-align': 'center' }
