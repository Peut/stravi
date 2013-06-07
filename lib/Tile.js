Stravi.Tile = function(x, y)
{
	this.x = x;
	this.y = y;
	
	this.geometry = new Kinetic.RegularPolygon({
		"sides": 6,
		"radius": 70,
        "fill": 'red',
        "stroke": 'black',
        "strokeWidth": 4
	});
	
	return this;
}

Stravi.Tile.prototype.getNeighbours = function()
{
	
}