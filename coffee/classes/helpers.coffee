isMobileSafari = ->
	navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)  

sync_get = (file) ->
	retval = '';

	done = (result) ->
        retval = result

	jQuery.ajax { url: file, success: done, async: no }
	retval

md5 = (string) =>
	hex_md5(string)

calculate_distance = (a, b) ->
	b = {x:0, y:0} if !b?
	return Math.sqrt (a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.x - b.x)

calculate_difference = (a,b) ->
	ex = a.x - b.x;
	why = a.y - b.y;
	return {x: ex, y: why}