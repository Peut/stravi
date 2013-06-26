Stravi.Utils = function(game) {
    this.game = game;
}
Stravi.Utils.prototype.resourceCounter = 0;
Stravi.Utils.prototype.preLoad = function() {
    this.resourceCounter = Stravi._settings.resources.images.length;
    
    for (i in Stravi._settings.resources.images)
    {
        var img = new Image();
        img.src = Stravi._settings.resources.images[i];
        img.onload = this.loaded.bind(this);
    }
    
    
    
    
}

Stravi.Utils.prototype.loaded = function() {
    this.resourceCounter--;
    if (this.resourceCounter == 0) 
    {
        this.game.start();
    }
}

Stravi.Utils.prototype.install = function() {
    
    // Create tile collection
    for (var x = 0; x < Stravi._settings.width; x++)
    {
        for (var y = 0; y < Stravi._settings.height; y++)
        {
            tileCollection.insert({
                x: x,
                y: y,
                type: 'plain'
            }, function (e) {
            });
        }
    }
}

Stravi.Utils.prototype.terrainGenerator = function() {
    // Reset everything to plain
    tileCollection.find().forEach(function(tile) {
        tileCollection.update({'_id': tile._id}, {$set: {'type': 'plain'}}, function(e) { console.log('cleared tile') });
    });
    
    // Calculate total amount of tiles
    total = Stravi._settings.width * Stravi._settings.height;
    
    for (type in Stravi._settings.terrain)
    {
        terrain = Stravi._settings.terrain[type];
        if (terrain.percentage > 0)
        {
            terrainTiles = Math.floor((total/100)*terrain.percentage);
            while (terrainTiles > 0)
            {
                if (terrainTiles < terrain.maxSize)
                {
                    size = terrainTiles;
                }   else    {
                    size = Math.ceil(Math.random()*(terrain.maxSize-terrain.minSize))+terrain.minSize;
                }
                
                console.log (type + ': ' + size);
                
                // Get center tile
                var rX = Math.floor(Math.random() * Stravi._settings.width);
                var rY = Math.floor(Math.random() * Stravi._settings.height);
                var generated = 0;
                
                tile = tileCollection.find({x: rX, y: rY}).fetch();
                tileCollection.update({'_id': tile[0]._id}, {$set: {'type': type}});
                generated++;
                
                while (generated < size)
                {
                    nb = this.getNeighbours(rX, rY);
                    dir = Math.floor(Math.random() * nb.length); // use random direction
                    rX = nb[dir].x;
                    rY = nb[dir].y;
                    
                    while (generated < size && nb.length > 0)
                    {
                        neighbour = nb.shift();
                        tile = tileCollection.find({x: neighbour.x, y: neighbour.y}).fetch();
                        tileCollection.update({'_id': tile[0]._id}, {$set: {'type': type}});
                        generated++;
                    }
                }
                
                terrainTiles -= size;
            }
        }
    }   
}

Stravi.Utils.prototype.getNeighbours = function(x, y)
{
    return [{   x: this.cx(y%2==0 ? x : x-1),
                y: this.cy(y-1)
            },
            {   x:this.cx(x-1),
                y: y
            },
            {   x: this.cx(y%2==0 ? x : x-1),
                y: this.cy(y+1)
            },
            {   x: this.cx(y%2==0 ? x+1 : x),
                y: this.cy(y+1)
            },
            {   x: this.cx(x+1),
                y: y
            },
            {   x: this.cx(y%2==0 ? x+1 : x),
                y: this.cy(y-1)
            }];
}

    /*
    * Correct the x-coordinate to make the field horizontally continuous
    * @param int The x-coordinate to correct
    * @return int The corrected x-coordinate
    */
Stravi.Utils.prototype.cx = function(x)
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
Stravi.Utils.prototype.cy = function(y)
{
    if (y < 0) {
        return Stravi._settings.height - 1;
    } else if (y >= Stravi._settings.height) {
        return 0;
    }
    return y;
}
