/**
 *
 * @param x
 * @param y
 * @param game
 * @param tile
 * @constructor
 */

Stravi.Tile = function(x, y, game, tile)
{
    var game = game;
    var x = x;
    var y = y;
    var tile = tile;

    
    this.drawX = Math.ceil((y%2==0) ? (x * ((Stravi._settings.tileRadius*2)*Math.sqrt(3)/2)) + (Stravi._settings.tileRadius*Math.sqrt(3)/2) : (x * ((Stravi._settings.tileRadius*2)*Math.sqrt(3)/2)));
    this.drawY = Math.ceil(y * ((Stravi._settings.tileRadius*2)*(3/4)));

    this.geometry = new Kinetic.Group({
        x: this.drawX,
        y: this.drawY
    });
    
    this.geometry.add(
        new Kinetic.Image({
            image: game.utils.tiles[tile.type],
            offset: 100
        })
    );

    this.geometry.setAttr('Tile', this);
    this.geometry.setAttr('Doc', tile);

    this.geometry.on('click', function() {
        console.log(this);
    });


    this.getNeighbours = function() {
        return {
            'nw': this.game.tiles[game.utils.cx(y%2==0 ? x : x-1)][game.utils.cy(y-1)],
            'w': this.game.tiles[game.utils.cx(x-1)][y],
            'sw': this.game.tiles[game.utils.cx(y%2==0 ? x : x-1)][game.utils.cy(y+1)],
            'se': this.game.tiles[game.utils.cx(y%2==0 ? x+1 : x)][game.utils.cy(y+1)],
            'e': this.game.tiles[game.utils.cx(x+1)][y],
            'ne': this.game.tiles[game.utils.cx(y%2==0 ? x+1 : x)][game.utils.cy(y-1)]
        }
    }
}




