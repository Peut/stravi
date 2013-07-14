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
        $(document).on('keydown', function(e) {
            switch (e.keyCode)
            {
                case 37:
                    map.setX(map.getX()+Stravi._settings.scroll);
                break;

                case 38:
                    map.setY(map.getY()+Stravi._settings.scroll);
                break;

                case 39:
                    map.setX(map.getX()-Stravi._settings.scroll);
                break;

                case 40:
                    map.setY(map.getY()-Stravi._settings.scroll);
                break;
            }

            map.draw();
        });

        map.jCanvas.on('mousedown', function(e) {
            mousePos = {x: e.clientX, y: e.clientY};
        });

        /*
        $("#mapCanvas").on('touchstart', function(e) {
            mousePos = {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY};
        });
        */
        $(document).on('mouseup touchend', function() {
            mousePos = false;
            map.draw();
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

        /*
        $("#mapCanvas").on('touchmove', function(e) {
            if (mousePos !== false) {
                var dX = mousePos.x - e.originalEvent.touches[0].pageX;
                var dY = mousePos.y - e.originalEvent.touches[0].pageY;

                map.setX(map.getX()-dX);
                map.setY(map.getY()-dY);

                map.draw();

                mousePos = {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY};
            }
        }.bind(this));
        */
    };

    $(document).attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    
}