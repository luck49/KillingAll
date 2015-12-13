/**
 * Created by LJJ on 2015/11/22.
 */


var PlayLayer = cc.Layer.extend({

    backGround_layer : null,
    turnPlate_layer : null,
    shootLayer : null,
    chipmunkLayer : null,

    ctor:function () {
        this._super();
        var size = cc.winSize;
        //var GameLabel = new cc.LabelTTF("Hostage Rescue", "Arial", 38);
        // position the label on the center of the screen
        //GameLabel.x = size.width / 2;
        //GameLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        //this.addChild(GameLabel, 5);

        this.addBackgroundLayer();
        //
        this.addTurnPlate();

        this.addShootLayer();

        //this.addChipmunkLayer();

    },

    addBackgroundLayer : function(){

        //this._BackGround_layer = new ChipmunkSpriteBatchTest();
        this.backGround_layer = new GPBackgroundLayer();
        this.addChild(this.backGround_layer);
        //this._BackGround_layer = new cc.LayerColor(cc.color(24, 122, 71));
        //this.addChild(this._BackGround_layer);
        //var layer = new cc.LayerColor(cc.color(0, 0, 0));
        //layer.setContentSize(320,40);
        //this.addChild(layer,5);
    },

    addTurnPlate : function(){
        this.turnPlate_layer = new GPTurnPlate();
        this.addChild(this.turnPlate_layer);
    },

    addShootLayer : function(){
        this.shootLayer = new GPShootLayer();
        this.addChild(this.shootLayer,50);
    },

    addChipmunkLayer : function () {
        this.chipmunkLayer = new ChipmunkSpriteBatch();
        this.addChild(this.chipmunkLayer);

    }
});

var KillingAllScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});

