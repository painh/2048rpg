/* global randomRange */
var GuiLayer = cc.Layer.extend({
    label : null,
    label_background : null,
    label_cursor : null,    
	widget_text : null,
	widget_mainbtn : null,
	widget_inven : null,
    textList : [],
	invenBtns : [],
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
    },
	ShowController : function(visible)
	{ 
		this.widget_mainbtn.setVisible(visible);
		this.widget_inven.setVisible(!visible);
	},
	ShowInven : function(visible)
	{ 
		this.widget_inven.setVisible(visible);
		this.widget_mainbtn.setVisible(!visible); 
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

		var self = this;
		var btn;
		var cx = 70;
		var cy = 80;
		//up
		btn = ccui.Button.create(res.button_normal_png, res.button_press_png, res.button_disable_png);
		btn.setPosition(cc.p(cx, cy + BTN_SIZE));
		btn.setTitleText("up");
		btn.setTitleColor(cc.color(0,0,0));
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) keyInputPatcher.keyDown(cc.KEY.up)}); 
		this.widget_mainbtn.addChild(btn);
		//down
		btn = ccui.Button.create(res.button_normal_png, res.button_press_png, res.button_disable_png);
		btn.setPosition(cc.p(cx, cy - BTN_SIZE));
		btn.setTitleText("down");
		btn.setTitleColor(cc.color(0,0,0));
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) keyInputPatcher.keyDown(cc.KEY.down)}); 
		this.widget_mainbtn.addChild(btn);
		//
		//left
		btn = ccui.Button.create(res.button_normal_png, res.button_press_png, res.button_disable_png);
		btn.setPosition(cc.p(cx - BTN_SIZE, cy));
		btn.setTitleText("left");
		btn.setTitleColor(cc.color(0,0,0));
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) keyInputPatcher.keyDown(cc.KEY.left)}); 
		this.widget_mainbtn.addChild(btn);
		//
		//right
		btn = ccui.Button.create(res.button_normal_png, res.button_press_png, res.button_disable_png);
		btn.setPosition(cc.p(cx + BTN_SIZE, cy));
		btn.setTitleText("right");
		btn.setTitleColor(cc.color(0,0,0));
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) keyInputPatcher.keyDown(cc.KEY.right)}); 
		this.widget_mainbtn.addChild(btn);

		//inven
		btn = ccui.Button.create(res.button_normal_png, res.button_press_png, res.button_disable_png);
		btn.setPosition(cc.p(cc.winSize.width - BTN_SIZE * 2, cy - BTN_SIZE));
		btn.setTitleText("inven");
		btn.setTitleColor(cc.color(0,0,0));
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) self.ShowInven(true); }); 
		this.widget_mainbtn.addChild(btn);

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
        
        this.ShowTexts(false);
		this.ShowController(false);


		//-----------------
		//inventory
		var startX = cc.winSize.width - TILE_SIZE * 4 - TILE_SIZE / 2;
		var startY = cc.winSize.height / 2 - TILE_SIZE / 2;
		var margin = 3;
		var size = TILE_SIZE + margin;

        var spr = new cc.Sprite(res.blank_png);
		var height = cc.winSize.height - startY;
		spr.setColor(cc.color(0, 0, 0));
        spr.setOpacity(128);
		spr.setScale(cc.winSize.width, height);
		spr.setPosition(cc.p(cc.winSize.width / 2, height / 2)); 
		this.widget_inven.addChild(spr);

		for(var i = 0; i < 24;++i)
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
		} 

		btn = ccui.Button.create(res.blank_png);
		var x = 26 % 4;
		var y = parseInt(26 / 4);
		btn.setPosition(cc.p(startX + x * size + size / 2, startY - size * y + size/2));
		btn.setTitleText("close");
		btn.ignoreContentAdaptWithSize(false);
		btn.setTitleColor(cc.color(0,0,0));
		btn.setContentSize(TILE_SIZE * 2, TILE_SIZE);
		btn.addTouchEventListener(function(target, type) {if(type == ccui.Widget.TOUCH_ENDED) self.ShowInven(false); }); 
		this.widget_inven.addChild(btn);

	},  
	itemSelected : function(btn)
	{
		console.log(btn, btn.idx);
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
    }
});
