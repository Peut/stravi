Stravi.Controls = function (game)
{
    this.game = game;
    
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
}