/**
 * Map Object
 * @param game Stravi.Game
 * @constructor
 */

Stravi.Map = function(game) {
    // Private
    var canvasWidth, canvasHeight;
    var xMax,yMax,xMin,yMin;
    var stage, tileLayer;

    var tileWidth = ((Stravi._settings.tileRadius*2)*Math.sqrt(3)/2);
    var tileHeight = ((Stravi._settings.tileRadius*2)*(.75));

    var mapHeight = Stravi._settings.height * tileHeight;
    var mapWidth = Stravi._settings.width * tileWidth;

    this.jCanvas;

    this.init = function() {
        // Create jQuery reference to the canvas
        this.jCanvas = $("#"+Stravi._settings.canvas);

        // Calculate the map dimensions
        this.updateDimensions();

        // Create the stage
        stage = new Kinetic.Stage({
            "container":    Stravi._settings.canvas,
            "width":        canvasWidth,
            "height":       canvasHeight,
            "x":            ((canvasWidth-mapWidth)/2),
            "y":            ((canvasHeight-mapHeight)/2),
        });

        // Add tile layer
        tileLayer = new Kinetic.Layer();
        stage.add(tileLayer);
    }

    /**
     * Add a tile to the map
     * @param tile Kinetic.Geometry
     */
    this.addTile = function(tile) {
        tileLayer.add(tile);
    }

    /**
     * Update the map width, height and overlap variables
     */
    this.updateDimensions = function()
    {
        // Update the canvas width/height
        canvasWidth = this.jCanvas.width();
        canvasHeight = this.jCanvas.height();

        // Update the overlap parameters for visibility
        xMax = canvasWidth + ((mapWidth - canvasWidth)/2);
        yMax = canvasHeight + ((mapHeight - canvasHeight)/2);
        xMin = -((mapWidth - canvasWidth)/2);
        yMin = -((mapHeight - canvasHeight)/2);
    }

    this.updateTilePosition = function() {
        var stageX = stage.getX();
        var stageY = stage.getY();

        for (x in game.tiles)
        {
            for (y in game.tiles[x])
            {
                // Get current tile position
                var tileX = game.tiles[x][y].geometry.getX();
                var tileY = game.tiles[x][y].geometry.getY();

                // Move tiles left/right depending on their position
                if (tileX + stageX > xMax)
                {
                    game.tiles[x][y].geometry.setX(tileX - mapWidth);
                } else if (tileX + stageX < xMin)
                {
                    game.tiles[x][y].geometry.setX(tileX + mapWidth);
                }

                // Move tiles up/down depending on their position
                if (tileY + stageY > yMax)
                {
                    game.tiles[x][y].geometry.setY(tileY - mapHeight);
                } else if (tileY + stageY < yMin)
                {
                    game.tiles[x][y].geometry.setY(tileY + mapHeight);
                }
            }
        }
    }

    this.updateTileVisibility = function() {
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
    };

    this.resize = function() {
        stage.setWidth(this.jCanvas.width());
        stage.setHeight(this.jCanvas.height());

        this.updateDimensions();
    }

    /* Draw the entire stage */
    this.draw = function() {
        stage.draw();
    }

    /**
     * Set the X position of the map
     * @param x
     */
    this.setX = function(x) {
        stage.setX(x);
    }

    /**
     * Get the X position of the map
     * @returns float
     */
    this.getX = function() {
        return stage.getX();
    }

    /**
     * Set the Y position of the map
     * @param y
     */
    this.setY = function(y) {
        stage.setY(y);
    }

    /**
     * Get the Y position of the map
     * @returns float
     */
    this.getY = function() {
        return stage.getY();
    }

};