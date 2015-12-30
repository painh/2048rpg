var Player = 
{
	ap : 0,
	hp : 10,
	money : 0,
	pickaxCnt : 10,
	equip : {},
	Init : function()
	{
		for(var i in g_equipPartList)
		{
			var key = g_equipPartList[i];
			Player.equip[key] = {label : "", color : cc.color(128, 128, 128) };
		}

	},
	UnequipItem : function(idx, item)
	{
		Inventory.itemList[idx] = item;
		Player.equip[item.equipPos] = {label : "", color : cc.color(128, 128, 128) };		Player.equip[item.equipPos].color = cc.color(128, 128, 128); 
	},
	Equip : function(invenIDX)
	{
		var item = Inventory.itemList[invenIDX];
		var unequipItem = -1;
		var equipedItem = -1;
		if(item.equipPos in Player.equip && Player.equip[item.equipPos].label != "")
		{
			unequipItem = Player.equip[item.equipPos];
			Player.UnequipItem(invenIDX, unequipItem);
		}
		else
			Inventory.itemList.splice(invenIDX, 1);

		Player.equip[item.equipPos] = item; 
	}
}; 
