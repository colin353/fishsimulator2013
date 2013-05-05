# The pellet object

class Pellet
	constructor: (filename) ->

		@filename = filename
		@pellet_raw = sync_get 'game/assets/' + filename

		if !@pellet_raw.name?
			alert "Illegal Pellet \"#{filename}\""

		@image = @pellet_raw.image;  

		viewcontroller.loadImages @image;
		
		@position = {x: 0, y: 0};
		@scale = 0.2;	
		@scale = @pellet_raw.scale if @pellet_raw.scale?


	tick: ->
		
		# First thing is to render the background image
		viewcontroller.renderSprite(@image,@position.x,@position.y,@scale) 
		if(@position.y < viewcontroller.canvas.height - 0.5*viewcontroller.images[@image].image.height - 50) 
			@position.y += 4;