/**
 * Created by LJJ on 2015/12/2.
 */


//------------------------------------------------------------------
//
// Chipmunk + Sprite
//
//------------------------------------------------------------------


var ChipmunkLayer = cc.Layer.extend({
   space : null,


    ctor : function() {

        this._super();
        this.space = new cp.Space();

    }

});


var ChipmunkSprite = ChipmunkLayer.extend( {

    ctor: function() {
        this._super();
        //cc.base(this);


        //this.addSprite = function( pos ) {
        //    var sprite =  this.createPhysicsSprite( pos );
        //    var child = new cc.Sprite(res.host_png);
        //    child.attr({
        //        scale: 0.4,
        //        anchorX: 0,
        //        anchorY: 0,
        //        x: sprite.width/2,
        //        y: sprite.height/2
        //    });
        //    sprite.addChild(child);
        //    this.addChild( sprite );
        //};



        this.initPhysics();
    },

    //title : function(){
    //    return 'Chipmunk Sprite Test';
    //},

    initPhysics : function() {
        var space = this.space ;
        var staticBody = space.staticBody;

        // Walls
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(GC.w,0), 0 ),               // bottom
            new cp.SegmentShape( staticBody, cp.v(0,GC.h), cp.v(GC.w,GC.h), 0),    // top
            new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,GC.h), 0),             // left
            new cp.SegmentShape( staticBody, cp.v(GC.w,0), cp.v(GC.w,GC.h), 0)  // right
        ];
        for( var i=0; i < walls.length; i++ ) {
            var shape = walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            space.addStaticShape( shape );
        }

        // Gravity
        space.gravity = cp.v(0, -100);
    },

    createPhysicsSprite : function( pos ) {

        var body = new cp.Body(1, cp.momentForBox(1, 48, 108) );

        body.setPos( pos );
        cc.log(body);
        this.space.addBody( body );
        //var shape = new cp.BoxShape( body, Hostage_w-5, Hostage_h-5);
        var shape = new cp.BoxShape( body, 20-5, 20-4);

        shape.setElasticity( 0.5 );
        shape.setFriction( 0.5 );
        this.space.addShape( shape );

        var sprite = new cc.PhysicsSprite(res.half_up);
        sprite.setBody( body );
        return sprite;
    },

    createPhysicsSprite2 : function( pos ) {
        cc.log(pos);
        var body = new cp.Body(1, cp.momentForBox(1, 48, 108) );
        body.setPos( pos );
        this.space.addBody( body );
        //var shape = new cp.BoxShape( body, Hostage_w-5, Hostage_h-5);
        var shape = new cp.BoxShape( body, 20-5, 20-4);

        shape.setElasticity( 0.5 );
        shape.setFriction( 0.5 );
        this.space.addShape( shape );

        var sprite = new cc.PhysicsSprite(res.half_down);
        sprite.setBody( body );
        return sprite;
    },

    onEnter : function () {
        ChipmunkLayer.prototype.onEnter.call(this);
        //cc.base(this, 'onEnter');

        this.scheduleUpdate();
        //for(var i=0; i<10; i++) {
        //    var variancex = cc.randomMinus1To1() * 5;
        //    var variancey = cc.randomMinus1To1() * 5;
        //    this.addSprite( cp.v(GC.w/2 + variancex, GC.h/2 + variancey) );
        //}

        //if( 'touches' in cc.sys.capabilities ){
        //    cc.eventManager.addListener({
        //        event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        //        onTouchesEnded: function(touches, event){
        //            var l = touches.length, target = event.getCurrentTarget();
        //            for( var i=0; i < l; i++) {
        //                target.addSprite( touches[i].getLocation() );
        //            }
        //        }
        //    }, this);
        //} else if( 'mouse' in cc.sys.capabilities )
        //    cc.eventManager.addListener({
        //        event: cc.EventListener.MOUSE,
        //        onMouseDown: function(event){
        //            event.getCurrentTarget().addSprite(event.getLocation());
        //        }
        //    }, this);
    },

    update : function( delta ) {
        this.space.step( delta );
    },

    addSprite : function( pos ,dd2) {
        var sprite =  this.createPhysicsSprite( pos );
        //var child = new cc.Sprite(res.host_png);
        //child.attr({
        //    scale: 0.4,
        //    anchorX: 0,
        //    anchorY: 0,
        //    x: sprite.width/2,
        //    y: sprite.height/2
        //});
        //sprite.addChild(child);
        this.addChild( sprite );
}
});

//------------------------------------------------------------------
//
// Chipmunk + Sprite + Batch
//
//------------------------------------------------------------------

var g_ChipmunkSprite = null;
var ChipmunkSpriteBatch = ChipmunkSprite.extend( {
    ctor : function () {
        this._super();
        // cc.base(this);
        g_ChipmunkSprite = this;
        // batch node
        this.batch = new cc.SpriteBatchNode(res.half_up, 50 );
        this.addChild( this.batch );

        this.batch2 = new cc.SpriteBatchNode(res.half_down, 50 );
        this.addChild( this.batch2 );

        this.addSprite = function( dd1, dd2 ) {
          cc.log("1");
            cc.log(dd2);
            var sprite =  this.createPhysicsSprite( dd1 );
            cc.log("2");
            var sprite2 =  this.createPhysicsSprite2( dd2);
            cc.log("3");
            this.batch.addChild( sprite );
            cc.log("4");
            this.batch2.addChild( sprite2 );
            cc.log("5");
        };
    }


});


ChipmunkSpriteBatch.deadhostage = function(dd1,dd2) {

    g_ChipmunkSprite.addSprite(dd1,dd2);
    if (GC.SOUND_ON) {
        cc.audioEngine.playEffect(res.cry_mp3);
    }
    g_GPShoot._tmpScore += level;

};


