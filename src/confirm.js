/* global randomRange */
var ConfirmLayer = cc.Layer.extend({
    background : null,
    label : null,
    btnYes : null,
    btnNo : null,
    ctor:function () { 
        //////////////////////////////
        // 1. super init first
        this._super();

        this.background = new cc.Sprite(res.blank_png);
		this.background.setColor(cc.color(0, 0, 0));
		this.background.setScale(cc.winSize.width, cc.winSize.height);
        this.background.setPosition(cc.p(0, 0));
        this.background.setOpacity(128); 
		this.background.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
		this.addChild(this.background);

		var self = this;
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function() {return self.isVisible(); } ,
			onTouchMoved: function() {return self.isVisible(); } ,
			onTouchEnded: function() {return self.isVisible(); } 
		}, this); 
        this.label = new cc.LabelTTF.create("", "Arial", 25, cc.size(cc.winSize.width, 80), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		this.label.setAnchorPoint(cc.p(0, 0));
        this.label.setString("가나다라마바사자차카타파하");
        this.label.setDimensions(cc.size(cc.winSize.width, 0));
        this.label.setDimensions(this.label.getContentSize());
        this.label.setPosition(cc.p(0, cc.winSize.height / 2));
		this.addChild(this.label);

		this.btnYes = ccui.Button.create(res.blank_png);
		this.btnYes.setPosition(cc.p(cc.winSize.width / 2 - 50, cc.winSize.height / 2));
		this.btnYes.setTitleText("yes");
		this.btnYes.setTitleColor(cc.color(0,0,0)); 
		this.btnYes.ignoreContentAdaptWithSize(false);
		this.btnYes.setContentSize(BTN_SIZE, BTN_SIZE);
		this.addChild(this.btnYes);

		this.btnNo = ccui.Button.create(res.blank_png);
		this.btnNo.setPosition(cc.p(cc.winSize.width / 2 + 50, cc.winSize.height / 2));
		this.btnNo.setTitleText("no");
		this.btnNo.setTitleColor(cc.color(0,0,0)); 
		this.btnNo.ignoreContentAdaptWithSize(false);
		this.btnNo.setContentSize(BTN_SIZE, BTN_SIZE);
		this.addChild(this.btnNo);

		this.setVisible(false);
	},  
	Confirm : function(text, funcYes, funcNo)
	{
		var self = this;
		this.label.setString(text);
        this.label.setDimensions(cc.size(cc.winSize.width, 0));
        this.label.setDimensions(this.label.getContentSize());
        this.label.setPosition(cc.p(0, cc.winSize.height / 2));

		var labelHeight = this.label.height;

		this.btnNo.setPosition(cc.p(cc.winSize.width / 2 + 50, cc.winSize.height / 2 - BTN_SIZE / 2));
		this.btnYes.setPosition(cc.p(cc.winSize.width / 2 - 50, cc.winSize.height / 2 - BTN_SIZE / 2));

		this.btnYes.addTouchEventListener(function(target, type) {if(type != ccui.Widget.TOUCH_ENDED) return; funcYes(); self.setVisible(false); }); 
		this.btnNo.addTouchEventListener(function(target, type) {if(type != ccui.Widget.TOUCH_ENDED) return;  funcNo(); self.setVisible(false); }); 
		this.setVisible(true);
	}
});
