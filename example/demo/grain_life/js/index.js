define(function (require, exports, module) {
    var Util = require('./mod/Util');
    var World = require('./mod/World');
    var ImgLoader = require('./mod/ImgLoad.js');
    var launcher;  
    var arrPreLoadImg = ['./img/night.jpg', './img/lizi.png'];
    ImgLoader(arrPreLoadImg, function (o) { 
        if (o == 1) {
            sourcesLoaded();
        }
    }); 

    function sourcesLoaded() {
        var imgBackground = new Image();
        var imgLizi       = new Image();
        imgBackground.src = './img/night.jpg';
        imgLizi.src = './img/lizi2.png';

        var canvas = document.getElementById('stage'); 
        var media = new Audio("./img/mp3/voice.mp3"); 
        var bgMedia = $("#bg-music"); 
        //  bgMedia.trigger('pause'); 
        canvas.width  =  $('.grain').css('width').replace('px','');
        canvas.height =  $('.grain').css('height').replace('px','');  
        var launcher; 

        var world = new World({
            backgroundImage: imgBackground,
            canvas: canvas,
            minWind: -1,
            maxWind: 1,
            minHeat: 0.91,
            maxHeat: 0.01,
            gravity: 1
        });    
         
        //闪烁的星空
        world.createLauncher({
            id: Util.randomString("", 8),
            world: world,
            grainImage: imgLizi,
            x: 220,
            y: 300,
            rangeX: 440,
            rangeY: 600,
            sizeX: 4,
            sizeY: 4,
            sizeRange: 0,
            initGrainVx: 0,
            initGrainVy: 0,
            initGrainVxRange: 0,
            initGrainVyRange: 0,
            grainInfluencedByLauncherWind: false,
            grainInfluencedByLauncherHeat: false,
            grainInfluencedByWorldWind: false,
            grainInfluencedByWorlHeat: false,
            grainInfluencedByWorldGravity: false,
            maxAliveCount: 100,
            maxHeat: 0,
            minHeat: 0,
            maxWind: 0,
            minWind: 0,
            grainLife: 2,
            grainLifeRange: 0.1
        });

        var cw = parseInt(getComputedStyle(canvas).width);
        var scaleRate = cw/canvas.width;
        if('touchstart' in window) scaleRate = 1;
        function getMousePos(canvas, evt) {
            return {
                x: (evt.changedTouches[0].pageX)/scaleRate,
                y: (evt.changedTouches[0].pageY)/scaleRate
            };
        } 

        canvas.addEventListener('touchstart', function (e) {
            //播放声音   
            media.play();
            /*
            var ctx = canvas.getContext("2d"); 
            ctx.fillStyle = "#ffffff"; 
            ctx.fillText('CodePlayer+中文测试', 300,300);   
            */ 
            e.preventDefault();
            var mousePos = getMousePos(canvas,e);
            if(!launcher){
                var config = {
                    id:Util.randomString("", 8),
                    world:world,
                    grainImage: imgLizi,
                    "rangeX": 0,
                    "rangeY": 0,
                    "x": 748,
                    "y": 423,
                    "sizeX": 64,
                    "sizeY": 64,
                    "sizeRange": 0,
                    "initGrainVx": 0,
                    "initGrainVy": 0,
                    "initGrainVxRange": 4,
                    "initGrainVyRange": 4,
                    "grainInfluencedByLauncherWind": true,
                    "grainInfluencedByLauncherHeat": true,
                    "grainInfluencedByWorldWind": false,
                    "grainInfluencedByWorldHeat": false,
                    "grainInfluencedByWorldGravity": false,
                    "maxHeat": -0.15,
                    "minHeat": -0.1,
                    "maxWind": -0.15,
                    "minWind": -0.1,
                    "maxAliveCount": 100,
                    "grainLife": 2.5,
                    "grainLifeRange": 1.5
                };
                launcher = world.createLauncher(config);
            }else{
                launcher.status = 1;
                launcher.x = mousePos.x;
                launcher.y = mousePos.y;
            }
        }, false);

        canvas.addEventListener('touchmove', function (e) {
            e.preventDefault();
            if(launcher){
                var mousePos = getMousePos(canvas,e);
                launcher.x = mousePos.x;
                launcher.y = mousePos.y;
            }
        });

        canvas.addEventListener('touchend', function (e) {
            e.preventDefault();
            //声音
            media.pause();  
            if(launcher){
                launcher.status = false;
            }
        });

        setInterval(function () {
            world.timeTick();
        }, 60);  
    } 

});

