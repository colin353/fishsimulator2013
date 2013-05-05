# The GMap object looks to abstract the maps, which are from JSON.
# It also loads in the javascript initialization code from the map.

class GMap
	constructor: (location) ->
		@loaded = no;
		@map = [];
		me = @;
		$.getScript("game/maps/#{location}.js");
		if location? 
			$.get("game/maps/#{location}.map", (r) -> 
				me.loaded = yes;
				me.map = JSON.parse(r);
			)
		else @newMap()

	newMap: (x = 10, y = 10) ->
		@map = Array y
		for i in [0 .. y] by 1
			@map[i] = Array x
			for j in [0 .. x] by 1
				@map[i][j] = { sprite: 33 };

		@loaded = true;
