/**
 * Created by LJJ on 2015/11/22.
 */
var g_GPShoot;

var GPShootLayer = cc.Layer.extend({
    _Dart : null,
    _HostageBatchNode: null,
    _tmpScore : 0,
    _Timer : 0,
    corpseUpPartBatchNode : null,
    corpseDownPartBatchNode : null,
    ctor : function(){
        this._super();
        g_GPShoot = this;
        this._tmpScore = Score_init;
        this._Timer = Timer;
        this.initDart();
        this.initDeadHostage();
        this.initAboutInfo();
        this.loadCorpseBatchNode();
        cc.log("mark2.");
        //this.scheduleUpdate();
        this.schedule(this.update,0.2);

    },

    initDart : function() {
        this._Dart = new Dart();
        this.addChild(this._Dart,8);
    },
    initTurnPlateDart : function(pp){
        GPTurnPlate.initfb(pp);
    },
    initDeadHostage : function(){
        var texOpaque = cc.textureCache.addImage(res.host_png);
        this._HostageBatchNode = new cc.SpriteBatchNode(texOpaque, 50);
        this.addChild(this._HostageBatchNode,5, TAG_SPRITE_MANAGER);

    },

    loadCorpseBatchNode : function() {
        this.corpseUpPartBatchNode = new cc.SpriteBatchNode(res.half_up, 50 );
        this.addChild( this.corpseUpPartBatchNode );

        this.corpseDownPartBatchNode = new cc.SpriteBatchNode(res.half_down, 50 );
        this.addChild( this.corpseDownPartBatchNode );
    },

    removeFromParentAndCleanup:function (nodeExecutingAction, data) {
        nodeExecutingAction.removeFromParent(data);
    },
    initAboutInfo : function(){

        this._lbScore = new cc.LabelTTF("Score:" +  Score_init, "Arial Bold", 20);
        this._lbScore.attr({
            anchorX: 1,
            anchorY: 0,
            x: GC.w - 5,
            y: GC.h - 40
        });
        this._lbScore.color = cc.color(255, 255, 20);
        this._lbScore.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this._lbScore, 1000);

        this._lbTimer = new cc.LabelTTF("Time:" +  Timer, "Arial Bold", 20);
        this._lbTimer.attr({
            anchorX: 0,
            anchorY: 0,
            x:  5,
            y: GC.h - 40
        });
        this._lbTimer.color = cc.color(255, 255, 20);
        this._lbTimer.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this._lbTimer, 1000);
    },
    update:function () {
        if (Game_State == STATE_PLAYING) {
            //cc.log("update.");
            this._Timer -= 0.2;
            if(this._Timer <= 0)
            {
                Game_State = STATE_GAMEOVER;
                this._Timer = 0;
            }

            this._lbTimer.setString("Time: " + this._Timer.toFixed(2));
            this._lbScore.setString("Score: " + g_GPShoot._tmpScore);
        }
        if(Game_State == STATE_GAMEOVER)
        {
            var gameOver = new GPGameOver();
            this.addChild(gameOver);
            this._lbTimer.removeFromParentAndCleanup(true);
            this._lbScore.removeFromParentAndCleanup(true);
            Game_State = STATE_END;
        }
    }

});

GPShootLayer.initfbaction = function(touch) {
    var dd = touch.getLocation();

    //var pp = g_GPTurnPlate.convertToNodeSpace(dd);
    var onComplete = cc.callFunc(g_GPShoot.initTurnPlateDart, g_GPShoot, dd);

    var batch = g_GPShoot._Dart._dartBatchNode;
    cc.log("initfbaction");
    var sprite = new cc.Sprite(batch.texture);
    sprite.x = 320;
    sprite.y = 90;
    batch.addChild(sprite);
    sprite.setAnchorPoint(1 ,0.5);
    if (GC.SOUND_ON) {
        cc.audioEngine.playMusic(res.fb_mp3);
    }

    var score = new cc.LabelTTF("-1", "Arial Bold", 15);
    score.attr({
        anchorX: 1,
        anchorY: 0,
        x: GC.w - 80,
        y: GC.h - 70
    });
    score.color = cc.color(255, 255, 20);
    g_GPShoot.addChild(score);

    var action = cc.spawn(cc.moveTo(2, cc.p(GC.w - 80, GC.h - 50)),
        cc.fadeOut(2));
    score.runAction(action);

    var thita = -90-Math.atan((sprite.x - dd.x)/(dd.y - sprite.y))/3.1415*180;
    cc.log(thita);
    var action = cc.spawn(cc.moveTo(0.5, cc.p(dd.x, dd.y)),
                                cc.rotateBy(0.2, thita),
                                cc.scaleTo(0.5, 0.25));
    var seqAction = cc.sequence(action, cc.callFunc(g_GPShoot.removeFromParentAndCleanup, sprite, true),onComplete);

    sprite.runAction(seqAction);

};

//GPShootLayer.deadhostage = function(dd,level) {
//
//    var batch = g_GPShoot._HostageBatchNode;
//    var sprite = new cc.Sprite(batch.texture);
//    cc.log("deadhostage.");
//    g_GPShoot._HostageBatchNode.addChild(sprite);
//    sprite.setPosition(dd.x,dd.y);
//    if (GC.SOUND_ON) {
//        cc.audioEngine.playEffect(res.cry_mp3);
//    }
//    g_GPShoot._tmpScore += level;
//    g_GPShoot._lbScore.setString("Score: " + g_GPShoot._tmpScore);
//
//    var action = cc.spawn(cc.moveTo(2, cc.p(dd.x,10)),
//        cc.rotateBy(1, 270+360));
//    sprite.runAction(action);
//
//};


