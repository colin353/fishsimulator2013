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
			document.tank.waste -=0.2;


class FeedTool
	constructor: (image) ->
		@image = image;  
		@scale = 1;
		viewcontroller.loadImages @image if @image?

	click: (x,y) ->
		@hold(x,y)
		p = new Pellet('pellet.json')
		p.position = { x: x, y: y }
		document.tankcontroller.pellets.push p

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


class SaltTool
	constructor: (image) ->
		@image = image;  
		viewcontroller.loadImages image if image?
		@scale = 0.5;

	click: (x,y) ->
		yes

	hold:(x,y) ->
		viewcontroller.renderSprite(@image,x-@scale*viewcontroller.images[@image].image.width/2,y-@scale*viewcontroller.images[@image].image.height/2,@scale) if @image? # At mouse coordinates?
		if document.tank.salt < 100
			document.tank.salt += 1;

class HandTool
	constructor: (image) ->
		@grabbed = null;
		@image = image;  
		viewcontroller.loadImages image if image?
		@scale = 0.2;

	click: (x,y) ->
		@grabbed = null;
		for thisfish in document.tankcontroller.fishes.concat document.tankcontroller.corals, document.tankcontroller.machines
			xs = thisfish.position.x - x + thisfish.scale * 0.5 * document.viewcontroller.images[thisfish.image].image.width
			xs = xs * xs
			ys = thisfish.position.y - y + thisfish.scale * 0.5 * document.viewcontroller.images[thisfish.image].image.height
			ys = ys * ys
			distance = Math.sqrt( xs + ys )
			if distance < 50
				@grabbed = thisfish

	hold:(x,y) ->
		viewcontroller.renderSprite(@image,x-@scale*viewcontroller.images[@image].image.width/2,y-@scale*viewcontroller.images[@image].image.height/2,@scale) if @image? # At mouse coordinates?
		if @grabbed? 
			@grabbed.position.x = x - @grabbed.scale * 0.5 * document.viewcontroller.images[@grabbed.image].image.width;
			@grabbed.position.y = y - @grabbed.scale * 0.5 * document.viewcontroller.images[@grabbed.image].image.height;	

class BuyTool 
	constructor: (purchased, type, previous_tool) ->
		@purchased = purchased; # This is the JSON filename of the object.
		@type = type # This is the purchased object's type, e.g. fish, coral, etc.
		@prev_tool = previous_tool;

	click: (x,y) ->
		switch @type
			when 'fish' 
				a = new Fish(@purchased)
				a.position = {x: x, y: y}
				document.tankcontroller.fishes.push a
			when 'coral' 
				a = new Coral(@purchased)
				a.position = {
					x: x - a.scale*document.viewcontroller.images[a.image].image.width*0.5, 
					y: y - a.scale*document.viewcontroller.images[a.image].image.width*0.5
				}
				document.tankcontroller.corals.push a

		document.tool = @prev_tool;
		delete @

	hold: (x,y) ->
		yes

class SiphonTool
	constructor: (image) ->
		@image = image;  
		@scale = 0.8;
		viewcontroller.loadImages @image if @image?

	click: (x,y) ->
		@hold(x,y)

	hold: (x,y) ->
		viewcontroller.renderSprite(@image,x-@scale*viewcontroller.images[@image].image.width/2,y-@scale*viewcontroller.images[@image].image.height/2,@scale) if @image? # At mouse coordinates?
		if document.tank.waterline > 30
			document.tank.waterline -= 0.025;

class WaterTool
	constructor: (image) ->
		@image = image;  
		@scale = 0.3;
		viewcontroller.loadImages @image if @image?

	click: (x,y) ->
		@hold(x,y)

	hold: (x,y) ->
		viewcontroller.renderSprite(@image,x-@scale*viewcontroller.images[@image].image.width/2,y-@scale*viewcontroller.images[@image].image.height/2,@scale) if @image? # At mouse coordinates?

		if document.tank.waterline < 100
			document.tank.waterline += 0.025;
			document.tank.salt -= 50 / document.tank.waterline if document.tank.salt > 0