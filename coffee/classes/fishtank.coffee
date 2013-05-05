#= require fish.coffee

# The Overlay 

class FishTankCanvasController
	constructor: ->
		@relinquishcontrol = no;
		@readytofinish = no;
		@count = 0;

		@fishes = [];
		@fishes.push new Fish('clown-fish.png');

	tick: ->
		
		# First thing is to render the background image
		viewcontroller.renderSprite('TankBackground.jpg',0,0)

		a.tick() for a in @fishes
		
		yes