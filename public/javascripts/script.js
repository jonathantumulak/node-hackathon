$(document).ready(function() {

    /*
    * init canvas
    */
    canvas = new fabric.Canvas('canvas');
    bb1 = null;
    fabric.Image.fromURL('/images/bby1.jpg', function(oImg) {

        oImg.selectable = false;
        bb1 = oImg;
        canvas.add(oImg);
    });
    fabric.Image.fromURL('/images/shades.png', function(oImg) {
        oImg.selectable = false;
        oImg.scaleX = .5;
        oImg.scaleY = .5;
        canvas.add(oImg);
    });
    /*
    * 37 left
    * 38 up
    * 39 down
    * 40 right
    */
    $(document).keydown(function(e){
        var keyStroke = e.which || e.keycode;

        keyStrokeFuck(keyStroke)
        canvas.renderAll();
    })

    function getRandomMovementSpeed(){
        return Math.floor((Math.random() * 50) + 1);
    }

    function keyStrokeFuck(keyCode){
        if (keyCode >= 37 && keyCode <= 40) {
            var item = canvas.item(1);
            var ileft = item.getLeft();
            var itop = item.getTop();
            if (keyCode === 37) {
                item.set({
                    left: ileft-getRandomMovementSpeed(),
                });
            } else if (keyCode === 38) {
                item.set({
                    top: itop-getRandomMovementSpeed(),
                });
            } else if (keyCode === 39) {
                item.set({
                    left: ileft+getRandomMovementSpeed(),
                });
            } else {
                item.set({
                    top: itop+getRandomMovementSpeed(),
                });
            }
        } else {
            return null;
        }
    }
});
