#= require buymenu_views.coffee

class BuyMenuController

	constructor: ->
		fish_files = sync_get 'game/assets/glob.php?type=fish'
		fish_files = JSON.parse fish_files

		@fishes = [];
		@fishes.push new Fish(f) for f in fish_files

		coral_files = sync_get 'game/assets/glob.php?type=coral'
		coral_files = JSON.parse coral_files

		@corals = [];
		@corals.push new Coral(f) for f in coral_files

		@refresh() 

		for a in @fishes
			unique = md5(a.filename)
			$("#buythis#{unique}").click ->
				document.tool = new BuyTool(a,document.tool);
				alert "clicked"

	refresh: ->
		html = "";
		for a in @fishes.concat @corals
			desc = "This item has no description whatsoever."
			desc = a.description if a.description?
			html += @buymenu_mediaObject {
				image: a.image,
				title: a.name,
				text: desc,
				unique: md5(a.filename)  
			} 

		$("#buy").html html

	buymenu_mediaObject: (content) ->
		retval = "<div class='span3'><div class='media'><a class='pull-left' id='#buythis#{content.unique}' href='#'>
				  <img class='media-object' style='width: 64px' src='game/images/#{content.image}'>
				  </a><div class='media-body'><h4 class='media-heading'>#{content.title}</h4>
				  	#{content.text}</div></div></div>"

		return retval 