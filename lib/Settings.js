Stravi._settings = {
    "canvas": "gameCanvas", // The id of the canvas element that holds the map
    "width": 50,		    // Map width (tiles)
    "height": 50,		    // Map height (tiles)
    "scroll": 50,           // The amount of pixels that the map will scroll using up/down/left/right keys
    "tileRadius": 75,       // The radius of a single hexagon
    "terrain": {            // Different terrain types
        "plain": {
            "texture": "/img/grass.jpg",    // Tile image
            "fill": "green",                // Fill color (when not using the image)
            "percentage": 0,                // Percentage of the map filled with these tiles
            "minSize": 0,                   // Minimum amount of tiles in a group when generated
            "maxSize": 0                    // Maximum amount of tiles in a group when generated
        },
        "forest": {
            "texture": "/img/forest.jpg",
            "fill": "darkgreen",
            "percentage": 25,
            "minSize": 5,
            "maxSize": 10
        },

        "desert": {
            "texture": "/img/desert.jpg",
            "fill": "yellow",
            "percentage": 15,
            "minSize": 3,
            "maxSize": 7
        },
        
        "mountain": {
            "texture": "/img/mountain.jpg",
            "fill": "grey",
            "percentage": 5,
            "minSize": 1,
            "maxSize": 3
        },
        
        "sea": {
            "texture": "/img/sea.jpg",
            "fill": "lightblue",
            "percentage": 20,
            "minSize": 13,
            "maxSize": 20
        }
    },
    "resources": {          // Images to preload
        "images": [
            "/img/grass.jpg",
            "/img/forest.jpg",
            "/img/desert.jpg",
            "/img/mountain.jpg",
            "/img/sea.jpg"
        ]
    }
};