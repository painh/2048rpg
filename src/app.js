/* global cc */
var HelloWorldScene = cc.Scene.extend({
	prevMovedCnt : 0,
	mapLayer : null,
	onEnter:function()
	{
		cc.rectIntersectsRect = function (rectA, rectB) {
			return !(cc.rectGetMaxX(rectA) <= cc.rectGetMinX(rectB) ||
				cc.rectGetMaxX(rectB) <= cc.rectGetMinX(rectA) ||
				cc.rectGetMaxY(rectA) <= cc.rectGetMinY(rectB) ||
				cc.rectGetMaxY(rectB) <= cc.rectGetMinY(rectA));
		};

        this._super();
        
        var layer;
        
        layer = new BackgroundLayer();
        this.addChild(layer);
        
        layer = new MapLayer();
		this.mapLayer = layer;
        this.addChild(layer);

        layer = new GuiLayer();
        this.addChild(layer);
        

        this.scheduleUpdate(); 
		var scene = this;

//		cc.SPRITE_DEBUG_DRAW = 1;



		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  function(keyCode, event){
				var label = event.getCurrentTarget();
//				console.log("Key " + keyCode.toString() + " was pressed!");
//				console.log(cc);
				scene.keyDown(keyCode);

			},
			onKeyReleased: function(keyCode, event){
				var label = event.getCurrentTarget();
//				console.log("Key " + keyCode.toString() + " was released!");
			}
		}, this);

		 cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this)
	}, 
	moveObjs : function(ax, ay)
	{ 
		for(var i in this.mapLayer.objList)
		{
			var obj = this.mapLayer.objList[i];
			if(obj.moved)
				return;
		}

		for(var i in this.mapLayer.objList)
		{
			var obj = this.mapLayer.objList[i];
			if(!obj.stopped)
				continue;

			if(!obj.moveAble)
				continue;

			obj.ax = ax;
			obj.ay = ay;
			obj.stopped = false;
			obj.moved = true;
		}
        
        if(ax < 0)
            this.mapLayer.objList.sort(function(a, b) {return a.x - b.x});
        
        if(ax > 0)
            this.mapLayer.objList.sort(function(a, b) {return b.x - a.x});

        if(ay < 0)
            this.mapLayer.objList.sort(function(a, b) {return a.y - b.y});

        if(ay > 0)
            this.mapLayer.objList.sort(function(a, b) {return b.y - a.y});
	},
	keyDown : function(keyCode)
	{ 
		switch(keyCode)
		{
			case cc.KEY['1']:
				this.mapLayer.Init('default'); 
				break;

			case cc.KEY['2']:
				this.mapLayer.Init('town'); 
				break;
                
			case cc.KEY['3']:
				this.mapLayer.GenerateNewObj("enemy"); 
				break;                
            
			case cc.KEY.left:
				this.moveObjs(-1 * MOVE_STEP, 0); 
				break;

			case cc.KEY.right:
				this.moveObjs(1 * MOVE_STEP, 0); 
				break;

			case cc.KEY.up:
				this.moveObjs(0, 1 * MOVE_STEP); 
				break;
			case cc.KEY.down:
				this.moveObjs(0, -1 * MOVE_STEP); 
				break;
		}

	},
	onTouchBegan:function(touch, event) {
        var pos = touch.getLocation();
		if(pos.x > 0 && pos.y > 0 && pos.x < 320 && pos.y < 50)
			this._node.keyDown(cc.KEY.down);

		if(pos.x > 0 && pos.y > 0 && pos.x < 50 && pos.y < 480)
			this._node.keyDown(cc.KEY.left);

		if(pos.x > 320 - 50 && pos.y > 0 && pos.x < 320 && pos.y < 480)
			this._node.keyDown(cc.KEY.right);

		if(pos.x > 0 && pos.y > 480 - 50 && pos.x < 320 && pos.y < 480)
			this._node.keyDown(cc.KEY.up);

        return true;
    },

    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
    },

    onTouchEnded:function(touch, event) {
    },
	update : function(dt)
	{
		var movedCnt = 0;
        var removeObj = [];
        var layer = this.mapLayer;
        var forceMoved = false;
        
		for(var i in layer.objList)
		{
			var obj = layer.objList[i];
			if(!obj.moveAble)
				continue;
                
			if(obj.stopped)
				continue;

            obj.moved = false;

            //create a rect to represent our green square
            
            var rectHero = cc.rect(obj.x + obj.ax - TILE_SIZE / 2, obj.y + obj.ay - TILE_SIZE / 2, TILE_SIZE, TILE_SIZE) 
            var hit = false;
			var stopped = false;
// 
            for(var i in layer.objList)
            {
                var targetObj = layer.objList[i];
                if(obj == targetObj)
                    continue;
                    
                if(cc.rectIntersectsRect(rectHero, targetObj.rect)) 
                {
                    if(targetObj.stopped)
                    {
                        stopped = true;
// combine two objects
                        if(targetObj.num == obj.num && targetObj.moveAble && targetObj.type == obj.type)
                        {
                            removeObj.push(obj);
                            
                            targetObj.Combined();                            
                            forceMoved = true;
                        } 

                        if((targetObj.type == 'player' && obj.type == 'enemy') ||
                            (obj.type == 'player' && targetObj.type == 'enemy') )
                        {
                            var enemy = targetObj.type == 'enemy' ? targetObj : obj;
//                            var player = targetObj.type == 'player' ? targetObj : obj;
                            
                            removeObj.push(enemy);
                        }
                    }

                    hit = true; 
                }

				if(hit)
					break;
            }

            if(stopped)
            {
                obj.stopped = true;
//				this.x = parseInt(this.x / 16) * 16;
//				this.y = parseInt(this.y / 16) * 16;
            } 

            if(!hit)
            {
                var terra = layer.checkOnTerra(obj.x + obj.ax, obj.y + obj.ay);
                if(terra === true)
                {
                    obj.SetPos(obj.x + obj.ax, obj.y + obj.ay);
                    obj.moved = true;
                }
                else
                {
                    if(terra.type == 'floor_down' && obj.type == 'player')
                    {
                        layer.stageEnd = true;
                    }
                    
                    console.log(terra.hp);

                    if(obj.type == 'player' && terra.hp > 0)
                    {
                        terra.hp -= 1;
                        if(terra.hp === 0)
                            removeObj.push(terra);
                    }
                    obj.stopped = true;
                }
            }

			if(obj.moved)
				movedCnt++;
		}
        
        for(var i in removeObj)
            layer.removeObject(removeObj[i]);
        removeObj = [];

		if(forceMoved == false && this.prevMovedCnt != movedCnt && movedCnt == 0)
        {
			layer.GenerateNewObj("enemy");
            for(var i in layer.objList)
            {
                var obj = layer.objList[i];
                obj.ax = 0;
                obj.ay = 0;
            }                        
        }

		this.prevMovedCnt = movedCnt;
        
        if(layer.stageEnd == true)
            layer.Init(); 
    }    
});