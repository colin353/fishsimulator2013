viewcontroller = new ViewController
viewcontroller.loadImages 'spritesheet.png', 'overlay.png', 'npc.png', 'minimenu_top.png', 'minimenu_bottom.png'
viewcontroller.loadMap 'lecturehall'

viewcontroller.stack.push(new OverlayCanvasController('Hello, world!'))

document.viewcontroller = viewcontroller; 

tick = ->
	viewcontroller.tick()
	setTimeout tick, viewcontroller.timestep

tick()  