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
        width: 36+10,
        height: 36,
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
        return (this.map_grid.width-10)
                * this.map_grid.tile.width;
    },

    // Initialize and start our game
    start: function() 
    {
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(0, 0, 0)');

        //Set this thing to be scene 'Game'
        //All scenes will be in scenes.js

        //Actually start by the Loading scene
        Crafty.scene('Loading');

        //Creating text boxes, Advices and stuff
        var box = document.createElement('input');
        box.style.position = 'absolute';
        box.style.left = '16px';
        box.style.top = '632px';

        //add those in order
        document.body.appendChild(msg_tut);
        document.body.appendChild(box);
    }
}

$text_css = { 'font-size': '24px', 
            'font-family': 'Monospace', 
            'color': 'white', 
            'text-align': 'center' }
