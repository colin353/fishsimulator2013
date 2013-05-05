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
		@scale = 0.4;

	click: (x,y) ->
		@grabbed = null;
		for i in [0...document.tankcontroller.fishes.length]
			document.tankcontroller.fishes[i].scale = 0.5
			xs = document.tankcontroller.fishes[i].position.x - x + document.tankcontroller.fishes[i].scale * 0.5 * document.viewcontroller.images[document.tankcontroller.fishes[i].image].image.width
			xs = xs * xs
			ys = document.tankcontroller.fishes[i].position.y - y + document.tankcontroller.fishes[i].scale * 0.5 * document.viewcontroller.images[document.tankcontroller.fishes[i].image].image.height
			ys = ys * ys
			distance = Math.sqrt( xs + ys )
			if distance < 50
				@grabbed = document.tankcontroller.fishes[i]
		yes

	hold:(x,y) ->
		viewcontroller.renderSprite(@image,x-@scale*viewcontroller.images[@image].image.width/2,y-@scale*viewcontroller.images[@image].image.height/2,@scale) if @image? # At mouse coordinates?
		if @grabbed? 
			@grabbed.position.x = x - @grabbed.scale * 0.5 * document.viewcontroller.images[@grabbed.image].image.width;
			@grabbed.position.y = y - @grabbed.scale * 0.5 * document.viewcontroller.images[@grabbed.image].image.height;	
