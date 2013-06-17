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
        //Crafty.trigger('Turn');
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