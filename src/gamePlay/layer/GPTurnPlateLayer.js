/**
 * Created by LJJ on 2015/11/23.
 */

var g_GPTurnPlate;


var Game_State = STATE_START;

var GPTurnPlate = cc.Layer.extend({
    _TurnPlate : null,
    _HandCuff : null,
    _Dart : null,
    _HostageBatchNode:null,
    _BloodBatchNode:null,
    _No_dead : 0,
    _Hostages : [],


    ctor : function(){

        this._super();
        //this.setContentSize(GC.w_2, GC.h_2 );
        this.setPosition(0 , 50 );

        Game_State = STATE_START;
        //this.attr({
        //    x: TurnPoint_w,
        //    y: TurnPoint_h
        //});
        //this.setContentSize(320,480-90);
        //this.setPosition(TurnPoint_w, TurnPoint_h);
        //this.setPosition(0, TurnPoint_h);
        this.initTurnPlate();
        //this.getRandom();

        this.initHostage();

        //this.initHandCuff();

        this.initDart();
        this.initBlood();

        this.Rotate();
        var anchor = this.getAnchorPoint();
        cc.log("anchor : ", anchor);
        var position = this.getPosition();
        cc.log("anchor : ", position);
        g_GPTurnPlate = this;
    },

    initTurnPlate : function(){
        this._TurnPlate = new TurnPlateSprite();
        this.addChild(this._TurnPlate,4);
    },
    initBlood : function() {
        var texOpaque = cc.textureCache.addImage(res.blood_png);
        this._BloodBatchNode = new cc.SpriteBatchNode(texOpaque, 50);
        this.addChild(this._BloodBatchNode,5, TAG_SPRITE_MANAGER);
    },

    getRandom : function() {
        for(var i=0;i<Num_men;i++){
            Men[i] = (Num_total*Math.random());
        }
        cc.log(Men);
    },

    initHostage : function(){
        var texOpaque = cc.textureCache.addImage(res.host_png);
        this._HostageBatchNode = new cc.SpriteBatchNode(texOpaque, 50);
        this.addChild(this._HostageBatchNode,5, TAG_SPRITE_MANAGER);


        for(var i=1;i<No_Hostage+1;i++)
        {
            //var sprite = new cc.Sprite();
            //var hostage = new HostageSprite(i);
            var hostage = new HostageSprite(this._HostageBatchNode.texture);
            if(i<1)
            {
                hostage._bornSprite.x = TurnPoint_w ;
                hostage._bornSprite.y = TurnPoint_h+Hostage_h*3;
            }
            else if(i<4)
            {
                hostage._bornSprite.x = TurnPoint_w+(i-1)*(Hostage_w+Hostage_space_w) - (Hostage_w+Hostage_space_w) ;
                hostage._bornSprite.y = TurnPoint_h+Hostage_h*2;
            }
            else if(i<9)
            {
                hostage._bornSprite.x = TurnPoint_w+(i-4)*(Hostage_w+Hostage_space_w) - (Hostage_w+Hostage_space_w)*2 ;
                hostage._bornSprite.y = TurnPoint_h+Hostage_h;
            }
            else if(i<16)
            {
                hostage._bornSprite.x = TurnPoint_w+(i-9)*(Hostage_w+Hostage_space_w) - (Hostage_w+Hostage_space_w)*3 ;
                hostage._bornSprite.y = TurnPoint_h;
            }
            else if(i<21)
            {
                hostage._bornSprite.x = TurnPoint_w+(i-16)*(Hostage_w+Hostage_space_w) - (Hostage_w+Hostage_space_w)*2 ;
                hostage._bornSprite.y = TurnPoint_h-Hostage_h;
            }
            else if(i<24)
            {
                hostage._bornSprite.x = TurnPoint_w+(i-21)*(Hostage_w+Hostage_space_w) - (Hostage_w+Hostage_space_w) ;
                hostage._bornSprite.y = TurnPoint_h-Hostage_h*2;
            }
            else
            {
                hostage._bornSprite.x = TurnPoint_w ;
                hostage._bornSprite.y = TurnPoint_h-Hostage_h*3;
            }

            hostage._bornSprite.setTag(i);
            this._Hostages.push(hostage);
            this._HostageBatchNode.addChild(hostage._bornSprite,6);
        }

    },

    initHandCuff : function(){
        this._HandCuff = new HandCuffSprite();

        this.addChild(this._HandCuff,6);
    },

    initDart : function() {
        this._Dart = new Dart();
        this.addChild(this._Dart,7);
    },

    Rotate : function() {
        var rotation = cc.rotateBy(3, 90).repeatForever();
        cc.log("mark1");
        //rotation.
        //rotation.setTag(99);

        // 运行一个动作
        this.runAction(rotation);
    },

    stopaction : function(){
        this.stopAllActions();
        this._TurnPlate.stoplisten();
    },

    clearHostage : function() {
        for(var i in this._Hostages)
        {
            var hostage = this._Hostages[i];
            if(hostage._alive)
            {
                hostage._bornSprite.removeFromParent(true);
                hostage._alive = false;
            }

        }

    },


    removeFromParentAndCleanup:function (nodeExecutingAction, data) {
        nodeExecutingAction.removeFromParent(data);
    }


});

GPTurnPlate.initfb = function(dd) {
    cc.log("initfb");
    //var dd = touch.getLocation();
    var pp = g_GPTurnPlate.convertToNodeSpace(dd);
    if(Game_State == STATE_PLAYING)
        GPTurnPlate.Checktouch(pp);

    //var batch = g_GPTurnPlate._Dart._dart2BatchNode;
    //var sprite = new cc.Sprite(batch.texture);
    //
    //batch.addChild(sprite);
    //sprite.setPosition(pp.x+5,pp.y+10);
    //cc.log(g_GPTurnPlate.rotation);
    //
    //var thita = -90-Math.atan((sprite.x - dd.x)/(dd.y - sprite.y))/3.1415*180;
    //cc.log(thita);
    //thita = (thita - g_GPTurnPlate.rotation)%360;
    //cc.log(thita);
    //sprite.setRotation(thita);
    //setTimeout(function(){g_GPTurnPlate.removeFromParentAndCleanup( sprite, true)},3000);

},

    GPTurnPlate.Checktouch = function(pp){
        cc.log("test:");
        cc.log("the touch location:",pp.x,pp.y);
        for(var i in g_GPTurnPlate._Hostages)
        {
            var hostage = g_GPTurnPlate._Hostages[i];
            if(!hostage._alive)continue;
            var myRect = cc.rect(hostage._bornSprite.x-Hostage_t_w_2,
                hostage._bornSprite.y-Hostage_t_h_2,Hostage_t_w,Hostage_t_h);


            if(cc.rectContainsPoint(myRect, pp))
            {
                cc.log("catch the hostage:"+ i);
                g_GPTurnPlate._No_dead++;

                var blood = new cc.Sprite(g_GPTurnPlate._BloodBatchNode.texture);
                blood.x = pp.x;
                blood.y = pp.y;
                g_GPTurnPlate._BloodBatchNode.addChild(blood,5);

                var fadeout = cc.fadeOut(2);
                    blood.runAction(fadeout);

                var rotation = cc.rotateBy(3, 90+g_GPTurnPlate._No_dead*9).repeatForever();
                        g_GPTurnPlate.runAction(rotation);

                //switch (g_GPTurnPlate._No_dead)
                //{
                //    case 5:
                //        var rotation = cc.rotateBy(2, 90).repeatForever();
                //        g_GPTurnPlate.runAction(rotation);
                //        break;
                //    case 6:
                //        g_GPTurnPlate._Level++;
                //        break;
                //    case 10:
                //        g_GPTurnPlate._Level++;
                //        var rotation = cc.rotateBy(1, 90).repeatForever();
                //        g_GPTurnPlate.runAction(rotation);
                //        break;
                //    case 11:
                //        g_GPTurnPlate._Level++;
                //        break;
                //    default:
                //        break;
                //}

                hostage.killed();
                hostage._alive = false;
                if(g_GPTurnPlate._No_dead == No_Hostage)
                {
                    if(g_GPShoot._Timer > 0.1)
                        Game_State = STATE_GAMEOVER;
                    cc.log("Game state:"+Game_State);
                }
                return true;
            }
        }
        return false;

    }