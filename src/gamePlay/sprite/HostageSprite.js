/**
 * Created by LJJ on 2015/11/23.
 */


var HostageSprite = cc.Sprite.extend({
    _bornSprite : null,
    _hostageBatchNode : null,
    _callback : null,
    _alive:null,

    ctor: function (texture) {

        this._super();
        this._alive = true;
        this._bornSprite = new cc.Sprite(texture);


        //this.addChild(this._bornSprite);
        //this.initBornSprite();
        //this.MyUpdate();

    },
    //
    //initBornSprite : function() {
    //
    //
    //    //this._bornSprite = new cc.Sprite(res.host_png);
    //    //this._bornSprite.attr({
    //    //    x: GC.w_2,
    //    //    y: GC.h_2
    //    //});
    //    //this.setName("Hostage");
    //    //this.addChild(this._bornSprite);
    //},




    //MyUpdate:function() {
    //
    //    this._callback = function(){
    //
    //        cc.log(Hostages[0].x,Hostages[0].y);
    //       // cc.log(Hostages[0])
    //    }
    //
    //    // 1. API : node.schedule(callback, interval, repeat, delay);
    //    // 2. interval : 每隔多少秒执行一次函数
    //    // 3. repeat : 【默认】:【cc.REPEAT_FOREVER】
    //    // 4. delay  : 【默认】:【 0 】
    //    this.schedule(this._callback, 1);
    //},



    killed:function ()
    {
        var dd = g_GPTurnPlate.convertToWorldSpace(this._bornSprite);
        //var dd = this._bornSprite.convertToWorldSpace(tmpNode.getPosition());
        cc.log(dd);
        this._bornSprite.removeFromParent(true);
        var dd1 = {x:dd.x,y:dd.y+20};
        var dd2 = {x:dd.x,y:dd.y-20};

        var corpseUpPartSprite = new cc.Sprite(g_GPShoot.corpseUpPartBatchNode.texture);
        corpseUpPartSprite.setPosition(dd1);
        g_GPShoot.corpseUpPartBatchNode.addChild(corpseUpPartSprite,6);


        var corpseDownPartSprite = new cc.Sprite(g_GPShoot.corpseDownPartBatchNode.texture);
        corpseDownPartSprite.setPosition(dd2);
        g_GPShoot.corpseDownPartBatchNode.addChild(corpseDownPartSprite,6);

        //ChipmunkSpriteBatch.deadhostage(dd1,dd2);
        if (GC.SOUND_ON) {
            cc.audioEngine.playEffect(res.cry_mp3);
        }
        g_GPShoot._tmpScore += level;
        var score = new cc.LabelTTF("+5", "Arial Bold", 15);
        score.attr({
            anchorX: 1,
            anchorY: 0,
            x: GC.w - 5,
            y: GC.h - 70
        });
        score.color = cc.color(255, 255, 20);
        g_GPShoot.addChild(score);
        var action = cc.spawn(cc.moveTo(2, cc.p(GC.w - 5, GC.h - 50)),
            cc.fadeOut(2));
        score.runAction(action);



        var action = cc.spawn(cc.moveTo(4, cc.p(dd1.x, dd1.y - 300)),
            cc.rotateBy(4, -720),
            cc.fadeOut(4));
        var seqAction = cc.sequence(action, cc.callFunc(g_GPShoot.removeFromParentAndCleanup, corpseUpPartSprite, true));

        corpseUpPartSprite.runAction(seqAction);


        var action = cc.spawn(cc.moveTo(4, cc.p(dd2.x, dd2.y - 300)),
            cc.rotateBy(4, -720),
            cc.fadeOut(4));
        var seqAction = cc.sequence(action, cc.callFunc(g_GPShoot.removeFromParentAndCleanup, corpseDownPartSprite, true));

        corpseDownPartSprite.runAction(seqAction);
    },
    escape:function()
    {

    }



});



