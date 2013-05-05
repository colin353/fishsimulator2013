# The coral object.

class Coral
	constructor: (filename) ->

		@filename = filename
		@coral_raw = sync_get 'game/assets/coral/'+filename

		if !@coral_raw.name?
			alert "Illegal coral \"#{filename}\""

		@image = @coral_raw.image;  

		viewcontroller.loadImages @image;
		
		@position = {x: 0, y: 0};
		@scale = 0.2;
		@name = @coral_raw.name
		@description = @coral_raw.description
		@scale = @coral_raw.scale if @coral_raw.scale?


	tick: ->
		
		# First thing is to render the background image
		viewcontroller.renderSprite(@image,@position.x,@position.y,@scale)