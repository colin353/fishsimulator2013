# The coral object.

class Coral
	constructor: (image) ->
		@image = image;  
		viewcontroller.loadImages image;
		@position = {x: 0, y: 0};

	tick: ->
		
		# First thing is to render the background image
		viewcontroller.renderSprite(@image,@position.x,@position.y,0.2)