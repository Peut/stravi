Stravi.Game = function ()
{
	this.stage = new Kinetic.Stage({
		container: "canvas",
		width: 800,
		height: 600
	});
	
	var layer = new Kinetic.Layer();
	
	// Create tiles
	this.tiles = [];
	
	for (var x = 0; x < Stravi.Settings.width; x++)
	{
		for (var y = 0; y < Stravi.Settings.height; y++)
		{
			this.tiles.push(new Stravi.Tile(x, y));
		}
	}
	
	for (tile in tiles)
	{
		layer.add(tiles[tile].geometry);
	}
	
}