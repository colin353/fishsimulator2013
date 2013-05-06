# The Overlay

class Tank
	constructor: (image) ->
<<<<<<< HEAD
		@image = image;
=======
		@image = image;  
>>>>>>> c64e57ca8698dacc646bb2094849c688bdd15302
		@waterimage = 'waterline.png'
		@temperature = 75;
		@salt = 0;
		@supply = 100;
		@waste = 0;
		@waterline = 100;
		@pixelwaterline = (@waterline - 100) * 400 + @pixelwaterline;

<<<<<<< HEAD
		viewcontroller.loadImages image, @waterimage	
=======
		viewcontroller.loadImages image, @waterimage 
>>>>>>> c64e57ca8698dacc646bb2094849c688bdd15302

	tick: ->
		viewcontroller.renderSprite(@image,0,0,1.2)

<<<<<<< HEAD
		@pixelwaterline = (100 - @waterline) * 100 + 50;		

		viewcontroller.renderSprite(@waterimage,0,@pixelwaterline,1.2)
		viewcontroller.renderSprite(@waterimage,400,@pixelwaterline,1.2)

		@temperature -= (@temperature - 60) * 0.1;	

=======
		@pixelwaterline = (100 - @waterline) * 100 + 50;

		viewcontroller.renderSprite(@waterimage,0,@pixelwaterline,1.2)
		viewcontroller.renderSprite(@waterimage,400,@pixelwaterline,1.2)  

		@temperature -= (@temperature - 60) * 0.1;
		
>>>>>>> c64e57ca8698dacc646bb2094849c688bdd15302
		# Render all stats
		$("#tank_supply").css('width',@supply+'%');
		$("#tank_salt").css('width',@salt+'%');
		$("#tank_waste").css('width',@waste+'%');
		$("#tank_temperature").css('width',((@temperature-45)*(20/9))+'%');