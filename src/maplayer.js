/* global randomRange */
var MapLayer = cc.Layer.extend({
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
        this.addChild(spr.label);        
		return spr;
	}, 
    ctor:function () { 
        //////////////////////////////
        // 1. super init first
        this._super();
		this.Init("town");

	},
	Init : function(stageName)
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
        
        if(stageName in g_staticMaps)
            var map = g_staticMaps[stageName];
        else
        	var map = this.generateStage();
            
            
        var mapHeight = 10;
            
		for(var i = 0; i < 10;++i)
			for(var j = mapHeight - 1; j >= 0;--j)
			{
				var num = map[mapHeight - j - 1][i];
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

		for(var i = 0; i < 10;++i)
		{
            //left
			var spr = new cc.Sprite(res.blank_png); 
			spr.setScale(TILE_SIZE, TILE_SIZE);
			spr.setPosition(cc.p(-TILE_SIZE, i * TILE_SIZE)); 
			spr.hp = -1;
			spr.setColor(hpToColor(spr.hp));
			this.addChild(spr);
			this.terraList.push(spr);

            //right
			var spr = new cc.Sprite(res.blank_png); 
			spr.setColor(cc.color(128 + i * 10, 128 + j * 10, 128 ));
			spr.setScale(TILE_SIZE, TILE_SIZE);
			spr.setPosition(cc.p(TILE_SIZE * 10, i * TILE_SIZE)); 
			spr.hp = -1;
			spr.setColor(hpToColor(spr.hp));
			this.addChild(spr);
			this.terraList.push(spr);

            //top
			var spr = new cc.Sprite(res.blank_png); 
			spr.setColor(cc.color(128 + i * 10, 128 + j * 10, 128 ));
			spr.setScale(TILE_SIZE, TILE_SIZE);
			spr.setPosition(cc.p(i * TILE_SIZE, TILE_SIZE * 10)); 
			spr.hp = -1;
			spr.setColor(hpToColor(spr.hp));
			this.addChild(spr);
			this.terraList.push(spr);
            
            //bottom
			var spr = new cc.Sprite(res.blank_png); 
			spr.setColor(cc.color(128 + i * 10, 128 + j * 10, 128 ));
			spr.setScale(TILE_SIZE, TILE_SIZE);
			spr.setPosition(cc.p(i * TILE_SIZE, -TILE_SIZE)); 
			spr.hp = -1;
			spr.setColor(hpToColor(spr.hp));
			this.addChild(spr);
			this.terraList.push(spr);
		}
        
        this.setPosition(cc.p(cc.winSize.width  / 2 - TILE_SIZE * 10 / 2 + TILE_SIZE / 2,
                        cc.winSize.height / 2 - TILE_SIZE * 10 / 2 + TILE_SIZE / 2));

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
