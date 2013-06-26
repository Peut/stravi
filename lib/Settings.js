Stravi._settings = {
    "canvasWidth": 1000,
    "canvasHeight": 500,
    "width": 26,		// Map width (tiles)
    "height": 26,		// Map height (tiles)
    "scroll": 50,
    "tileRadius": 100,
    "terrain": {
        "plain": {
            "texture": "/img/grass.jpg",
            "percentage": 0,
            "minSize": 0,
            "maxSize": 0
        },

        "forest": {
            "texture": "/img/forest.jpg",
            "percentage": 25,
            "minSize": 5,
            "maxSize": 10
        },

        "desert": {
            "texture": "/img/desert.jpg",
            "percentage": 15,
            "minSize": 3,
            "maxSize": 7
        },
        
        "mountain": {
            "texture": "/img/mountain.jpg",
            "percentage": 5,
            "minSize": 1,
            "maxSize": 3
        }
    },
    "resources": {
        "images": [
            "/img/grass.jpg",
            "/img/forest.jpg",
            "/img/desert.jpg",
            "/img/mountain.jpg"
        ]
    }
};