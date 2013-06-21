Stravi.Tile = function(x, y, game)
{
	this.game = game;
	this.x = x;
	this.y = y;
	this.tileRadius = 50;
	
	this.drawX = (y%2==0) ? (x * ((this.tileRadius*2)*Math.sqrt(3)/2)) + (this.tileRadius*Math.sqrt(3)/2) : (x * ((this.tileRadius*2)*Math.sqrt(3)/2));
	this.drawY = y * ((this.tileRadius*2)*(3/4));
	
	this.geometry = new Kinetic.RegularPolygon({
		x: this.drawX,
		y: this.drawY,
		sides: 6,
		radius: this.tileRadius,
        fill: 'grey',
        stroke: 'black',
        strokeWidth: 1
	});
	
	/*this.geometry.on('click', (function() {
		var neighbours = this.getNeighbours();
		for (dir in neighbours)
		{
			neighbours[dir].geometry.setFill('red');
		}
		
		this.geometry.getLayer().draw();
		
	}).bind(this));
	*/
	this.text = new Kinetic.Text({
		x: this.drawX-(this.tileRadius/4),
		y: this.drawY-(this.tileRadius/4),
		text: this.x + "," + this.y,
		fontSize: 20,
		fontFamily: 'Calibri',
		fill: 'black'
	});
	
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

Stravi.Tile.prototype.cx = function(x)
{
	if (x < 0)
	{
		return Stravi.Settings.width - 1;
	} else if (x >= Stravi.Settings.width)
	{
		return 0;
	}
	return x;
}

Stravi.Tile.prototype.cy = function(y)
{
	if (y < 0)
	{
		return Stravi.Settings.height - 1;
	} else if (y >= Stravi.Settings.height)
	{
		return 0;
	}
	return y;
}