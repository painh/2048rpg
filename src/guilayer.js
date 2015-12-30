/* global randomRange */
var GuiLayer = cc.Layer.extend({
    label : null,
    label_background : null,
    label_cursor : null,    
	widget_text : null,
	widget_mainbtn : null,
	widget_inven : null,
	widget_equip : null,
	widget_alert : null,
    textList : [],
	invenBtns : [],
	selectedBtn : null,
	itemDesc_name : null,
	itemDesc_equipPos : null,
	alert_label : null,
	alert_background : null, 
	label_pickaxCnt : null,
	label_hp : null,
	equipBtns : {},
	equpDescText : function(y, label, txt)
	{
        label.setString(txt);
        label.setDimensions(cc.size(0, 0));
        label.setDimensions(label.getContentSize());
        label.setPosition(cc.p(cc.winSize.width / 4 -  label.width / 2, cc.winSize.height /2 - y));
		return y + label.height;
	},
	SetItemDesc : function(item)
	{ 
		var y = this.itemDesc_name.height;
		y = this.equpDescText(y, this.itemDesc_name, item.name);
		y = this.equpDescText(y, this.itemDesc_equipPos, item.equipPos);

	},
    SetText : function(text)
    {
        this.label.setString(text);
        this.label.setDimensions(cc.size(cc.winSize.width, 0));
        this.label.setDimensions(this.label.getContentSize());
        this.label.setPosition(cc.p(0, cc.winSize.height / 2 - this.label.height / 2));
        
		this.label_background.setScale(cc.winSize.width, this.label.height);        
		this.label_background.setPosition(cc.p(this.label.width / 2, cc.winSize.height / 2));
        
        this.label_cursor.setPosition(cc.p(this.label.width - CURSOR_SIZE / 2, cc.winSize.height / 2 - this.label.height / 2));
                
    },
    ShowTexts : function(visible)
    {
		this.widget_text.setVisible(visible);
		if(visible)
		{
			this.widget_mainbtn.setVisible(false);
			this.widget_inven.setVisible(false);
			this.widget_equip.setVisible(false);
		}
		else
		{
			this.widget_mainbtn.setVisible(true);
			this.widget_inven.setVisible(false);
			this.widget_equip.setVisible(false);
		}
    },
	ShowController : function(visible)
	{ 
		console.log("show controller");
		this.widget_mainbtn.setVisible(visible);
		this.widget_inven.setVisible(!visible);
		this.widget_equip.setVisible(!visible);
		this.widget_text.setVisible(!visible);
	},
	ShowInven : function(visible)
	{ 
		this.widget_inven.setVisible(visible);
		this.widget_equip.setVisible(visible);
		this.widget_mainbtn.setVisible(!visible); 

		if(!visible)
		{
//			this.selectedBtn.
		}

		this.RefreshInven(); 
		this.RefreshEquip();
	},
    ctor:function (keyInputPatcher) { 
        //////////////////////////////
        // 1. super init first
        this._super();

        //this.SetText("");
        
//         var scrollView  = new ccui.ScrollView();
//         scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
//         scrollView.setPosition(cc.p(0, cc.winSize.height));
//         this.addChild(scrollView);
        
//         this.label = new cc.LabelTTF.create("", "Arial", 32, cc.size(cc.winSize), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
// //		this.label.setAnchorPoint(cc.p(0, 0));
// //        this.label.setPosition(cc.p(0,0));
//         this.label.setString("가나다라마바사자차카타파하가나다라마바사자차카타파하가나다라마바사자차카타파하가나다라마바사자차카타파하가나다라마바사자차카타파하가나다라마바사자차카타파하가나다라마바사자차카타파하가나다라마바사자차카타파하가나다라마바사자차카타파하가나다라마바사자차카타파하가나다라마바사자차카타파하");
//         this.label.setDimensions(cc.size(cc.winSize.width, 0));
//         this.label.setDimensions(this.label.getContentSize());
                
//         scrollView.addChild(this.label);        


		this.widget_mainbtn = new ccui.Widget();
		this.addChild(this.widget_mainbtn);

		this.widget_text = new ccui.Widget();
		this.addChild(this.widget_text);

		this.widget_inven = new ccui.Widget();
		this.addChild(this.widget_inven);

		this.widget_equip = new ccui.Widget();
		this.addChild(this.widget_equip);

		this.widget_alert = new ccui.Widget();
		this.addChild(this.widget_alert);

		this.ShowController(true);

		var self = this;
		var btn;
		var cx = 70;
		var cy = 80;
		//up
		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p(cx, cy + BTN_SIZE));
		btn.setTitleText("up");
		btn.setTitleColor(cc.color(0,0,0)); 
		btn.ignoreContentAdaptWithSize(false);
		btn.setContentSize(BTN_SIZE, BTN_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) keyInputPatcher.keyDown(cc.KEY.up)}); 
		this.widget_mainbtn.addChild(btn);
		//down
		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p(cx, cy - BTN_SIZE));
		btn.setTitleText("down");
		btn.setTitleColor(cc.color(0,0,0));
		btn.ignoreContentAdaptWithSize(false);
		btn.setContentSize(BTN_SIZE, BTN_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) keyInputPatcher.keyDown(cc.KEY.down)}); 
		this.widget_mainbtn.addChild(btn);
		//
		//left
		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p(cx - BTN_SIZE, cy));
		btn.setTitleText("left");
		btn.setTitleColor(cc.color(0,0,0));
		btn.ignoreContentAdaptWithSize(false);
		btn.setContentSize(BTN_SIZE, BTN_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) keyInputPatcher.keyDown(cc.KEY.left)}); 
		this.widget_mainbtn.addChild(btn);
		//
		//right
		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p(cx + BTN_SIZE, cy));
		btn.setTitleText("right");
		btn.setTitleColor(cc.color(0,0,0));
		btn.ignoreContentAdaptWithSize(false);
		btn.setContentSize(BTN_SIZE, BTN_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) keyInputPatcher.keyDown(cc.KEY.right)}); 
		this.widget_mainbtn.addChild(btn);

		//portal
		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p(cc.winSize.width - BTN_SIZE, cy));
		btn.setTitleText("portal");
		btn.setTitleColor(cc.color(0,0,0));
		btn.ignoreContentAdaptWithSize(false);
		btn.setContentSize(BTN_SIZE, BTN_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type !== ccui.Widget.TOUCH_ENDED) return; confirm("정말 마을로 돌아갈까요?", function() {g_PlayScene.Portal();}, function(){});}); 
		this.widget_mainbtn.addChild(btn);
		//
		//inven
		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p(cc.winSize.width - BTN_SIZE * 2, cy - BTN_SIZE));
		btn.setTitleText("inven");
		btn.setTitleColor(cc.color(0,0,0));
		btn.ignoreContentAdaptWithSize(false);
		btn.setContentSize(BTN_SIZE, BTN_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) self.ShowInven(true); }); 
		this.widget_mainbtn.addChild(btn);
		//pickax label
        this.label_pickaxCnt = new cc.LabelTTF.create("", "Arial", 10, cc.size(cc.winSize.width, 80), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.label_pickaxCnt.setString("");
        this.label_pickaxCnt.setPosition(cc.p(cc.winSize.width / 2, cy));
		this.widget_mainbtn.addChild(this.label_pickaxCnt);
		//hp label
        this.label_hp = new cc.LabelTTF.create("", "Arial", 10, cc.size(cc.winSize.width, 80), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.label_hp.setString("");
        this.label_hp.setPosition(cc.p(cc.winSize.width / 2, cy + 10));
		this.widget_mainbtn.addChild(this.label_hp);


		//text
        this.label = new cc.LabelTTF.create("", "Arial", 25, cc.size(cc.winSize.width, 80), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
		this.label.setAnchorPoint(cc.p(0, 0));
        this.label.setString("가나다라마바사자차카타파하");
        this.label.setDimensions(cc.size(cc.winSize.width, 0));
        this.label.setDimensions(this.label.getContentSize());
        this.label.setPosition(cc.p(0, cc.winSize.height - this.label.height));
      

        this.label_background = new cc.Sprite(res.blank_png);
		this.label_background.setColor(cc.color(0, 0, 0));
        this.label_background.setOpacity(128);
        
        
        this.label_cursor = new cc.Sprite(res.blank_png);
        this.label_cursor.setColor(cc.color(255, 255, 255));
        this.label_cursor.setScale(CURSOR_SIZE, CURSOR_SIZE);
        this.label_cursor.setScale(CURSOR_SIZE, CURSOR_SIZE);
        

        this.widget_text.addChild(this.label_background);
        this.widget_text.addChild(this.label);        
        this.widget_text.addChild(this.label_cursor);
         
        var action1 = cc.fadeIn(1.0); 
        var action1Back = action1.reverse();
        var repeatForever = cc.RepeatForever.create(cc.sequence(action1Back, action1));            
        this.label_cursor.runAction(repeatForever);
        
        
        this.SetText("가나다라마바사자차카타파하1234");
        
		//-----------------
		//inventory
		var startX = cc.winSize.width - TILE_SIZE * 4 - TILE_SIZE / 2;
		var startY = cc.winSize.height / 2 - TILE_SIZE * 2;
		var margin = 3;
		var size = TILE_SIZE + margin;

        var spr = new cc.Sprite(res.blank_png);
		var height = cc.winSize.height / 2;
		spr.setColor(cc.color(0, 0, 0));
        spr.setOpacity(128);
		spr.setScale(cc.winSize.width, height);
		spr.setPosition(cc.p(cc.winSize.width / 2, height / 2)); 
		this.widget_inven.addChild(spr);

		for(var i = 0; i < 20;++i)
		{
			btn = ccui.Button.create(res.blank_png);
			var x = i % 4;
			var y = parseInt(i / 4);
			btn.setPosition(cc.p(startX + x * size + size / 2, startY - size * y + size/2));
			btn.setTitleText("i_"+i);
			btn.ignoreContentAdaptWithSize(false);
			btn.setTitleColor(cc.color(0,0,0));
			btn.setContentSize(TILE_SIZE, TILE_SIZE);
			btn.idx = i;
			btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) self.itemSelected(this); }); 
			this.widget_inven.addChild(btn);
			this.invenBtns.push(btn);
		} 

		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p(299, 16));
		btn.setTitleText("close");
		btn.ignoreContentAdaptWithSize(false);
		btn.setTitleColor(cc.color(0,0,0));
		btn.setContentSize(TILE_SIZE, TILE_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) self.ShowInven(false); }); 
		this.widget_inven.addChild(btn);

		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p(194, 16));
		btn.setTitleText("equip");
		btn.ignoreContentAdaptWithSize(false);
		btn.setTitleColor(cc.color(0,0,0));
		btn.setContentSize(TILE_SIZE, TILE_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) self.Equip(); }); 
		this.widget_inven.addChild(btn);

		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p(194 + size, 16));
		btn.setTitleText("drop");
		btn.ignoreContentAdaptWithSize(false);
		btn.setTitleColor(cc.color(0,0,0));
		btn.setContentSize(TILE_SIZE, TILE_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) self.DropItem(); }); 
		this.widget_inven.addChild(btn);
		
        this.itemDesc_name = new cc.LabelTTF.create("", "Arial", 20, cc.size(cc.winSize.width, 80), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
		this.itemDesc_name.setAnchorPoint(cc.p(0, 0)); 
        this.itemDesc_name.setString("가나다라");
        this.itemDesc_name.setDimensions(cc.size(0, 0));
        this.itemDesc_name.setDimensions(this.itemDesc_name.getContentSize());
		this.widget_inven.addChild(this.itemDesc_name);

        this.itemDesc_equipPos = new cc.LabelTTF.create("", "Arial", 20, cc.size(cc.winSize.width, 80), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
		this.itemDesc_equipPos.setAnchorPoint(cc.p(0, 0)); 
		this.widget_inven.addChild(this.itemDesc_equipPos);

		//----------------------
		//equip

        var spr = new cc.Sprite(res.blank_png);
		startX = cc.winSize.width / 4 * 3;
		startY = cc.winSize.height / 4 * 3;
		spr.setColor(cc.color(0, 0, 0));
        spr.setOpacity(128);
		spr.setScale(cc.winSize.width / 2, cc.winSize.height / 2);
		spr.setPosition(cc.p(startX, startY)); 
		this.widget_equip.addChild(spr);

        var spr = new cc.Sprite(res.equip_png);
		spr.setPosition(cc.p(startX, startY)); 
		this.widget_equip.addChild(spr);

		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p(238, 444));
		btn.ignoreContentAdaptWithSize(false);
		btn.setTitleColor(cc.color(255, 255, 255));
		btn.setColor(cc.color(128, 128, 128));
		btn.setContentSize(TILE_SIZE, TILE_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) self.ShowInven(false); }); 
		btn.equipPart = "머리";
		btn.setTitleText(btn.equipPart);
		this.equipBtns[btn.equipPart] = btn;
		this.widget_equip.addChild(btn);

		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p(187, 365));
		btn.equipPart = "무기";
		btn.setTitleText(btn.equipPart);
		btn.ignoreContentAdaptWithSize(false);
		btn.setTitleColor(cc.color(255, 255, 255));
		btn.setColor(cc.color(128, 128, 128));
		btn.setContentSize(TILE_SIZE, TILE_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) self.ShowInven(false); }); 
		this.equipBtns[btn.equipPart] = btn;
		this.widget_equip.addChild(btn);

		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p( 238, 394 ));
		btn.setTitleText("armor");
		btn.ignoreContentAdaptWithSize(false);
		btn.setTitleColor(cc.color(255, 255, 255));
		btn.setColor(cc.color(128, 128, 128));
		btn.setContentSize(TILE_SIZE, TILE_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) self.ShowInven(false); }); 
		btn.equipPart = "갑옷";
		btn.setTitleText(btn.equipPart);
		this.equipBtns[btn.equipPart] = btn;
		this.widget_equip.addChild(btn);

		btn = ccui.Button.create(res.blank_png);
		btn.setPosition(cc.p( 229, 270 ));
		btn.setTitleText("shoes");
		btn.ignoreContentAdaptWithSize(false);
		btn.setTitleColor(cc.color(255, 255, 255));
		btn.setColor(cc.color(128, 128, 128));
		btn.setContentSize(TILE_SIZE, TILE_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) self.ShowInven(false); }); 
		btn.equipPart = "신발";
		btn.setTitleText(btn.equipPart);
		this.equipBtns[btn.equipPart] = btn;
		this.widget_equip.addChild(btn); 


		// alert
        this.alert_background = new cc.Sprite(res.blank_png);
		this.alert_background.setColor(cc.color(0, 0, 0));
        this.alert_background.setOpacity(128);
		this.widget_alert.addChild(this.alert_background); 

        this.alert_label = new cc.LabelTTF.create("", "Arial", 25, cc.size(cc.winSize.width, 80), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
		this.alert_label.setAnchorPoint(cc.p(0, 0));
        this.alert_label.setString("가나다라마바사자차카타파하");
        this.alert_label.setDimensions(cc.size(cc.winSize.width, 0));
        this.alert_label.setDimensions(this.label.getContentSize());
        this.alert_label.setPosition(cc.p(0, cc.winSize.height - this.label.height));
		this.widget_alert.addChild(this.alert_label); 

        this.alert_label.setPosition(cc.p(0, cc.winSize.height));
		this.alert_background.setPosition(cc.p(this.alert_label.width / 2, cc.winSize.height + this.alert_label.height/2));
	},  
	Alert : function(text)
	{
        this.alert_label.setString(text);
        this.alert_label.setDimensions(cc.size(cc.winSize.width, 0));
        this.alert_label.setDimensions(this.alert_label.getContentSize());
        this.alert_label.setPosition(cc.p(0, cc.winSize.height));
        
		this.alert_background.setScale(cc.winSize.width, this.alert_label.height);        
		this.alert_background.setPosition(cc.p(this.alert_label.width / 2, cc.winSize.height + this.alert_label.height/2));

		this.widget_alert.stopAllActions();
		this.widget_alert.setPosition(cc.p(0, 0) );
        var action1 = cc.MoveTo.create(0.1, cc.p(0, -this.alert_label.height));
        var delay = cc.delayTime(1);
//        var action1Back = action1.reverse();
        var action2 = cc.MoveTo.create(0.1, cc.p(0, 0));
		this.widget_alert.runAction(cc.sequence(action1, delay, action2));
	},
	itemSelected : function(btn)
	{
		if(this.selectedBtn)
		{
			if(this.selectedBtn == btn)
				return;

			this.selectedBtn.stopAllActions(); 
			this.selectedBtn.setOpacity(255);
			this.selectedBtn = null;
		}

		if(!(btn.idx in Inventory.itemList))
		{
			this.Alert("비어 있는 슬롯입니다.");
			return;
		} 

		this.selectedBtn = btn;
        var action1 = cc.fadeIn(1.0); 
        var action1Back = action1.reverse();
        var repeatForever = cc.RepeatForever.create(cc.sequence(action1Back, action1));            
        btn.runAction(repeatForever);

		var item = Inventory.itemList[btn.idx];
		this.SetItemDesc(item);
	},
    Actived : function()
    {
        return this.textList.length != 0;
    },  
    AddText : function(text)
    {
        this.textList.push(text);
        this.ShowTexts(true);
        if(this.textList.length == 1)
            this.SetText(text);
    },
    Next : function()
    {
        this.textList.shift();
        if(this.textList.length == 0)               
        {
            this.ShowTexts(false);
            return;            
        }
		this.SetText(this.textList[0]);
    },
	DropItem : function()
	{
		if(!this.selectedBtn)
		{
			alert("아이템이 선택 되어 있지 않습니다. 이 버튼은 아이템을 영구적으로 버립니다.");
			return;
		}
		var idx = this.selectedBtn.idx;
		var item = Inventory.itemList[idx];
		var self = this;
		confirm("정말로 [" + item.name + "] 을 버릴까요?", function() { Inventory.Drop(idx); self.RefreshInven(); }, function() {});
	},
	RefreshInven : function()
	{
		this.selectedBtn = null;
		for(var i in this.invenBtns)
		{
			var btn = this.invenBtns[i];
			btn.setTitleText("");
			btn.setColor(cc.color(128, 128, 128));
			btn.stopAllActions();
			btn.setOpacity(255);
		}

		for(var i in Inventory.itemList)
		{
			var item = Inventory.itemList[i];
			var btn = this.invenBtns[i];
			btn.setColor(item.color);
			btn.setTitleText(item.label);
		}
	},
	RefreshEquip : function()
	{
		for(var i in this.equipBtns)
		{
			var btn = this.equipBtns[i];
			btn.setColor(Player.equip[btn.equipPart].color);
			btn.setTitleText(Player.equip[btn.equipPart].label);

		}
	},
	RefreshPlayerStat : function()
	{
        this.label_hp.setString("hp : " + Player.hp);
        this.label_pickaxCnt.setString("곡괭이 : " + Player.pickaxCnt);
//        this.label_pickaxCnt.setPosition(cc.p(cc.winSize.width / 2, cy));
	},
	Equip : function()
	{
		if(!this.selectedBtn)
		{
			alert("아이템이 선택 되어 있지 않습니다. 이 버튼은 아이템을 장착합니다.");
			return;
		}

		var idx = this.selectedBtn.idx;
		var item = Inventory.itemList[idx];

		if(item.equipPos == "장착불가")
		{
			alert("장착이 불가능한 아이템입니다.");
			return;
		} 

		Player.Equip(idx);
		this.RefreshInven();
		this.RefreshEquip();
	} 
});
