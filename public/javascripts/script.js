$(document).ready(function() {

    /*
    * init canvas
    */
    canvas = new fabric.Canvas('canvas');

    var audio = new Audio('/jc.mp3');
    audio.loop = true;
    audio.play();
    audio.volume = .3;
    fabric.Image.fromURL('/images/bby1.jpg', function(oImg) {

        oImg.selectable = false;
        oImg.id = "bby";
        bb1 = oImg;
        canvas.add(oImg);
        oImg.center();
        fabric.Image.fromURL('/images/shades.png', function(oImg1) {
            oImg1.id = "shades";
            oImg1.selectable = false;
            oImg1.scaleX = .5;
            oImg1.scaleY = .5;
            canvas.add(oImg1);
            oImg1.center();
            oImg1.bringToFront();
            oImg1.drawBorders();
        });
    });
    /*
    * 37 left
    * 38 up
    * 39 down
    * 40 right
    */
    var play = false;
    $(document).keydown(function(e){
        if (play) {
            var keyStroke = e.which || e.keycode;
            keyStrokeFuck(keyStroke);
            if (checkPerimeter()) {
                audio.pause();
                setTimeout(function() {
                    var thug = new Audio('/snoop.mp3');
                    thug.loop = true;
                    thug.play();
                    play = false;
                    endGame();
                }, 500);
            }
            canvas.renderAll();
        }
    });

    $('.play').on('click', function(){
        $('.modal').fadeOut(200, function(){
            play = true;
        })
    });

    function getRandomMovementSpeed(){
        return Math.floor((Math.random() * 80) + 20);
    }

    function keyStrokeFuck(keyCode){
        if (keyCode >= 37 && keyCode <= 40) {
            var item = canvas.getObjects().filter(function(obj){
                return obj.id === 'shades';
            })[0];
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
        }
    }

    function checkPerimeter(){
        var pointX= 226;
        var pointY= 144;

        var item = canvas.getObjects().filter(function(obj){
            return obj.id === 'shades'; })[0];
        var item1 = canvas.getObjects().filter(function(obj){
            return obj.id === 'bby'; })[0];

        var ileft = item.getCenterPoint().x;
        var itop = item.getCenterPoint().y;
        console.log(ileft, itop, item1.getCenterPoint());
        if ((ileft < 270 && ileft > 260) && (itop < 261 && itop > 250))
            return true;
        else
            return false;
    }

    function endGame() {
        var topText = ['T', 'H', 'U', 'G'];
        var bottomText = ['L', 'I', 'F', 'E'];

        var startTop = 120;

        for (char in topText) {
            var text = new fabric.Text(topText[char], {
              fontFamily: 'Impact',
              fontStyle: 'bold',
              stroke: '#000',
              strokeWidth: 3,
              fill: '#fff',
              left: startTop,
              fontSize: 72,
              selectable: false,
            });
            canvas.add(text);
            startTop = startTop + 100;
        }

        startTop = 120;

        for (char in bottomText) {
            var text = new fabric.Text(bottomText[char], {
              fontFamily: 'Impact',
              fontStyle: 'bold',
              stroke: '#000',
              strokeWidth: 3,
              fill: '#fff',
              left: startTop,
              top: 510,
              fontSize: 72,
              selectable: false,
            });
            canvas.add(text);
            startTop = startTop + 100;
        }

        fabric.Image.fromURL('/images/joint.png', function(oImg1) {
            oImg1.selectable = false;
            oImg1.scaleX = .3;
            oImg1.scaleY = .3;
            oImg1.top = 0;
            oImg1.left = 198;
            canvas.add(oImg1);

            var ani = setInterval(animate, 10);
            function animate() {
                oImg1.top+=1;
                canvas.renderAll();
                if (oImg1.top > 295) {
                    clearInterval(ani)
                }
            };
        });

    }
});
