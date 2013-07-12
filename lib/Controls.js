Stravi.Controls = function (game)
{
    var game = game;
    var mousePos = false;
    
    $(document).on('keydown', function(e) {
        switch (e.keyCode)
        {
            case 37:
                game.stage.setX(this.stage.getX()+Stravi._settings.scroll);
            break;

            case 38:
                game.stage.setY(this.stage.getY()+Stravi._settings.scroll);
            break;

            case 39:
                game.stage.setX(this.stage.getX()-Stravi._settings.scroll);
            break;

            case 40:
                game.stage.setY(this.stage.getY()-Stravi._settings.scroll);
            break;
        }
        
        game.updateVisibility();
        game.updatePosition();
        game.stage.draw();
    });
    
    $("#gameCanvas").on('mousedown', function(e) {
        mousePos = {x: e.clientX, y: e.clientY};
    });
    
    $("#gameCanvas").on('touchstart', function(e) {
        mousePos = {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY};
    });
    
    $(document).on('mouseup touchend', function() {
        mousePos = false;
        game.updatePosition();
        game.updateVisibility();
        game.stage.draw();
    });
    
    $("#gameCanvas").on('mousemove', function(e) {
        if (mousePos !== false) {
            dX = mousePos.x - e.clientX;
            dY = mousePos.y - e.clientY;
            
            game.stage.setX(game.stage.getX()-dX);
            game.stage.setY(game.stage.getY()-dY);
            
            game.updateVisibility();
            game.stage.draw();
            
            mousePos = {x: e.clientX, y: e.clientY};
        }
    }.bind(this));
    
    $("#gameCanvas").on('touchmove', function(e) {
        if (mousePos !== false) {
            dX = mousePos.x - e.originalEvent.touches[0].pageX;
            dY = mousePos.y - e.originalEvent.touches[0].pageY;
            
            game.stage.setX(game.stage.getX()-dX);
            game.stage.setY(game.stage.getY()-dY);
            
            game.updateVisibility();
            game.stage.draw();

            mousePos = {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY};
        }
    }.bind(this));
    
    $(document).attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    
}