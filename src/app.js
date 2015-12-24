var TILE_SIZE = 32;
var MOVE_STEP = 8;
function randomRange(min, max)
{
	return Math.floor((Math.random() * max) + min);	
};

function hpToColor(hp)
{
	switch(hp)
	{
		case -1 : return cc.color(64, 64, 64);
		case  0 : return cc.color(128, 128, 128);
		case  1 : return cc.color(160, 160, 160);
		case  2 : return cc.color(228, 228, 228);
		case  3 : return cc.color(255, 255, 255);
	}; 
}
var HelloWorldLayer = cc.Layer.extend({
	objList:[], 
	terraList:[], 
	stageWidth : 0,
	stageHeight : 0,
	stageStartX : 0, 
	stageStartY : 0,
	stageEnd : false,
	generateStage : function()
	{
		var map = [];
		for(var i = 0; i < 10;++i)
		{
			map.push([]);
			for(var j = 0; j < 10;++j)
				map[i].push(0);
		}

		var template = [
//							[
//								[0, 1, 0],
//								[1, 1, 1],
//								[0, 1, 0],
//							],
//							[
//								[1, 0, 1],
//								[0, 1, 0],
//								[1, 0, 1],
//							],
							[
								[0, 1, 1, 0],
								[1, 1, 1, 1],
								[1, 1, 1, 1],
								[0, 1, 1, 0],
							],
						];

		function printStamp(x, y, src, target)
		{
			for( var i = 0; i < src.length; ++i)
				for( var j = 0; j < src[i].length; ++j)
				{
					var tx = x + i;
					var ty = y + j;
					if(tx < 0 || tx >= 10)
						continue;

					if(ty < 0 || ty >= 10)
						continue;

					if(target[tx][ty] == 1)
						continue;

					target[tx][ty] = src[i][j];
				} 
		}

		for( var i = 0; i < 10; ++i)
		{
			var stamp = template[randomRange(0, template.length)];
			var x = randomRange(0 - stamp[0].length, 9 + stamp[0].length);
			var y = randomRange(0 - stamp.length, 9 + stamp.length); 

			printStamp(x + stamp[0].length / 2, y + stamp.length / 2, stamp, map);
		}

		function addRandomObj(type)
		{
			while(1)
			{
				var x = randomRange(0, 9);
				var y = randomRange(0, 9); 
				printStamp(x + stamp[0].length / 2, y + stamp.length / 2, stamp, map);
				console.log(type, x, y);
				if(map[x][y] != 0)
					continue;

				map[x][y] = type;
				break;
			}
		}

		addRandomObj(2);
	//	addRandomObj(3);


		return map;
	},
	GenerateNewObj : function()
	{
		for(var j = 0; j < 10; ++j)
		{	
			var x = randomRange(0, (this.stageWidth - this.stageStartX )/ TILE_SIZE) * TILE_SIZE + this.stageStartX;
			var y = randomRange(0, (this.stageHeight - this.stageStartY) / TILE_SIZE) * TILE_SIZE + this.stageStartY;
			var found = false;
			for(var i in this.objList)
			{
				var obj = this.objList[i];
				if((obj.x == x) && (obj.y == y))
				{
					found = true;
					break;
				} 
			} 

			if(found)
				continue;

			for(var i in this.terraList)
			{
				var obj = this.terraList[i];
				if((obj.x == x) && (obj.y == y))
				{
					found = true;
					break;
				} 
			} 

			if(found)
				continue;

			return this.addObj(x , y, 0, 255, 0, true); 
		}
		return null;
	},
	removeObject : function(obj)
	{
		this.removeChild(obj.label); 
		this.removeChild(obj); 
		var idx = this.objList.indexOf(obj);
		if(idx > -1) 
			this.objList.splice(idx, 1);
		var idx = this.terraList.indexOf(obj);
		if(idx > -1) 
			this.terraList.splice(idx, 1);
	},
	checkOnTerra : function(x, y)
	{ 
		var rectHero = cc.rect(x - TILE_SIZE / 2, y - TILE_SIZE / 2, TILE_SIZE, TILE_SIZE); 

		for(var i in this.terraList)
		{
			var obj = this.terraList[i]; 
			if(cc.rectIntersectsRect(rectHero, obj.rect)) 
				return obj;
		}
		return true;
	},
	addObj : function(x, y, r, g, b, moveAble)
	{
		var spr = new cc.Sprite(res.blank_png);

		spr.setColor(cc.color(r, g, b));
		spr.setScale(TILE_SIZE, TILE_SIZE);
		spr.setPosition(cc.p(x,y));
		spr.ax = 0;
		spr.ay = 0;
		spr.stopped = true;
		spr.moveAble = moveAble;
		spr.moved = false;
		spr.num = 2;
		spr.type = 'enemy';

        spr.label = new cc.LabelTTF(spr.num, "Arial", 10);
		spr.label.x = spr.x;
		spr.label.y = spr.y;

		this.addChild(spr);
		this.objList.push(spr);
        this.addChild(spr.label, 5);
		var layer = this;

		if(moveAble)
		{
			spr.schedule(function()
			{
				if(!this.moveAble)
					return;

				if(this.stopped)
					return;

				this.moved = false;

				//create a rect to represent our green square
				var rectHero = cc.rect(this.x + this.ax - TILE_SIZE / 2,
						this.y + this.ay - TILE_SIZE / 2,
						TILE_SIZE, TILE_SIZE);

				var hit = false;
				var stopped = false;

				for(var i in layer.objList)
				{
					var spr2 = layer.objList[i];
					if(this == spr2)
						continue;
					var rectEnemy = cc.rect(spr2.getPositionX() - TILE_SIZE / 2,
							spr2.getPositionY() - TILE_SIZE / 2,
							TILE_SIZE, TILE_SIZE);

					if(cc.rectIntersectsRect(rectHero, rectEnemy)) 
					{
						if(spr2.stopped)
						{
							stopped = true;

							if(spr2.num == this.num && spr2.moveAble && spr2.type == this.type)
							{
								spr2.num = spr2.num * 2;
								spr2.label.setString(spr2.num);
								layer.removeObject(this);
								
								var scale = cc.ScaleTo.create(0.1, TILE_SIZE * 1.5, TILE_SIZE * 1.5);
								var scale2 = cc.ScaleTo.create(0.1, TILE_SIZE, TILE_SIZE);
								var seq = cc.Sequence.create(scale, scale2);
								spr2.runAction(seq);
							} 

							if((spr2.type == 'player' && spr.type == 'enemy') ||
								(spr.type == 'player' && spr2.type == 'enemy') )
							{
								var enemy = spr2.type == 'enemy' ? spr2 : spr;
								var player = spr2.type == 'player' ? spr2 : spr;

								layer.removeObject(enemy); 
							}

						}

						hit = true; 
					}

					if(hit)
						break;
				}

				if(stopped)
				{
					this.stopped = true;
	//				this.x = parseInt(this.x / 16) * 16;
	//				this.y = parseInt(this.y / 16) * 16;
				} 

				if(!hit)
				{
					var terra = layer.checkOnTerra(this.x + this.ax, this.y + this.ay);
					if(terra === true)
					{
						this.y += this.ay;
						this.x += this.ax; 
						this.moved = true;
					}
					else
					{
						if(terra.type == 'floor_down' && this.type == 'player')
						{
							layer.stageEnd = true;
						}

						if(this.type == 'player' && terra.hp > 0)
						{
							terra.hp -= 1;
							if(terra.hp == 0)
							{
								layer.removeChild(terra.label);
								layer.removeChild(terra);
								var idx = layer.terraList.indexOf(terra);
								if(idx > -1) 
									layer.terraList.splice(idx, 1);
							}
							else
							{
								if(terra.label)
									terra.label.setString(terra.hp);
							}
						}
						this.stopped = true;
					}
				}

				this.label.x = this.x;
				this.label.y = this.y;

			});
		}

		return spr;
	}, 
    ctor:function () { 
        //////////////////////////////
        // 1. super init first
        this._super();
		this.Init();

	},
	Init : function()
	{
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.stageEnd = false;

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        // add the label as a child to this layer


		var startX = 0;
		var startY = 0;

		var destroyList = this.terraList.slice(0);
		for(var i in destroyList)
			this.removeObject(destroyList[i]);

		var destroyList = this.objList.slice(0);
		for(var i in destroyList)
			this.removeObject(destroyList[i]);

		this.terraList = [];
		this.objList = [];
		destroyList = [];

		var map = this.generateStage();
		for(var i = 0; i < map.length;++i)
			for(var j = 0; j < map[i].length;++j)
			{
				var num = map[i][j];
				if(num == 1)
					continue;
				var spr = new cc.Sprite(res.blank_png);

				spr.setScale(TILE_SIZE, TILE_SIZE);
				spr.setPosition(cc.p(i * TILE_SIZE, j * TILE_SIZE));
				spr.hp = randomRange(1, 3);
//				spr.setColor(hpToColor(spr.hp));
				spr.setColor(cc.color(128,128,128));

				if(num == 2)
				{
					spr.setColor(cc.color(255,200,128));
					spr.type = "floor_down";
				}

				if(num == 3)
				{
					spr.setColor(cc.color(128,200,255));
					spr.type = "floor_up";
				}
				this.addChild(spr);
				this.terraList.push(spr);
			} 

		for(var i = 0; i < 12;++i)
		{
			var spr = new cc.Sprite(res.blank_png); 
			spr.setScale(TILE_SIZE, TILE_SIZE);
			spr.setPosition(cc.p(0, -TILE_SIZE + i * TILE_SIZE + TILE_SIZE)); 
			spr.hp = -1;
			spr.setColor(hpToColor(spr.hp));
			this.addChild(spr);
			this.terraList.push(spr);

			var spr = new cc.Sprite(res.blank_png); 
			spr.setColor(cc.color(128 + i * 10, 128 + j * 10, 128 ));
			spr.setScale(TILE_SIZE, TILE_SIZE);
			spr.setPosition(cc.p(TILE_SIZE * 11, -TILE_SIZE + i * TILE_SIZE + TILE_SIZE)); 
			spr.hp = -1;
			spr.setColor(hpToColor(spr.hp));
			this.addChild(spr);
			this.terraList.push(spr);

			var spr = new cc.Sprite(res.blank_png); 
			spr.setColor(cc.color(128 + i * 10, 128 + j * 10, 128 ));
			spr.setScale(TILE_SIZE, TILE_SIZE);
			spr.setPosition(cc.p(-TILE_SIZE + i * TILE_SIZE + TILE_SIZE, TILE_SIZE * 11)); 
			spr.hp = -1;
			spr.setColor(hpToColor(spr.hp));
			this.addChild(spr);
			this.terraList.push(spr);

			var spr = new cc.Sprite(res.blank_png); 
			spr.setColor(cc.color(128 + i * 10, 128 + j * 10, 128 ));
			spr.setScale(TILE_SIZE, TILE_SIZE);
			spr.setPosition(cc.p(-TILE_SIZE + i * TILE_SIZE + TILE_SIZE, -TILE_SIZE)); 
			spr.hp = -1;
			spr.setColor(hpToColor(spr.hp));
			this.addChild(spr);
			this.terraList.push(spr);
		}

		for(var i in this.terraList)
		{
			var obj = this.terraList[i];
			this.stageWidth = Math.max(this.stageWidth, obj.x + TILE_SIZE);
			this.stageHeight = Math.max(this.stageHeight, obj.y + TILE_SIZE);
		}

		this.stageStartX = (size.width  - this.stageWidth) / 2 + TILE_SIZE / 2; ;
		this.stageStartY = (size.height - this.stageHeight) / 2 + TILE_SIZE / 2;

		for(var i in this.terraList)
		{
			var obj = this.terraList[i];
			obj.x += this.stageStartX;
			obj.y += this.stageStartY;

			obj.rect = cc.rect(obj.getPositionX() - TILE_SIZE / 2,
								obj.getPositionY() - TILE_SIZE / 2,
								TILE_SIZE, TILE_SIZE);
			if(!obj.label)
				continue;
			obj.label.x = obj.x;
			obj.label.y = obj.y;
		};


		this.stageWidth += this.stageStartX;
		this.stageHeight += this.stageStartY; 

		this.GenerateNewObj();
		var player = this.GenerateNewObj();
		if(player !== null)
		{
			player.setColor(cc.color(255, 0, 0));
			console.log('type', player.type);
			player.type = 'player';
			console.log('player generated!');
		}

        return true; 
    },
});

var HelloWorldScene = cc.Scene.extend({
	prevMovedCnt : 0,
	helloLayer : null,
	onEnter:function()
	{
		cc.rectIntersectsRect = function (rectA, rectB) {
			return !(cc.rectGetMaxX(rectA) <= cc.rectGetMinX(rectB) ||
				cc.rectGetMaxX(rectB) <= cc.rectGetMinX(rectA) ||
				cc.rectGetMaxY(rectA) <= cc.rectGetMinY(rectB) ||
				cc.rectGetMaxY(rectB) <= cc.rectGetMinY(rectA));
		};

        this._super();
        var layer = new HelloWorldLayer();
		this.helloLayer = layer;
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
		for(var i in this.helloLayer.objList)
		{
			var obj = this.helloLayer.objList[i];
			if(obj.moved)
				return;
		}

		for(var i in this.helloLayer.objList)
		{
			var obj = this.helloLayer.objList[i];
			if(!obj.stopped)
				continue;

			if(!obj.moveAble)
				continue;

			obj.ax = ax;
			obj.ay = ay;
			obj.stopped = false;
			obj.moved = true;
		}
	},
	keyDown : function(keyCode)
	{ 
		switch(keyCode)
		{
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
		for(var i in this.helloLayer.objList)
		{
			var obj = this.helloLayer.objList[i];
			if(!obj.moveAble)
				continue;

			if(obj.moved)
				movedCnt++;
		}

		if(this.prevMovedCnt != movedCnt && movedCnt == 0)
		{
			this.helloLayer.GenerateNewObj();
		}
		this.prevMovedCnt = movedCnt;

		if(this.helloLayer.stageEnd == true)
		{
			this.helloLayer.Init(); 
		}
	} 
});

