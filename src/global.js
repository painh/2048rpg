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
var OBJECT_IDX_BACKTILE = 8;

var CURSOR_SIZE = 24;
var BTN_SIZE = 45;

var g_GUILayer;

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
        case OBJECT_IDX_BACKTILE : return "backtile";       
    }
    throw "invaild idx " + idx;
}

var g_objectTable =
{
    block : {isObject : false, label : "b", visible : true, moveAble : false, color : cc.color(0, 132, 180), hp : 1 },
    blank : {isObject : false, label : "", visible : true, moveAble : false, color : cc.color(0, 0, 0), hp : 1 },
    floor_down : {isObject : true, label : "d", visible : true, moveAble : false, color : cc.color(102, 117, 127), hp : 1 },
    floor_up : {isObject : true, label : "u", visible : true, moveAble : false, color : cc.color(235, 244, 251), hp : 1 },
    player : {isObject : true, label : "@", visible : true, moveAble : true, color : cc.color(119, 178, 85), hp : 1 },
    j_deker : {isObject : true, label : "J", visible : true, moveAble : false, color : cc.color(247, 232, 188), hp : 1 },
    enemy : {isObject : true, label : "E", visible : true, moveAble : true, color : cc.color(207, 79, 83), hp : 1 },
    unbreakable_block : {isObject : false, label : "#", visible : false, moveAble : false, color : cc.color(128, 128, 128), hp : -1 },
    backtile : {isObject : true, label : "", visible : true, moveAble : false, color : cc.color(128, 128, 128), hp : -1 },
};

function randomRange(min, max)
{
	return Math.floor((Math.random() * max) + min);	
};

function isNumeric(n) 
{
  return !isNaN(parseFloat(n)) && isFinite(n);
};

function isString(n)
{
    return typeof n === "string";
}

var g_colorTable =
{
    light_blue : [ cc.color(86, 123, 243), 
                    cc.color(89, 129, 253), 
                    cc.color(93, 127, 230), 
                    cc.color(89, 131, 253), 
                    cc.color(91, 130, 243) ],
    light_green : [ cc.color(121, 243, 180), 
                    cc.color(126, 253, 180), 
                    cc.color(126, 230, 165), 
                    cc.color(126, 253, 167), 
                    cc.color(126, 243, 157) ]
}

function getSimilarColor(colorName)
{
    var color = g_colorTable[colorName];
    return  color[randomRange(0, color.length - 1)];
}
