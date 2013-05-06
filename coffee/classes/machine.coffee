# The machine object

class Machine
	constructor: (filename) ->

		@filename = filename
		@machine_raw = sync_get 'game/assets/machines/' + filename
		@type = "machine";
		if !@machine_raw.name?
			alert "Illegal Machine \"#{filename}\""

		@image = @machine_raw.image;  

		viewcontroller.loadImages @image;
		
		@position = {x: 0, y: 0};
		@scale = 0.2;
		@scale = @machine_raw.scale if @machine_raw.scale? 
		
	tick: ->
		# First thing is to render the background image
		viewcontroller.renderSprite(@image,@position.x,@position.y,@scale) 

		document.tank.waste -= 0.005 * document.tank.waste * @machine_raw.waste_filtered if @machine_raw.waste_filtered?