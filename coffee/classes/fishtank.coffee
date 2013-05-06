#= require fish.coffee
#= require coral.coffee
#= require tools.coffee
#= require pellet.coffee
# The Overlay 

class FishTankCanvasController
	constructor: ->
			
		@relinquishcontrol = no;
		@pellets = [];
		@pellets.push new Pellet('pellet.json')
		@fishes = [];
		@fishes.push new Fish('clownfish.json')
		@fishes.push new Fish('minnow.json')
		@fishes.push new Fish('hermitcrab.json')
		@fishes.push new Fish('pufferfish.json')
		@corals = [];
		@corals.push new Coral('TubeCoralOrange.json')
		@corals[0].position = {x: 200, y:200}
		@corals.push new Coral('TubeCoralPink.json')
		@corals[1].position = {x: 200, y:200}
		@corals.push new Coral('TubeCoralPurple.json')
		@corals[2].position = {x: 200, y:200}
		@corals.push new Coral('BrainCoral.json')
		@corals[3].position = {x: 200, y:200}
		@tank = new Tank('TankBackground.jpg')

		@machines = [];
		@machines.push new Machine('filter.json')

		document.tank = @tank;
		document.tankcontroller = @

	tick: ->
		
		# First thing is to render the background image
		
		@tank.tick()
		a.tick() if a? for a in @machines
		for a in @corals then if a?
			a.tick() 
		for a in @fishes then if a? 
			a.tick() 
		a.tick() for a in @pellets
		for a in viewcontroller.inputstack
			if a.type == 'M'
				document.tool.click(a.x,a.y)
			if a.type == 'MD'
				document.tool.hold(a.x,a.y)
		
		yes