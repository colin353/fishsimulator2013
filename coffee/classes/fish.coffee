# The Overlay

class Fish
	constructor: (filename) ->
		@filename = filename
		@fish_raw = sync_get 'game/assets/fish/'+filename

		if !@fish_raw.name?
			alert "Illegal fish \"#{filename}\""
		
		@type = 'fish';
		@image = @fish_raw.image
		@price = @fish_raw.price
		@name = @fish_raw.name
		@crustacean = @fish_raw.crustacean
		@scale = 0.5;
		@scale = @fish_raw.scale if @fish_raw.scale?
		@description = @fish_raw.description
		viewcontroller.loadImages @image;
		@position = {x: 0, y: 0}; 
		@direction = {x: Math.random(), y: Math.random()};

	salt_ok: ->
		if document.tank.salt > @fish_raw.salt_max or document.tank.salt < @fish_raw.salt_min
			return no 
		else 
			return yes

	tick: ->
		
		# First thing is to render the background image
		flip = @direction.x < 0;
		viewcontroller.renderSprite(@image,@position.x,@position.y,@scale,flip)
		if @salt_ok() == yes
			@position.x += @direction.x * 10 #(Math.random() - 0.5)*10;
			@position.y += @direction.y * 10#(Math.random() - 0.5)*10; 
			
		if document.tank.temperature < 60 
			@position.x += (Math.random() - 0.5)*10;
			@position.y += (Math.random() - 0.5)*10;

		if @salt_ok() == no
			if(@position.y < viewcontroller.canvas.height - 0.5*viewcontroller.images[@image].image.height - 50) 
				@position.y += 0.5;


		if(@position.x > viewcontroller.canvas.width - 0.5*viewcontroller.images[@image].image.width || @position.x < 0) 
			if @position.x < 0 then reverse = 1 else reverse = -1;
			@direction.x = Math.abs(@direction.x) * reverse;
			@direction.y = Math.random()-0.5 if @salt_ok()

		if(@position.y > viewcontroller.canvas.height - 0.5*viewcontroller.images[@image].image.height - 50|| @position.y < 0) 
			if @position.y < 0 then reverse = 1 else reverse = -1;
			@direction.y = Math.abs(@direction.y) * reverse
			@direction.x = Math.random()-0.5 if @salt_ok()

		if @crustacean == 1
			@position.y = viewcontroller.canvas.height - 0.5*viewcontroller.images[@image].image.height - 120
		document.tank.waste += 0.02; 