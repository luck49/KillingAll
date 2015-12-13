/**
 * Created by LJJ on 2015/12/1.
 */
var flag=0;
var GPGameOver = cc.Layer.extend({
    _Background : null,
    _Win : false,
    _score : null,
    _time : null,
    _lbScore : null,
    _lbTime : null,
    ctor : function(){

        this._super();
        flag = 0;
        var playAgainNormal = new cc.Sprite(res.mm_mune1_png);
        var playAgainSelected = new cc.Sprite(res.mm_mune2_png);


        var playAgain = new cc.MenuItemSprite(
            playAgainNormal,
            playAgainSelected,

            this.onPlayAgain,
            this
        );
        var menu = new cc.Menu(playAgain);
        menu.x = GC.w_2;
        menu.y = 210;
        this.addChild(menu,10);
        this._score = g_GPShoot._tmpScore;
        this._time = g_GPShoot._Timer.toFixed(2);
        this.initAboutInfo();
        if(g_GPTurnPlate._No_dead == No_Hostage)
            this._Win = true;
        if(this._Win)
        {
            this.initWin();
            this.schedule(this.update,0.04);
        }
        else
        {

            this.initLose();
            this.initScore();

        }
        g_GPTurnPlate.stopaction();

    },


    onPlayAgain: function(){
        g_GPTurnPlate.clearHostage();
        cc.director.runScene(new cc.TransitionFade.create(1.2, new KillingAllScene()));
    },
    initAboutInfo : function(){

        this._lbScore = new cc.LabelTTF("Score:" +  this._score, "Arial Bold", 20);
        this._lbScore.attr({
            anchorX: 1,
            anchorY: 0,
            x: GC.w - 5,
            y: GC.h - 40
        });
        this._lbScore.color = cc.color(255, 255, 20);
        this._lbScore.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this._lbScore, 1000);

        this._lbTimer = new cc.LabelTTF("Time:" +  this._time, "Arial Bold", 20);
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

    initScore : function(){
        var Score = new cc.LabelTTF("Your Score:" + this._score, "Arial Bold", 20);
        Score.x = 160;
        Score.y = 270;
        Score.color = cc.color(0, 0, 255);
        this.addChild(Score);
        if(this._score<=0)
            var message = new cc.LabelTTF("你已经击败了"+0+"%的对手", "Arial Bold", 20);
        else if(this._score >200)
            var message = new cc.LabelTTF("你已经击败了"+100+"%的对手", "Arial Bold", 20);
        else
            var message = new cc.LabelTTF("你已经击败了"+gaussianDistribution[this._score-1]+"%的对手", "Arial Bold", 20);
        message.x = 160;
        message.y = 300;
        message.color = cc.color(0, 0, 255);
        this.addChild(message);
    },
    initWin : function () {
        cc.audioEngine.playMusic(res.victory);
        var lbWin = new cc.LabelTTF("You Win", "Arial Bold", 40);
        lbWin.x = 160;
        lbWin.y = 280+80;
        lbWin.color = cc.color(250, 179, 0);
        this.addChild(lbWin);

    },
    initLose : function () {
        cc.audioEngine.playMusic(res.lose_mp3);
        var lbLose = new cc.LabelTTF("You Lose", "Arial Bold", 40);
        lbLose.x = 160;
        lbLose.y = 280+80;
        lbLose.color = cc.color(250, 179, 0);
        this.addChild(lbLose);

    },
    update:function () {
        if(this._time>=0.1)
        {
            this._time -= 0.2;
            this._score += 1;
            this._lbTimer.setString("Time: " + Math.abs(this._time.toFixed(2)));
            this._lbScore.setString("Your Score: " + this._score);
        }
        else if(flag==0){
            flag = 1;
            this.initScore();
        }



    }

    //initBackground : function(){
    //    this._Background = new cc.Sprite(res.bg_png);
    //    this._Background.attr({
    //        x: GC.w_2,
    //        y: GC.h_2
    //    });
    //    this.addChild(this._Background);
    //}
});
