/**
 * @constructor
 */

Stravi.Game = function () {
    // Public
    this.utils = new Stravi.Utils(this);


    // Private
    var map = new Stravi.Map(this);
    var controls = new Stravi.Controls(map);
    var hud = new Stravi.Hud(this);
    var tiles = [];
    var game = this;
    var resizeTimer;

    this.start = function() {
        this.utils.preLoad(function() {
            map.init();
            controls.init();

            Meteor.subscribe('tiles', function() {
                tileCollection.find().forEach(function (tile){
                    if (typeof tiles[tile.x] == 'undefined') tiles[tile.x] = [];
                    tiles[tile.x][tile.y] = new Stravi.Tile(tile.x, tile.y, game, tile);
                    map.addTile(tiles[tile.x][tile.y].geometry);
                });
                map.draw();
            });
        });
    };

    $(window).on('resize', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() { map.resize() }, 500);
    });
};