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