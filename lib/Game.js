Stravi.Game = function ()
{
	this.tileHeight = ((Stravi.Settings.tileRadius*2)*(3/4));
	this.tileWidth = ((Stravi.Settings.tileRadius*2)*Math.sqrt(3)/2);
	
	this.fieldHeight = Stravi.Settings.height * this.tileHeight;
	this.fieldWidth = Stravi.Settings.width * this.tileWidth;

	this.stage = new Kinetic.Stage({
		"container": "gameCanvas",
		"width": Stravi.Settings.canvasWidth,
		"height": Stravi.Settings.canvasHeight,
		"stroke": "red",
		"x": ((Stravi.Settings.canvasWidth-this.fieldWidth)/2),
		"y": ((Stravi.Settings.canvasHeight-this.fieldHeight)/2),
	});
	
	var overlapX = (this.fieldWidth - Stravi.Settings.canvasWidth)/2;
	var overlapY = (this.fieldHeight - Stravi.Settings.canvasHeight)/2;
	
	this.xMax = Stravi.Settings.canvasWidth + overlapX;
	this.yMax = Stravi.Settings.canvasHeight + overlapY;
	this.xMin = -overlapX;
	this.yMin = -overlapY;
	
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
		}
	}
	
	this.stage.add(this.layer);
	
	$(document).on('keyup', function(e) {
		switch (e.keyCode)
		{
			case 37:
				this.stage.setX(this.stage.getX()+Stravi.Settings.scroll);
			break;
			
			case 38:
				this.stage.setY(this.stage.getY()+Stravi.Settings.scroll);
			break;
			
			case 39:
				this.stage.setX(this.stage.getX()-Stravi.Settings.scroll);
			break;
			
			case 40:
				this.stage.setY(this.stage.getY()-Stravi.Settings.scroll);
			break;
		}
		this.stage.fire('dragend');
		this.stage.draw();
	}.bind(this));
	
	this.stage.on('dragend', function() {
		var stageX = this.stage.getX();
		var stageY = this.stage.getY();
	
		for (x in this.tiles)
		{
			for (y in this.tiles[x])
			{
				var tileX = this.tiles[x][y].geometry.getX();
				var tileY = this.tiles[x][y].geometry.getY();
				
				if (tileX+stageX > this.xMax)
				{
					this.tiles[x][y].geometry.setX(tileX-this.fieldWidth);
				} else if (tileX+stageX < this.xMin)
				{
					this.tiles[x][y].geometry.setX(tileX+this.fieldWidth);
				}
				
				if (tileY+stageY > this.yMax)
				{
					this.tiles[x][y].geometry.setY(tileY-this.fieldHeight);
				} else if (tileY+stageY < this.yMin)
				{
					this.tiles[x][y].geometry.setY(tileY+this.fieldHeight);
				}
				
				if (tileX+stageX > Stravi.Settings.canvasWidth+this.tileWidth || tileX+stageX < 0-this.tileWidth)
				{
					this.tiles[x][y].geometry.setVisible(false);
				}	else {
					this.tiles[x][y].geometry.setVisible(true);
				}
				
				if (tileY+stageY > Stravi.Settings.canvasHeight+this.tileHeight || tileY+stageY < 0-this.tileHeight)
				{
					this.tiles[x][y].geometry.setVisible(false);
				}	else	{
					this.tiles[x][y].geometry.setVisible(true);
				}
			}
		}
	
		this.stage.draw();
	}.bind(this));
	
	setTimeout(function() {this.stage.draw()}.bind(this), 1000);
	
}