define(function (require, exports, module) {
    var Util = require('./Util');
    var Grain = require('./Grain');
    /**
     * 文字构造函数
     * @param config
     * id       一段文字的 id
     * world    这个Fonter的宿主
     * text     文字的内容 text 
     */
    function Fonter(config) {
        this.id = config.id;
        this.world = config.world; 
        this.text = config.text; 
    }
    /**
     * 创建一批新的粒子，最多创建count个
     * @param count
     */
    Launcher.prototype.createGrain = function (count) { 
        for (var i = 0; i < count; i++) { 
            var _grain = new Grain({
                    id: Util.randomString("", 8),
                    world: this.world,
                    text: this.text,
            });
            this.grainList.push(_grain);
        }
    };
    /**
     * 绘制所有的文字
     */
    Launcher.prototype.Fonter = function () {
        for (var i = 0; i < this.grainList.length; i++) {
            this.grainList[i].paint();
        }
    }; 
    module.exports = Launcher;
});