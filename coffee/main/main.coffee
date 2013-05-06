viewcontroller = new ViewController
viewcontroller.loadImages 'TankBackground.jpg' 

viewcontroller.stack.push(new FishTankCanvasController())
 
document.viewcontroller = viewcontroller;

$ -> 
	document.tools = [];
	document.tools['sponge'] = new SpongeTool('sponge3.png')
	document.tools['feed'] = new FeedTool('FishFood.png')
	document.tools['warm'] = new WarmTool('heattool.png')
	document.tools['cool'] = new CoolTool('icecube.png')
	document.tools['salt'] = new SaltTool('salt.png')
	document.tools['hand'] = new HandTool('hand.png')
	document.tools['siphon'] = new SiphonTool('siphon.png')
	document.tools['water'] = new WaterTool('water.png')
	document.tool = document.tools['hand'];

	document.buymenu = new BuyMenuController(); 

tick = ->
	viewcontroller.tick()

	setTimeout tick, viewcontroller.timestep  

tick()