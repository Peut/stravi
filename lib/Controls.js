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
        
        this.stage.fire('dragend');
        this.stage.draw();
    }.bind(this.game));
    
    $("#gameCanvas").on('mousedown', function(e) {
        this.mousePos = {x: e.clientX, y: e.clientY};
        
    }.bind(this));
    
    $(document).on('mouseup', function() {
        this.mousePos = false;
    }.bind(this));
    
    $(document).attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    
    $("#gameCanvas").on('mousemove', function(e) {
        if (this.mousePos !== false) {
            dX = this.mousePos.x - e.clientX;
            dY = this.mousePos.y - e.clientY;
            
            this.game.stage.setX(this.game.stage.getX()-dX);
            this.game.stage.setY(this.game.stage.getY()-dY);
            this.game.update();
            
            this.mousePos = {x: e.clientX, y: e.clientY};
        }
    }.bind(this));
}