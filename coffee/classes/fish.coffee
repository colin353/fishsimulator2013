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
		@health = @fish_raw.hitpoints
		@alive = @fish_raw.alive
		@scale = 0.5
		@scale = @fish_raw.scale if @fish_raw.scale?
		@description = @fish_raw.description
		viewcontroller.loadImages @image;
		@position = {x: 0, y: 0}; 
		@direction = {x: Math.random(), y: Math.random()};
		@fight = false;
		@aggression = null;
		@targetfish = null;
		@enemyspotted = {x: null, y: null}
		@happiness = 0;
	temp_ok: ->
		if document.tank.temperature > @fish_raw.temp_max or document.tank.temperature < @fish_raw.temp_min
			return no
		else
			return yes
	salt_ok: ->
		if document.tank.salt > @fish_raw.salt_max or document.tank.salt < @fish_raw.salt_min
			return no 
		else 
			return yes

	annhilate: ->
		for i in [0...document.tankcontroller.fishes.length]
			if document.tankcontroller.fishes[i] == @
				document.tankcontroller.fishes.splice i,1


	nearest_pellet: ->
		bestdistance = 200;
		bestpos = {x: -1, y: -1} 
		i = 0;
		for p in document.tankcontroller.pellets
			xs =  p.position.x - (@position.x + @scale*document.viewcontroller.images[@image].image.width/2);
			xs = xs * xs
			ys = p.position.y - (@position.y + @scale*document.viewcontroller.images[@image].image.height/2);
			ys = ys * ys
			distance = Math.sqrt( xs + ys )
			if distance < bestdistance
				bestdistance = distance
				bestpos  = { x: p.position.x, y: p.position.y }
				bestpos.pellet = i;
			i++;
		bestpos.distance = bestdistance;

		return bestpos;

	nearest_fish: ->
		targetfishdist = 100;
		targetpos = {x: -1, y: -1}
		i = 0;
		targetfish = null;
		for f in document.tankcontroller.fishes
			xs =  f.position.x - (@position.x + @scale*document.viewcontroller.images[@image].image.width/2);
			xs = xs * xs
			ys = f.position.y - (@position.y + @scale*document.viewcontroller.images[@image].image.height/2);
			ys = ys * ys
			distance = Math.sqrt( xs + ys )
			if distance < targetfishdist

				targetfishdist = distance
				targetpos  = { x: f.position.x, y: f.position.y }
				targetpos.fish = i;
				@targetfish = f
				i++;
		targetpos.distance = targetfishdist;

		return targetpos;


	is_near_fish: ->
		for f in document.tankcontroller.fishes
			xs =  p.position.x - (@position.x + @scale*document.viewcontroller.images[@image].image.width/2);
			xs = xs * xs
			ys = p.position.y - (@position.y + @scale*document.viewcontroller.images[@image].image.height/2);
			ys = ys * ys
			distance_fish = Math.sqrt( xs + ys )
			if distance < 50
				return true

	fight_chance: ->
		chance = Ma0th.random * 100 
		if chance > (50- @aggression)
			return true

	tick: ->

		@aggression = @fish_raw.aggression + (-0.1 * @health) - @happiness;
		if @is_near_fish == true
			if @fight_chance() == true
					@enemyspotted = @nearest_fish()
			if @enemyspotted.x > -1
			#alert enemyspotted.x
				@direction.x = (@enemyspotted.x - (@position.x + @scale*document.viewcontroller.images[@image].image.width/2)) * 0.005
				@direction.y = (@enemyspotted.y - (@position.y + @scale*document.viewcontroller.images[@image].image.height/2)) * 0.005 
				norm = Math.sqrt( @direction.x ^2 + @direction.y ^2 );
				if norm < .2 
					norm = .2;
				@direction.x = @direction.x / norm;
				@direction.y = @direction.y / norm;
				if @enemyspotted.distance < 30
					@targetfish.health -= (damage * 0.1);
		
		if @health == 0 
			alert "Your #{@name} has died!"
			@annhilate()
		
		enemyspotted = @nearest_fish()
		if enemyspotted.x > -1
			#alert enemyspotted.x
			@direction.x = (enemyspotted.x - (@position.x + @scale*document.viewcontroller.images[@image].image.width/2)) * 0.005
			@direction.y = (enemyspotted.y - (@position.y + @scale*document.viewcontroller.images[@image].image.height/2)) * 0.005 
			norm = Math.sqrt( @direction.x ^2 + @direction.y ^2 );
			if norm < .2 
				norm = .2;
			@direction.x = @direction.x / norm;
			@direction.y = @direction.y / norm;
			if enemyspotted.distance < 30
				yes
				#@scale += 0.01 * @fish_raw.growth_rate if @fish_raw.growth_rate?
				#alert "I ate pellet #{enemyspotted.pellet}"


		closest = @nearest_pellet()
		if closest.x > -1
			#alert closest.x
			@direction.x = (closest.x - (@position.x + @scale*document.viewcontroller.images[@image].image.width/2)) * 0.005
			@direction.y = (closest.y - (@position.y + @scale*document.viewcontroller.images[@image].image.height/2)) * 0.005 
			norm = Math.sqrt( @direction.x ^2 + @direction.y ^2 );
			if norm < .2 
				norm = .2;
			@direction.x = @direction.x / norm;
			@direction.y = @direction.y / norm;
			if closest.distance < 30
				document.tankcontroller.pellets.splice closest.pellet, 1;
				@scale += 0.01 * @fish_raw.growth_rate if @fish_raw.growth_rate?
				#alert "I ate pellet #{closest.pellet}"

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
				if @health > 0
					@health -= 0;


		if(@position.x > viewcontroller.canvas.width - 0.5*viewcontroller.images[@image].image.width || @position.x < document.tank.pixelwaterline) 
			if @position.x < document.tank.pixelwaterline then reverse = 1 else reverse = -1;
			@direction.x = Math.abs(@direction.x) * reverse;
			@direction.y = Math.random()-0.5 if @salt_ok()

		if(@position.y > viewcontroller.canvas.height - 0.5*viewcontroller.images[@image].image.height - 50|| @position.y < document.tank.pixelwaterline) 
			if @position.y < document.tank.pixelwaterline then reverse = 1 else reverse = -1;
			@direction.y = Math.abs(@direction.y) * reverse
			@direction.x = Math.random()-0.5 if @salt_ok()

		if @crustacean == 1
			@position.y = viewcontroller.canvas.height - 0.5*viewcontroller.images[@image].image.height - 120
		document.tank.waste += 0.02; 

		if(Math.floor(Math.random() * 100) == 28)
			@direction.x = Math.random()-0.5
			@direction.y = Math.random()-0.5


