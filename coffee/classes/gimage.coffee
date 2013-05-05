#	The GImage is an image object that abstracts image loading
#	and communicates with the ViewController object to indicate that the loading is complete.

class GImage
	constructor: (location = 'broken.png', owner) ->
		@image = new Image()
		@image.src = "game/images/#{location}";
		me = @;
		@image.onload = -> 
			me.onload()

		@loaded = no 
		@owner = owner;
 		
	onload: ->
		@loaded = yes
		#alert 'loaded one image...'
		if @owner? and @owner.imageLoaded?
			@owner.imageLoaded()
