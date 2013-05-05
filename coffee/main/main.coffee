viewcontroller = new ViewController
viewcontroller.loadImages 'TankBackground.jpg' 

viewcontroller.stack.push(new FishTankCanvasController())

document.viewcontroller = viewcontroller;

$ -> 
	document.tools = [];
	document.tools['sponge'] = new SpongeTool('sponge3.png')
	document.tool = document.tools['sponge'];

tick = ->
	viewcontroller.tick()

	setTimeout tick, viewcontroller.timestep 

tick()