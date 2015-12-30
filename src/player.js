var Player = 
{
	ap : 0,
	hp : 0,
	money : 0,
	pixaxCnt : 0,
	equip : [] 
};

for(var i = 0; i < EQUIP_IDX_MAX; ++i)
	Player.equip[i] = {label : "", color : cc.color(128, 128, 128) };

