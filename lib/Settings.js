Stravi._settings = {
    "canvasWidth": 1000,
    "canvasHeight": 500,
    "width": 26,		// Map width (tiles)
    "height": 26,		// Map height (tiles)
    "scroll": 50,
    "tileRadius": 70,
    "terrain": {
        "plain": {
            "texture": "/img/grass.jpg",
            "percentage": 0,
            "maxSize": 0
        },

        "forest": {
            "texture": "/img/forest.jpg",
            "percentage": 25,
            "maxSize": 7
        },

        "desert": {
            "texture": "/img/desert.jpg",
            "percentage": 15,
            "maxSize": 5
        },
        
        "mountain": {
            "texture": "/img/mountain.jpg",
            "percentage": 5,
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