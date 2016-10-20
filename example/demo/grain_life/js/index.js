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
        var imgBackground = new Image(),
            imgLizi = new Image();
        imgBackground.src = './img/night.jpg';
        imgLizi.src = './img/lizi2.png';

        var canvas = document.getElementById('stage'); 
        canvas.width  =  $('.grain').css('width').replace('px','');
        canvas.height =  $('.grain').css('height').replace('px',''); 

        var world = new World({
            backgroundImage: imgBackground,
            canvas: canvas,
            minWind: -1,
            maxWind: 1,
            minHeat: 0.91,
            maxHeat: 0.01,
            gravity: 1
        });   
        canvas.addEventListener('touchend', function (e) {
            e.preventDefault();
            var length = world.launchers.length;
            if(length > 0){ 
                world.clearLauncher();
            } 
        }); 
        canvas.addEventListener('touchstart', function (e) { 
                var ctx = canvas.getContext("2d"); 
                ctx.fillStyle = "#ffffff"; 
                ctx.fillText('CodePlayer+中文测试', 300,300);   

                launcher =  world.createLauncher({
                    id: Util.randomString("", 8),
                    world: world,
                    grainImage: imgLizi,
                    rangeX: parseInt($('#rangeX').val()),
                    rangeY: parseInt($('#rangeY').val()),
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY, 
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
            }); 
        }, false); 
        //世界刷新的频率
        setInterval(function () {
            world.timeTick();
            if(launcher){
                launcher.status = false;
            }
        }, 60);
    }  
});