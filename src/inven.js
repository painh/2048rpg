var Inventory =
{
	itemList : [],
	AddItem : function(item)
	{
		Inventory.itemList.push(item); 
	},
	Drop : function(idx)
	{
		Inventory.itemList.splice(idx, 1);
	}
};
