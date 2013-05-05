# The Overlay

class WarmTool
	constructor: (image) ->
		@image = image;  
		viewcontroller.loadImages image if image?

	click: ->
		yes

	hold: ->
		viewcontroller.renderSprite(@image,0,0,1.2) if image? # At mouse coordinates?
		document.tank.temperature += 0.2;


class SpongeTool
	constructor: (image) ->
		@image = image;  
		viewcontroller.loadImages image if image?
		$()

	click: ->
		yes

	hold: ->
		viewcontroller.renderSprite(@image,0,0,1.2) if image? # At mouse coordinates?
		document.tank.waste -= 0.2;