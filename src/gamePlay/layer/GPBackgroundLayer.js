/**
 * Created by LJJ on 2015/11/22.
 */

var GPBackgroundLayer = cc.Layer.extend({
    _Background : null,
    ctor : function(){

        this._super();

        this.initBackground();

    },

    initBackground : function(){
        this._Background = new cc.Sprite(res.bg_png);
        this._Background.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._Background);
    }
});
