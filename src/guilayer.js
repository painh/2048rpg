/* global randomRange */
var GuiLayer = cc.Layer.extend({
    label : null,
    label_background : null,
    label_cursor : null,    
    textList : [],
    SetText : function(text)
    {
        this.label.setString(text);
        this.label.setDimensions(cc.size(cc.winSize.width, 0));
        this.label.setDimensions(this.label.getContentSize());
        this.label.setPosition(cc.p(0, cc.winSize.height - this.label.height));
        
		this.label_background.setScale(cc.winSize.width, this.label.height);        
		this.label_background.setPosition(cc.p(this.label.width / 2, cc.winSize.height - this.label.height / 2));
        
        this.label_cursor.setPosition(cc.p(this.label.width - CURSOR_SIZE / 2, cc.winSize.height - this.label.height));
                
    },
    ShowTexts : function(visible)
    {
        this.label.setVisible(visible);
        this.label_background.setVisible(visible);
        this.label_cursor.setVisible(visible);        
    },
    ctor:function () { 
        //////////////////////////////
        // 1. super init first
        this._super();

        this.label = new cc.LabelTTF.create("", "Arial", 32, cc.size(cc.winSize.width, 80), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
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
        
        this.addChild(this.label_background);
        this.addChild(this.label);        
        this.addChild(this.label_cursor);
         
        var action1 = cc.fadeIn(1.0); 
        var action1Back = action1.reverse();
        var repeatForever = cc.RepeatForever.create(cc.sequence(action1Back, action1));            
        this.label_cursor.runAction(repeatForever);
        
        
        this.SetText("가나다라마바사자차카타파하1234");
        
        this.ShowTexts(false);
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
    }
});
