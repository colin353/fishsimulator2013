viewcontroller = new ViewController
viewcontroller.loadImages 'TankBackground.jpg' 

viewcontroller.stack.push(new FishTankCanvasController())

document.viewcontroller = viewcontroller;

tick = ->
	viewcontroller.tick()

	setTimeout tick, viewcontroller.timestep

tick()