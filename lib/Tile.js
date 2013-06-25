Stravi.Tile = function(x, y, game)
{
	this.game = game;
	this.x = x;
	this.y = y;
	this.tileRadius = Stravi.Settings.tileRadius;
	
	this.types = ['plains', 'forest', 'desert', 'mountain'];
	this.type = this.types[Math.floor((Math.random()*this.types.length))];
	
	this.drawX = (y%2==0) ? (x * ((this.tileRadius*2)*Math.sqrt(3)/2)) + (this.tileRadius*Math.sqrt(3)/2) : (x * ((this.tileRadius*2)*Math.sqrt(3)/2));
	this.drawY = y * ((this.tileRadius*2)*(3/4));
	
	this.geometry = new Kinetic.Group({
		x: this.drawX,
		y: this.drawY
	});
	
	var imageObj = new Image();
	imageObj.src = Stravi.Settings.terrain[this.type].texture;//'/img/grass.jpg';
	
	this.geometry.add(new Kinetic.RegularPolygon({
		sides: 6,
		radius: this.tileRadius,
        //fill: 'grey',
        stroke: 'black',
        strokeWidth: 1,
		fillPatternImage: imageObj,
		fillPatternOffset: {
			x: 100,
			y: 100
		},
		fillPatternScale: 0.5
	}));
	
	this.geometry.add(new Kinetic.Text({
		text: this.x + "," + this.y,
		fontSize: 14,
		fontFamily: 'Calibri',
		fill: 'white',
		offsetX: 10,
		offsetY: 10
	}));
	
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