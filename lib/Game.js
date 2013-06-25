Stravi.Game = function ()
{
    this.utils = new Stravi.Utils(this);
    this.controls = new Stravi.Controls(this);
    
    
    this.tileHeight = ((Stravi._settings.tileRadius*2)*(.75));
    this.tileWidth = ((Stravi._settings.tileRadius*2)*Math.sqrt(3)/2);
    
    this.fieldHeight = Stravi._settings.height * this.tileHeight;
    this.fieldWidth = Stravi._settings.width * this.tileWidth;
    
    var overlapX = (this.fieldWidth - Stravi._settings.canvasWidth)/2;
    var overlapY = (this.fieldHeight - Stravi._settings.canvasHeight)/2;
    
    this.xMax = Stravi._settings.canvasWidth + overlapX;
    this.yMax = Stravi._settings.canvasHeight + overlapY;
    this.xMin = -overlapX;
    this.yMin = -overlapY;
    
    
    
    
    this.stage = new Kinetic.Stage({
        "container": "gameCanvas",
        "width": Stravi._settings.canvasWidth,
        "height": Stravi._settings.canvasHeight,
        "x": ((Stravi._settings.canvasWidth-this.fieldWidth)/2),
        "y": ((Stravi._settings.canvasHeight-this.fieldHeight)/2),
    });

    this.layer = new Kinetic.Layer();
    this.stage.add(this.layer);
    
    this.stage.on('dragend', function() {
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

        this.stage.draw();
    }.bind(this));
    
    this.utils.preLoad();
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