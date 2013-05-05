# The Overlay

class OverlayCanvasController
	constructor: (text) ->
		@relinquishcontrol = no;
		@readytofinish = no;
		@line1 = text;
		@line2 = '';
		@text = text;
		@count = 0;

		if text.length > 18
			for i in [0..18] by 1
				if text[18-i] == ' '
					line1 = text[0..i]
					line2 = text[i..]
					alert "Okay..."
					break


	dialog: (line1, line2) ->
		viewcontroller.context.drawImage viewcontroller.images['overlay.png'].image, 50, 450
		viewcontroller.context.fillStyle = 		'black';
		viewcontroller.context.textBaseline = 	'middle';
		viewcontroller.context.textAlign = 		'left;'
		viewcontroller.context.fillText @line1, 95, 520
		viewcontroller.context.fillText @line2, 95, 575


	tick: ->
		for i in viewcontroller.inputstack
			switch i
				when "A" then @relinquishcontrol = yes if @readytofinish

		@count++;
		line1_now = @line1[0..(@count/3)]
		if (@count/3) - line1_now.length > 0
			line2_now = @line2[0..(@count/3 - line1_now.length)]
		else line2_now = '';

		if(@count/3 < @text.length+1)
			@dialog line1_now, line2_now
		else if @count%12 == 0
			@readytofinish = true;
			viewcontroller.renderSprite 32+@count%24,7.8,7.2

