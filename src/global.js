var TILE_SIZE = 32;
var MOVE_STEP = 8;

var OBJECT_IDX_BLOCK = 0;
var OBJECT_IDX_BLANK = 1;
var OBJECT_IDX_FLOOR_DOWN = 2;
var OBJECT_IDX_FLOOR_UP = 3;
var OBJECT_IDX_PLAYER = 4;
var OBJECT_IDX_J_DEKER = 5;
var OBJECT_IDX_ENEMY = 6;
var OBJECT_IDX_UNBREAKABLE_BLOCK = 7;

var CURSOR_SIZE = 16;

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
        case OBJECT_IDX_UNBREAKABLE_BLOCK : return "unbreakable_block";       
    }
    throw "invaild idx " + idx;
}

var g_objectTable =
{
    block : {moveAble : false, color : cc.color(0, 132, 180), hp : 1 },
    blank : {moveAble : false, color : cc.color(0, 0, 0), hp : 1 },
    floor_down : {moveAble : false, color : cc.color(102, 117, 127), hp : 1 },
    floor_up : {moveAble : false, color : cc.color(235, 244, 251), hp : 1 },
    player : {moveAble : true, color : cc.color(119, 178, 85), hp : 1 },
    j_deker : {moveAble : false, color : cc.color(247, 232, 188), hp : 1 },
    enemy : {moveAble : true, color : cc.color(207, 79, 83), hp : 1 },
    unbreakable_block : {moveAble : false, color : cc.color(128, 128, 128), hp : -1 },
};

function randomRange(min, max)
{
	return Math.floor((Math.random() * max) + min);	
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};