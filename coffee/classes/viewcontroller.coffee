
#= require gimage.coffee
#= require gmap.coffee
#= require helpers.coffee
#= require inputevent.coffee
#= require fisntank.coffee

#  The view controller is an abstraction for the canvas, and drawing is done through it. It also manages 
#  asset loading, e.g. images.

class ViewController
	constructor: (selector = "pokeCanvas") ->
		@canvas = $("##{selector}").get(0)
		@context = @canvas.getContext('2d')
		@context.font = '45px "Courier"';
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


	ready: ->
		for a in [@images, @map]
			for b in a
				if !b[a].loaded? or !b[a].loaded
					return no
		return yes

	loadImages: (list...) ->
		@images[a] = new GImage(a,@) for a in list
		return yes


	renderSprite: (image,x,y,scale=1) ->
		width = @images[image].image.width
		height = @images[image].image.height
		@context.drawImage(@images[image].image,x,y,width*scale,height*scale) 

	imageLoaded: ->
		return yes

	canvasinput_mouseClick: (x,y) ->
		x = Math.floor(x-$(@.canvas).offset().left / 20)
		y = Math.floor(y-$(@.canvas).offset().left / 20)
		@inputstack.push new GInputEvent('M',x,y)

	tick: ->
		#if !@stack? 
		#	return no;

		return alert "Not ready yet..." if !@ready()

		@stack[0].tick()

		return yes;