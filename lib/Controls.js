Stravi.Controls = function (game)
{
    this.game = game;
    this.mousePos = false;
    
    $(document).on('keydown', function(e) {
        switch (e.keyCode)
        {
            case 37:
                this.stage.setX(this.stage.getX()+Stravi._settings.scroll);
            break;

            case 38:
                this.stage.setY(this.stage.getY()+Stravi._settings.scroll);
            break;

            case 39:
                this.stage.setX(this.stage.getX()-Stravi._settings.scroll);
            break;

            case 40:
                this.stage.setY(this.stage.getY()-Stravi._settings.scroll);
            break;
        }
        
        this.updateVisibility();
        this.updatePosition();
        this.stage.draw();
    }.bind(this.game));
    
    $("#gameCanvas").on('mousedown', function(e) {
        this.mousePos = {x: e.clientX, y: e.clientY};
    }.bind(this));
    
    $("#gameCanvas").on('touchstart', function(e) {
        this.mousePos = {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY};
    }.bind(this));
    
    $(document).on('mouseup touchend', function() {
        this.mousePos = false;
        this.game.updatePosition();
        this.game.updateVisibility();
        this.game.stage.draw();
    }.bind(this));
    
    $("#gameCanvas").on('mousemove', function(e) {
        if (this.mousePos !== false) {
            dX = this.mousePos.x - e.clientX;
            dY = this.mousePos.y - e.clientY;
            
            this.game.stage.setX(this.game.stage.getX()-dX);
            this.game.stage.setY(this.game.stage.getY()-dY);
            
            this.game.updateVisibility();
            this.game.stage.draw();
            
            this.mousePos = {x: e.clientX, y: e.clientY};
        }
    }.bind(this));
    
    $("#gameCanvas").on('touchmove', function(e) {
        if (this.mousePos !== false) {
            dX = this.mousePos.x - e.originalEvent.touches[0].pageX;
            dY = this.mousePos.y - e.originalEvent.touches[0].pageY;
            
            this.game.stage.setX(this.game.stage.getX()-dX);
            this.game.stage.setY(this.game.stage.getY()-dY);
            
            this.game.updateVisibility();
            this.game.stage.draw();
            
            this.mousePos = {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY};
        }
    }.bind(this));
    
    $(document).attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    
}