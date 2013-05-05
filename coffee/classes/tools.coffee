# The Overlay

class WarmTool
	constructor: (image) ->
		@image = image;  
		viewcontroller.loadImages @image if @image?
		@scale = 1;
	click: (x,y) ->
		yes

	hold: (x,y)->
		viewcontroller.renderSprite(@image,x-@scale*viewcontroller.images[@image].image.width/2,y-@scale*viewcontroller.images[@image].image.height/2,@scale) if @image? # At mouse coordinates?
		if document.tank.temperature < 90
		document.tank.temperature += 0.2;


class SpongeTool
	constructor: (image) ->
		@image = image;  
		@scale = 0.6;
		viewcontroller.loadImages @image if @image?

	click: (x,y) ->
		@hold(x,y)

	hold: (x,y) ->
		viewcontroller.renderSprite(@image,x-@scale*viewcontroller.images[@image].image.width/2,y-@scale*viewcontroller.images[@image].image.height/2,@scale) if @image? # At mouse coordinates?
		if document.tank.waste > 0
			document.tank.waste -=2;

class FeedTool
	constructor: (image) ->
		@image = image;  
		@scale = 1;
		viewcontroller.loadImages @image if @image?

	click: (x,y) ->
		@hold(x,y)

	hold: (x,y) ->
		viewcontroller.renderSprite(@image,x-@scale*viewcontroller.images[@image].image.width/2,y-@scale*viewcontroller.images[@image].image.height/2,@scale) if @image? # At mouse coordinates?


class CoolTool
	constructor: (image) ->
		@image = image;  
		viewcontroller.loadImages image if image?
		@scale = 1;

	click: (x,y) ->
		yes

	hold:(x,y) ->
		viewcontroller.renderSprite(@image,x-@scale*viewcontroller.images[@image].image.width/2,y-@scale*viewcontroller.images[@image].image.height/2,@scale) if @image? # At mouse coordinates?
		if document.tank.temperature > 45 
			document.tank.temperature -= 0.2;