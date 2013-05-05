#= require fish.coffee
#= require coral.coffee
#= require tools.coffee

# The Overlay 

class FishTankCanvasController
	constructor: ->
			
		@relinquishcontrol = no;

		@fishes = [];
		@fishes.push new Fish('clownfish.json')
		@fishes.push new Fish('minnow.json')

		@corals = [];
		@corals.push new Coral('coral.json')
		@corals[0].position = {x: 200, y:200}

		@tank = new Tank('TankBackground.jpg')
		document.tank = @tank;
		document.tankcontroller = @

	tick: ->
		
		# First thing is to render the background image
		
		@tank.tick()
		a.tick() for a in @corals
		a.tick() for a in @fishes

		for a in viewcontroller.inputstack
			if a.type == 'M'
				document.tool.click(a.x,a.y)
			if a.type == 'MD'
				document.tool.hold(a.x,a.y)
		
		yes