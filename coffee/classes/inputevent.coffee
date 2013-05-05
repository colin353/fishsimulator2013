 # The GInputEvent is a user input event that contains some information about the
 # event, like where the user clicked or what button was pressed, etc.

class GInputEvent 
 	constructor: (type, data...) ->
 		@type = type;
 		switch @type
 			when 'K'
 				@key = data[0]
 				@shift = data[1];
 			when 'M' 
 				@x = data[0];
 				@y = data[1];
 			when 'D' then @dir = data[0]


 	toText: -> 
 		textstring = '';
 
 		switch @type 
 			when 'K'
 				char = String.fromCharCode(@key)
 				shift = '';
 				shift = ' + SHIFT ' if @shift? and @shift
 				textstring = "Keyboard event: key number #{@key} #{shift} (which is '#{char}')"
 			when 'M'
 				textstring = "Mouse click at (#{@x}, #{@y})"
 			when 'D'
 				textstring = "D-pad cilcked (#{@dir})"
 			else 
 				textstring = "Input type #{@type}"

 		textstring