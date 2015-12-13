/**
 * Created by LJJ on 2015/11/23.
 */

var Dart = cc.Sprite.extend({
    _dartBatchNode : null,
    _dart2BatchNode : null,
    ctor: function () {

        this._super();

        this._dartBatchNode = new cc.SpriteBatchNode(res.fb_png, 5);
        //this._dartBatchNode.x=320;
        //this._dartBatchNode.y=0;
        this.addChild(this._dartBatchNode, 0, TAG_SPRITE_MANAGER);
        //this._dart2BatchNode = new cc.SpriteBatchNode(res.fb2_png, 5);
        //this._dartBatchNode.x=320;
        //this._dartBatchNode.y=0;
        //this.addChild(this._dart2BatchNode, 0, TAG_SPRITE_MANAGER);

    }

});



