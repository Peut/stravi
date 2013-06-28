Stravi._settings = {
    "width": 50,		// Map width (tiles)
    "height": 50,		// Map height (tiles)
    "scroll": 50,
    "tileRadius": 75,
    "terrain": {
        "plain": {
            "texture": "/img/grass.jpg",
            "fill": "green",
            "percentage": 0,
            "minSize": 0,
            "maxSize": 0
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
    "resources": {
        "images": [
            "/img/grass.jpg",
            "/img/forest.jpg",
            "/img/desert.jpg",
            "/img/mountain.jpg",
            "/img/sea.jpg"
        ]
    }
};