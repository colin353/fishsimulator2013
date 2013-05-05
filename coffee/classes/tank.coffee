# The Overlay

class Tank
	constructor: (image) ->
		@image = image;  
		@temperature = 75;
		@salt = 0;
		@supply = 100;
		@waste = 0;

		viewcontroller.loadImages image;

	tick: ->
		viewcontroller.renderSprite(@image,0,0,1.2)

		# Render all stats
		$("#tank_supply").css('width',@supply+'%');
		$("#tank_salt").css('width',@salt+'%');
		$("#tank_waste").css('width',@waste+'%');
		$("#tank_temperature").css('width',((@temperature-45)*(20/9))+'%');