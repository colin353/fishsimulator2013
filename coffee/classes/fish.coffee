# The Overlay

class Fish
	constructor: (image) ->
		@image = image;  
		viewcontroller.loadImages image;
		@position = {x: 0, y: 0};

	tick: ->
		
		# First thing is to render the background image
		viewcontroller.renderSprite(@image,@position.x,@position.y,0.5)

		@position.x += (Math.random() - 0.5)*10;
		@position.y += (Math.random() - 0.5)*10; 