#= require fish.coffee
#= require coral.coffee

# The Overlay 

class FishTankCanvasController
	constructor: ->
		@relinquishcontrol = no;
		@readytofinish = no;
		@count = 0;

		@fishes = [];
		@fishes.push new Fish('clown-fish.png');
		@fishes.push new Fish('minnow.png')

		@corals = [];
		@corals.push new Coral('Coral1.png')
		@corals[0].position = {x: 200, y:200} 

	tick: ->
		
		# First thing is to render the background image
		viewcontroller.renderSprite('TankBackground.jpg',0,0)

		a.tick() for a in @corals
		a.tick() for a in @fishes 
		
		yes