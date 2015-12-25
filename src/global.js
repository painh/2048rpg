var TILE_SIZE = 32;
var MOVE_STEP = 8;

var OBJECT_IDX_BLOCK = 0;
var OBJECT_IDX_BLANK = 1;
var OBJECT_IDX_FLOOR_DOWN = 2;
var OBJECT_IDX_FLOOR_UP = 3;
var OBJECT_IDX_PLAYER = 4;
var OBJECT_IDX_J_DEKER = 5;
var OBJECT_IDX_ENEMY = 6;

function objIDXToType(idx)
{
    switch(idx)
	{
		case OBJECT_IDX_BLOCK : return "block";
        case OBJECT_IDX_BLANK : return "blank";
        case OBJECT_IDX_FLOOR_DOWN : return "floor_down";
        case OBJECT_IDX_FLOOR_UP : return "floor_up";
        case OBJECT_IDX_PLAYER : return "player";
        case OBJECT_IDX_J_DEKER : return "j_deker";
        case OBJECT_IDX_ENEMY : return "enemy";           
    }
    throw "invaild idx";
}

function objToColor(val)
{
    switch(val)
    {
        case OBJECT_IDX_BLOCK:
        case "block":
            return cc.color(0, 132, 180);
            break;
            
        case OBJECT_IDX_BLANK:
        case "blank":
            return cc.color(0, 0, 0);
            break;
            
        case OBJECT_IDX_FLOOR_DOWN:
        case "floor_down":
            return cc.color(102, 117, 127);
            break;
            
        case OBJECT_IDX_FLOOR_UP:
        case "floor_up":
            return cc.color(235, 244, 251);
            break;
            
        case OBJECT_IDX_PLAYER:
        case "player":
            return cc.color(119, 178, 85);
            break;

        case OBJECT_IDX_J_DEKER:
        case "j_deker":
            return cc.color(247, 232, 188);
            break;
            
        case OBJECT_IDX_ENEMY:
        case "enemy":
            return cc.color(207, 79, 83);
            break;

    }
    
    throw "invaild val";
}

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