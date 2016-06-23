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
        oImg.center();
        fabric.Image.fromURL('/images/shades.png', function(oImg1) {
            oImg1.selectable = false;
            oImg1.scaleX = .5;
            oImg1.scaleY = .5;
            canvas.add(oImg1);
            oImg1.center();
            oImg1.bringToFront();
        });
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
        return Math.floor((Math.random() * 50) + 20);
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
