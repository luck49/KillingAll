/**
 * Created by LJJ on 2015/11/23.
 */
var HandCuffSprite = cc.Sprite.extend({
    _bornSprite : null,

    ctor: function () {

        this._super();

        this.initBornSprite();

    },
    initBornSprite : function() {
        //for(var i=0;i<=3;i++){
            this._bornSprite = new cc.Sprite(res.handcaf_png);
            this._bornSprite.attr({
                x: GC.w_2-20,
                y: GC.h_2-20
            });
            this.setName("HandCuff");
            this.addChild(this._bornSprite);

        //}

    }

});