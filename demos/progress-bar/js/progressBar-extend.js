$.extend({
	progressBar: function(color) {

		var str = `
		<div id="progress-bar" style="width: 0px;height: 3px;background: ${color || "blue"};position: fixed;top: 0;left: 0;"></div>
		`
		$("body").append(str);
		
		$(document).scroll(function() {
			var percent = (($(document).scrollTop() / ($(document).height() - $(window).height()).toFixed(4) * 100) + "%")
			$("#progress-bar").css("width", percent);
		})

	},
	
	
	
	
	
	
	
})