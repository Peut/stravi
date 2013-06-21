Stravi.Game = function ()
{
	this.stage = new Kinetic.Stage({
		"container": "gameCanvas",
		"width": 1000,
		"height": 500,
		"draggable": "draggable"
	});
	
	this.layer = new Kinetic.Layer();
	
	// Create tiles
	this.tiles = [];
	
	for (var x = 0; x < Stravi.Settings.width; x++)
	{
		for (var y = 0; y < Stravi.Settings.height; y++)
		{
			if (typeof this.tiles[x] == 'undefined') this.tiles[x] = [];
			this.tiles[x][y] = new Stravi.Tile(x, y, this);
		}
	}
	
	for (x in this.tiles)
	{
		for (y in this.tiles[x])
		{
			this.layer.add(this.tiles[x][y].geometry);
			this.layer.add(this.tiles[x][y].text);
		}
	}
	
	this.stage.add(this.layer);
}