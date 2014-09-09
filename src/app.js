
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );

        //首先要load plugin
        agent.loadALLPlugin();

        //获取各个插件
        var user_plugin  = agent.getUserPlugin();    //用户系统
        var iap_plugins   = agent.getIAPPlugin();    //支付系统
        var share_plugin = agent.getSharePlugin();    //分享系统
        var ads_plugin   = agent.getAdsPlugin();    //广告系统
        var social_plugin = agent.getSocialPlugin();    //社交系统
        var push_plugin  = agent.getPushPlugin();    //推送系统

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);

        //初始化 anysdk
        var appKey = "CED525C0-8D41-F514-96D8-90092EB3899A";
        var appSecret = "a29b4f22aa63b8274f7f6e2dd5893d9b";
        var privateKey = "963C4B4DA71BC51C69EB11D24D0C7D49";
        var oauthLoginServer = "http://oauth.qudao.info/api/OauthLoginDemo/Login.php";
        var agent = anysdk.AgentManager.getInstance();
        agent.init(appKey,appSecret,privateKey,oauthLoginServer);
    }
});

