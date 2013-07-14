/**
 *
 * @param map
 * @constructor
 */

Stravi.Controls = function (map)
{
    var map = map;
    var mousePos = false;

    this.init = function() {
        keyControls();
        mouseControls();
        touchControls();
    };

    /**
     * Initialize key controls
     */
    var keyControls = function() {
        $(document).on('keydown', function(e) {
            switch (e.keyCode)
            {
                case (37 || 65):    // left/a
                    map.setX(map.getX()+Stravi._settings.scroll);
                    break;

                case (38 || 87):    // up/w
                    map.setY(map.getY()+Stravi._settings.scroll);
                    break;

                case (39 || 68):    // right/d
                    map.setX(map.getX()-Stravi._settings.scroll);
                    break;

                case (40 || 83):    // down/s
                    map.setY(map.getY()-Stravi._settings.scroll);
                    break;
            }

            map.draw();
        });
    };

    /**
     * Initialize mouse controls
     */
    var mouseControls = function() {

        map.jCanvas.on('mousedown', function(e) {
            mousePos = {x: e.clientX, y: e.clientY};
        });

        map.jCanvas.on('mousemove', function(e) {
            if (mousePos !== false) {
                var dX = mousePos.x - e.clientX;
                var dY = mousePos.y - e.clientY;

                map.setX(map.getX()-dX);
                map.setY(map.getY()-dY);

                map.draw();

                mousePos = {x: e.clientX, y: e.clientY};
            }
        });

        $(document).on('mouseup', function() {
            mousePos = false;
            map.draw();
        });

    }

    /**
     * Initialize touch controls
     */
    var touchControls = function() {
        map.jCanvas.on('touchstart', function(e) {
            mousePos = {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY};
        });

        map.jCanvas.on('touchmove', function(e) {
            if (mousePos !== false) {
                var dX = mousePos.x - e.originalEvent.touches[0].pageX;
                var dY = mousePos.y - e.originalEvent.touches[0].pageY;

                map.setX(map.getX()-dX);
                map.setY(map.getY()-dY);

                map.draw();

                mousePos = {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY};
            }
        });

        $(document).on('touchend', function() {
            mousePos = false;
            map.draw();
        });
    }

    /**
     * Make unselectable
     */
    $(document).attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    
}