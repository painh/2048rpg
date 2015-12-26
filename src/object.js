function GameObj(layer, x, y, type)
{
    if(isNumeric(type))
        type = objIDXToType(type);
    var objProto = g_objectTable[type];    
    
    this.layer = layer;
    this.type = type;
    
    this.ax = 0;
    this.ay = 0;
    this.stopped = true;
    this.moveAble = objProto.moveAble;
    this.moved = false;
    this.num = 2;
    this.hp = objProto.hp;
    
    var pos = cc.p(x,y);    

    this.sprite = new cc.Sprite(res.blank_png);
    this.sprite.setScale(TILE_SIZE, TILE_SIZE);
    this.sprite.setColor(objProto.color);

    this.label = new cc.LabelTTF(objProto.label, "Arial", 20);
    
    this.layer.addChild(this.sprite);
    this.layer.addChild(this.label);
    
    this.SetPos(x, y);
    this.SetVisible(objProto.visible);
}

GameObj.prototype = 
{
    SetVisible : function(visible)
    {
        this.sprite.setVisible(visible);
        this.label.setVisible(visible);        
    },
    Remove : function()
    {
		this.layer.removeChild(this.label); 
		this.layer.removeChild(this.sprite);        
    },
    SetPos : function(x, y)
    {
        var pos = cc.p(x,y);
        this.x = x;
        this.y = y;           
        this.sprite.setPosition(pos);
        this.label.setPosition(pos);
        this.rect = cc.rect(this.x - TILE_SIZE / 2,
                            this.y - TILE_SIZE / 2,
                            TILE_SIZE, TILE_SIZE);
        
    },
    Combined :function()
    {
        var scale = cc.ScaleTo.create(0.1, TILE_SIZE * 1.5, TILE_SIZE * 1.5);
        var scale2 = cc.ScaleTo.create(0.1, TILE_SIZE, TILE_SIZE);
        var seq = cc.Sequence.create(scale, scale2);
        this.num = this.num * 2;
        //this.label.setString(this.num);
        this.sprite.runAction(seq);    
        this.stopped = false;            
    },
    OnCollision : function()
    {
        switch(this.type)
        {
            case "j_deker":
                j_decker();
                break;    
            
        }
    }
    
};