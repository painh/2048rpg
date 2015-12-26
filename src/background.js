/* global randomRange */
var BackgroundLayer = cc.Layer.extend({
    objList : [],
	ctor:function () { 
        //////////////////////////////
        // 1. super init first
        this._super();
		this.Init();

	},
	Init : function()
	{
		var destroyList = this.objList.slice(0);
		for(var i in destroyList)
            this.removeChild(destroyList[i]);
		this.objList = [];
		destroyList = [];
        
		for(var i = 0; i < 10;++i)
			for(var j = 0; j < 10;++j)
			{
                var obj = new GameObj(this, i * TILE_SIZE, j * TILE_SIZE, OBJECT_IDX_BACKTILE);
                obj.sprite.setColor( getSimilarColor("light_green"));
                
                
				this.objList.push(obj);
			}

        this.setPosition(cc.p(cc.winSize.width  / 2 - TILE_SIZE * 10 / 2 + TILE_SIZE / 2,
                        cc.winSize.height / 2 - TILE_SIZE * 10 / 2 + TILE_SIZE / 2));

    },
});
