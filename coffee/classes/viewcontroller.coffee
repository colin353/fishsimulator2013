
#= require gimage.coffee
#= require gmap.coffee
#= require helpers.coffee
#= require inputevent.coffee

#  The view controller is an abstraction for the canvas, and drawing is done through it. It also manages 
#  asset loading, e.g. images.

class ViewController
	constructor: (selector = "pokeCanvas") -> 
		@canvas = $("##{selector}").get(0)
		@context = @canvas.getContext('2d')
		@context.font = '30px "Pokemon GB"'
		# Need to specify alternative font choice for mobile safari, for some reason
		@context.font = '45px "Courier"' if isMobileSafari() 
		@images = [];
		@map = [];
		@stack = [];
		@timestep = 30; 
		@inputstack = [];
		@dpad_touchstate = [];

		me = @;

		# Register the button input here... 
		# e.g. bind x y z	
		$(@canvas).mousedown (e) ->
			me.canvasinput_mouseClick(e.pageX,e.pageY) 

		$(document).keypress (e) ->
			e.preventDefault()
			me.inputstack.push(new GInputEvent('K',e.keyCode,e.shiftKey)); 	 

		$('#dpad > div').bind('touchstart',@canvasinput_Dpad_down);
		$('#dpad > div').mousedown(@canvasinput_Dpad_down);
		$('#dpad > div').bind('touchend',@canvasinput_Dpad_up);
		$('#dpad > div').mouseup(@canvasinput_Dpad_up);


	ready: ->
		for a in [@images, @map]
			for b in a
				if !b[a].loaded? or !b[a].loaded
					return no
		return yes

	loadImages: (list...) ->
		@images[a] = new GImage(a,@) for a in list
		return yes

	loadMap: (location) ->
		@map = new GMap(location)
		return yes

	renderSprite: (i,x,y) ->
		@context.drawImage(@images['spritesheet.png'].image,112*(i%16),Math.floor(i/16)*112,112,112, x*75,y*75,75,75)

	imageLoaded: ->
		return yes

	canvasinput_mouseClick: (x,y) ->
		x = Math.floor(x-$(@.canvas).offset().left / 20)
		y = Math.floor(y-$(@.canvas).offset().left / 20)
		@inputstack.push new GInputEvent('M',x,y)

	canvasinput_Dpad_down: (e) ->
		direction = '';
		switch(@id)
			when 'dpad_u' then direction = 'U'
			when 'dpad_l' then direction = 'L'
			when 'dpad_r' then direction = 'R'
			when 'dpad_d' then direction = 'D'

		DEvent = new GInputEvent('D',direction);

		viewcontroller.inputstack.push(DEvent)
		viewcontroller.dpad_touchstate = DEvent;

	canvasinput_Dpad_up: (e) ->
		viewcontroller.dpad_touchstate = 0

	tick: ->
		#if !@stack? 
		#	return no;

		return alert "Not ready yet..." if !@ready()

		@stack[0].tick()

		return yes;