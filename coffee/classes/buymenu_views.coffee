
buymenu_mediaObject: (content) ->
	retval = "<div class='span3'><div class='media'><a class='pull-left' href='#'>
			  <img class='media-object' style='width: 64px' src='game/images/#{content.image}'>
			  </a><div class='media-body'><h4 class='media-heading'>#{content.title}</h4>
			  	#{content.text}</div></div></div>"

	return retval 