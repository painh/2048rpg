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

