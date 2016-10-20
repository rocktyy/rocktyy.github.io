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

        var cw = parseInt(getComputedStyle(canvas).width);
        var scaleRate = cw/canvas.width;
        if('touchstart' in window) scaleRate = 1; 

        canvas.addEventListener('touchmove', function (e) {
            e.preventDefault();
            if(launcher){ 
                launcher.x = event.touches[0].clientX;
                launcher.y = event.touches[0].clientY;  
            }
        });

        canvas.addEventListener('touchend', function (e) { 
            e.preventDefault();
            //声音
            media.pause(); 
            bgMedia.trigger('play');
            if(launcher){
                launcher.status = false;
            }
        }); 
        canvas.addEventListener('touchstart', function (e) {  
            //播放声音   
            bgMedia.trigger('pause');
            media.play();
            /*
            var ctx = canvas.getContext("2d"); 
            ctx.fillStyle = "#ffffff"; 
            ctx.fillText('CodePlayer+中文测试', 300,300);   
            */
 
            if(!launcher){
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
                })
            }else{
                launcher.status = 1; 
                launcher.x = event.touches[0].clientX;
                launcher.y = event.touches[0].clientY;  
            };
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