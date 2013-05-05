# The Overlay

class Fish
	constructor: (image) ->
		@image = image;  
		viewcontroller.loadImages image;
		@position = {x: 0, y: 0};
		@direction = {x: Math.random(), y: Math.random()};

	tick: ->
		
		# First thing is to render the background image
		flip = @direction.x < 0;
		viewcontroller.renderSprite(@image,@position.x,@position.y,0.5,flip)

		@position.x += @direction.x * 10 #(Math.random() - 0.5)*10;
		@position.y += @direction.y * 10#(Math.random() - 0.5)*10; 

		if document.tank.temperature < 60 
			@position.x += (Math.random() - 0.5)*10;
			@position.y += (Math.random() - 0.5)*10;

		if(@position.x > viewcontroller.canvas.width - 0.5*viewcontroller.images[@image].image.width || @position.x < 0) 
			@direction.x = -@direction.x;
			@direction.y = Math.random()-0.5;

		if(@position.y > viewcontroller.canvas.height - 0.5*viewcontroller.images[@image].image.height || @position.y < 0) 
			@direction.y = -@direction.y;
			@direction.x = Math.random()-0.5;

		document.tank.waste += 0.02; 