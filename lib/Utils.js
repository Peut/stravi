Stravi.Utils = function(game) {
    this.game = game;

    this.resourceCounter = 0;
    this.tileCounter = 0;
    this.tiles = [];

    this.preLoad = function() {
        // Start by preloading images
        this.resourceCounter = Stravi._settings.resources.images.length;

        for (i in Stravi._settings.resources.images)
        {
            var img = new Image();
            img.src = Stravi._settings.resources.images[i];
            img.onload = this.imageLoaded.bind(this);
        }
    };

    this.imageLoaded = function() {
        this.resourceCounter--;
        if (this.resourceCounter == 0)
        {
            this.preloadTiles();
        }
    };

    this.preloadTiles = function() {
        this.tileCounter = 5;//Stravi._settings.terrain.length;

        for (type in Stravi._settings.terrain)
        {
            var imageObj = new Image();
            imageObj.src = Stravi._settings.terrain[type].texture;

            var preloadTile = new Kinetic.RegularPolygon({
                sides: 6,
                x: 100,
                y: 100,
                radius: Stravi._settings.tileRadius+0.6,
                fillPatternImage: imageObj,
                fillPatternOffset: {
                    x: Stravi._settings.tileRadius,
                    y: Stravi._settings.tileRadius
                },
            })

            preloadTile.toImage({
                width: 300,
                height: 300,
                callback: function(type, img) {
                    this.tileLoaded(type, img);
                }.bind(this, type)
            });
        }
    }
    this.tileLoaded = function(type, img)
    {
        this.tiles[type] = img;

        this.tileCounter--;
        if (this.tileCounter == 0)
        {
            this.game.start();
        }
    }

    this.getNeighbours = function(x, y) {
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
    this.cx = function(x)
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
    this.cy = function(y)
    {
        if (y < 0) {
            return Stravi._settings.height - 1;
        } else if (y >= Stravi._settings.height) {
            return 0;
        }
        return y;
    }

    if (Meteor.isServer)
    {
        this.install = function() {
            // Create tile collection
            for (var x = 0; x < Stravi._settings.width; x++)
            {
                for (var y = 0; y < Stravi._settings.height; y++)
                {
                    tileCollection.insert({
                        x: x,
                        y: y,
                        type: 'plain'
                    });
                }
            }

            console.log('finished inserting tiles');
        }

        this.terrainGenerator = function() {
            // Reset everything to plain
            tileCollection.update({}, {$set: {'type': 'plain'}},{multi: true},function(e) { console.log('reset tiles to plain') });

            // Calculate total amount of tiles
            total = Stravi._settings.width * Stravi._settings.height;

            for (type in Stravi._settings.terrain)
            {
                terrain = Stravi._settings.terrain[type];
                if (terrain.percentage > 0)
                {
                    terrainTiles = Math.floor((total/100)*terrain.percentage);
                    terrainLocations = [];
                    while (terrainTiles > 0)
                    {
                        if (terrainTiles < terrain.maxSize)
                        {
                            size = terrainTiles;
                        }   else    {
                            size = Math.ceil(Math.random()*(terrain.maxSize-terrain.minSize))+terrain.minSize;
                        }

                        // Get center tile
                        var rX = Math.floor(Math.random() * Stravi._settings.width);
                        var rY = Math.floor(Math.random() * Stravi._settings.height);
                        var generated = 0;

                        //tile = tileCollection.find({x: rX, y: rY}).fetch()[0];
                        terrainLocations.push({$and: { 'x': rX, 'y': rY } });
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
                                //tile = tileCollection.find({x: neighbour.x, y: neighbour.y}).fetch()[0];
                                terrainLocations.push({$and: {'x': neighbour.x, 'y': neighbour.y}});
                                generated++;
                            }
                        }

                        terrainTiles -= size;
                    }
                    console.log({$or: terrainLocations});
                    tileCollection.update({$or: terrainLocations}, {$set: {'type': type}}, function(e) { console.log(type + ' terrain generated', e); });
                }
            }

            console.log('terrain generation complete')
        }

        this.clear = function() {
            tileCollection.remove({});
            console.log('cleared all tiles');
        }
    }
}



