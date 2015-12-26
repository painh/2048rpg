/* global randomRange */
var MapLayer = cc.Layer.extend({
    stageName : "",
	objList:[], 
	terraList:[], 
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
	GenerateNewObj : function(type)
	{
		for(var j = 0; j < 10; ++j)
		{	
			var x = randomRange(0, 9) * TILE_SIZE;
			var y = randomRange(0, 9) * TILE_SIZE;
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

			return this.addObj(x , y, true, type); 
		}
		return null;
	},
	removeObject : function(obj)
	{
        obj.Remove();
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
	addObj : function(x, y, moveAble, type)
	{
        var obj = new GameObj(this, x, y, type);
		this.objList.push(obj);        
		return obj;
	},
    getObjByType : function(type)
    {
        var ret = [];
        
        for(var i in this.objList)
		{
			var obj = this.objList[i];
            if(obj.type == type)
                ret.push(obj);
        }
        
        return ret;    
    },
    ctor:function () { 
        //////////////////////////////
        // 1. super init first
        this._super();
		this.Init("town");

	},
	Init : function(stageName)
	{
        this.stageName = stageName;
		this.stageEnd = false;

		var destroyList = this.terraList.slice(0);
		for(var i in destroyList)
			this.removeObject(destroyList[i]);

		destroyList = this.objList.slice(0);
		for(var i in destroyList)
			this.removeObject(destroyList[i]);

		this.terraList = [];
		this.objList = [];
		destroyList = [];
        
        var map;        
        if(stageName in g_staticMaps)
            map = g_staticMaps[stageName];
        else
        	map = this.generateStage();
            
        var mapHeight = 10;
            
		for(var i = 0; i < 10;++i)
			for(var j = mapHeight - 1; j >= 0;--j)
			{
				var num = map[mapHeight - j - 1][i];
				if(num == 1)
					continue;
                    
                var type = objIDXToType(num);
                var obj = new GameObj(this, i * TILE_SIZE, j * TILE_SIZE, type);
                
                if(num == OBJECT_IDX_UNBREAKABLE_BLOCK)
                {
                    obj.sprite.setColor(getSimilarColor("light_blue"));
                    obj.SetVisible(true);
                }
                
                if(g_objectTable[type].isObject)
                    this.objList.push(obj);
                else                
				    this.terraList.push(obj);
			}

		for(var i = 0; i < 10;++i)
		{
            //left
            var obj; 
            obj = new GameObj(this, -TILE_SIZE, i * TILE_SIZE, OBJECT_IDX_UNBREAKABLE_BLOCK);
			this.terraList.push(obj);
            
            //right
            obj = new GameObj(this, TILE_SIZE * 10, i * TILE_SIZE, OBJECT_IDX_UNBREAKABLE_BLOCK);
			this.terraList.push(obj);

            //top
            obj = new GameObj(this, i * TILE_SIZE, TILE_SIZE * 10, OBJECT_IDX_UNBREAKABLE_BLOCK);
			this.terraList.push(obj);
            
            //bottom
            obj = new GameObj(this, i * TILE_SIZE, -TILE_SIZE, OBJECT_IDX_UNBREAKABLE_BLOCK);
			this.terraList.push(obj);
		}

        this.setPosition(cc.p(cc.winSize.width  / 2 - TILE_SIZE * 10 / 2 + TILE_SIZE / 2,
                        cc.winSize.height - TILE_SIZE * 10 + TILE_SIZE / 2));        
//                        cc.winSize.height / 2 - TILE_SIZE * 10 / 2 + TILE_SIZE / 2));

        if(this.getObjByType('player').length == 0)
            this.GenerateNewObj("player");
        
        return true; 
    },
});
