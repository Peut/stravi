Stravi.Game = function ()
{
    this.utils = new Stravi.Utils(this);
    this.controls = new Stravi.Controls(this);
    //this.hud = new Stravi.Hud(this);
    
    // Calculations
    this.updateDimensions();
    
    this.stage = new Kinetic.Stage({
        "container": "gameCanvas",
        "width": this.canvasWidth,
        "height": this.canvasHeight,
        "x": ((this.canvasWidth-this.fieldWidth)/2),
        "y": ((this.canvasHeight-this.fieldHeight)/2),
    });
    
    this.layer = new Kinetic.Layer();
    this.stage.add(this.layer);
    
    // Preload images
    this.utils.preLoad();
    
    $(window).on('resize', function(e) {
        this.stage.setWidth($("#gameCanvas").width());
        this.stage.setHeight($("#gameCanvas").height());
        this.updateDimensions();
        this.update();
    }.bind(this));
}

Stravi.Game.prototype.start = function() {
    // Create tiles
    this.tiles = [];
    
    Meteor.subscribe('tiles', function() {
        tiles = tileCollection.find().forEach(function (tile){
            if (typeof this.tiles[tile.x] == 'undefined') this.tiles[tile.x] = [];
            this.tiles[tile.x][tile.y] = new Stravi.Tile(tile.x, tile.y, this, tile);
            this.layer.add(this.tiles[tile.x][tile.y].geometry);
        }.bind(this));
        
        this.stage.draw();
    }.bind(this));
    
    this.stage.draw();
}

Stravi.Game.prototype.updateVisibility = function() {
    var stageX = this.stage.getX();
    var stageY = this.stage.getY();

    for (x in this.tiles)
    {
        for (y in this.tiles[x])
        {
            // Get current tile position
            var tileX = this.tiles[x][y].geometry.getX();
            var tileY = this.tiles[x][y].geometry.getY();

            // Make tiles visible/invisible depending on their position
            if (tileX+stageX > Stravi._settings.canvasWidth+this.tileWidth || tileX+stageX < 0-this.tileWidth 
            || tileY+stageY > Stravi._settings.canvasHeight+this.tileHeight || tileY+stageY < 0-this.tileHeight)
            {
                this.tiles[x][y].geometry.setVisible(false);
            }	else {
                this.tiles[x][y].geometry.setVisible(true);
            }
        }
    }
}

Stravi.Game.prototype.updatePosition = function() {
    var stageX = this.stage.getX();
    var stageY = this.stage.getY();

    for (x in this.tiles)
    {
        for (y in this.tiles[x])
        {
            // Get current tile position
            var tileX = this.tiles[x][y].geometry.getX();
            var tileY = this.tiles[x][y].geometry.getY();

            // Move tiles left/right depending on their position
            if (tileX+stageX > this.xMax)
            {
                this.tiles[x][y].geometry.setX(tileX-this.fieldWidth);
            } else if (tileX+stageX < this.xMin)
            {
                this.tiles[x][y].geometry.setX(tileX+this.fieldWidth);
            }

            // Move tiles up/down depending on their position
            if (tileY+stageY > this.yMax)
            {
                this.tiles[x][y].geometry.setY(tileY-this.fieldHeight);
            } else if (tileY+stageY < this.yMin)
            {
                this.tiles[x][y].geometry.setY(tileY+this.fieldHeight);
            }
        }
    }
}

Stravi.Game.prototype.updateDimensions = function()
{
    this.canvasWidth = $("#gameCanvas").width();
    this.canvasHeight = $("#gameCanvas").height();

    this.tileHeight = ((Stravi._settings.tileRadius*2)*(.75));
    this.tileWidth = ((Stravi._settings.tileRadius*2)*Math.sqrt(3)/2);
    
    this.fieldHeight = Stravi._settings.height * this.tileHeight;
    this.fieldWidth = Stravi._settings.width * this.tileWidth;
    
    var overlapX = (this.fieldWidth - this.canvasWidth)/2;
    var overlapY = (this.fieldHeight - this.canvasHeight)/2;
    
    this.xMax = this.canvasWidth + overlapX;
    this.yMax = this.canvasHeight + overlapY;
    this.xMin = -overlapX;
    this.yMin = -overlapY;
}

Stravi.Game.prototype.zoom = function(factor)
{
    
    
    
}