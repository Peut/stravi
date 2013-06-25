Stravi.Tile = function(x, y, game, tile)
{
    this.game = game;
    this.x = x;
    this.y = y;
    this.tileRadius = Stravi._settings.tileRadius;

    this.type = tile.type;
    
    this.drawX = (y%2==0) ? (x * ((this.tileRadius*2)*Math.sqrt(3)/2)) + (this.tileRadius*Math.sqrt(3)/2) : (x * ((this.tileRadius*2)*Math.sqrt(3)/2));
    this.drawY = y * ((this.tileRadius*2)*(3/4));

    this.geometry = new Kinetic.Group({
        x: this.drawX,
        y: this.drawY
    });

    var imageObj = new Image();
    imageObj.src = Stravi._settings.terrain[this.type].texture;

    this.geometry.add(
        new Kinetic.RegularPolygon({
            sides: 6,
            radius: this.tileRadius,
            fillPatternImage: imageObj,
            fillPatternOffset: {
                x: 100,
                y: 100
            }
        })
    );

    this.geometry.add(
        new Kinetic.Text({
            text: this.x + "," + this.y,
            fontSize: 14,
            fontFamily: 'Calibri',
            fill: 'white',
            offsetX: 10,
            offsetY: 10
        })
    );

    this.geometry.on('click', function() {
        var neighbours = this.getNeighbours();
        for (n in neighbours)
        {
            var tile = neighbours[n].geometry.get('RegularPolygon');
            console.log(tile[0]);
            tile[0].setFill('red');
        }
        this.game.layer.draw();
    }.bind(this));
    
    return this;
}

Stravi.Tile.prototype.getNeighbours = function()
{
    return {
        'nw': this.game.tiles[this.cx(this.y%2==0 ? this.x : this.x-1)][this.cy(this.y-1)],
        'w': this.game.tiles[this.cx(this.x-1)][this.y],
        'sw': this.game.tiles[this.cx(this.y%2==0 ? this.x : this.x-1)][this.cy(this.y+1)],
        'se': this.game.tiles[this.cx(this.y%2==0 ? this.x+1 : this.x)][this.cy(this.y+1)],
        'e': this.game.tiles[this.cx(this.x+1)][this.y],
        'ne': this.game.tiles[this.cx(this.y%2==0 ? this.x+1 : this.x)][this.cy(this.y-1)]
    }
}

    /*
    * Correct the x-coordinate to make the field horizontally continuous
    * @param int The x-coordinate to correct
    * @return int The corrected x-coordinate
    */
Stravi.Tile.prototype.cx = function(x)
{
    if (x < 0) {								// outside the left bounds
        return Stravi._settings.width - 1;
    } else if (x >= Stravi._settings.width) {	// outside the right bounds
        return 0;
    }
    return x;
}

    /*
    * Correct the y-coordinate to make the field vertically continuous
    * @param int The y-coordinate to correct
    * @return int The corrected y-coordinate
    */
Stravi.Tile.prototype.cy = function(y)
{
    if (y < 0) {
        return Stravi._settings.height - 1;
    } else if (y >= Stravi._settings.height) {
        return 0;
    }
    return y;
}