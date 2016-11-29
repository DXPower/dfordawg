$(document).ready(function() {
	var smokeweedaudio = document.getElementById("smokeweedeverydayaudio");
	var smokeweedgif = document.getElementById("smokeweedeverydaygif");
	var hitmarkerImage = $("#hitmarkerImage");
	var hitmarker = $("#hitmarkerTemplate");
	var hitmarkerAudio = document.getElementById("hitmarkerAudio");
	var timeout;
	
	$(document).keydown(function(e) {
		if (e.keyCode == 32) { //Smoke weed every day
			reset();
		}
	});
	
	
	
	$(document).mousedown(function(e) {
		var positionLeft = e.clientX - hitmarkerImage.width() / 2;
		var positionTop = e.clientY - hitmarkerImage.height() / 2;
		
		hitmarker.clone().appendTo(document.body).css({'position' : 'absolute', 'left' : positionLeft, 'top' : positionTop}).addClass("hitmarker").removeClass("disabled");
		hitmarkerAudio.play();
		
		if (e.target.id == "spacebar") {
			reset();
		}
		
	});
	 
	function disableDragging(e) {
		e.preventDefault();	
	}
	
	function reset() {
		var hitmarkers = $(".hitmarker");

		console.log(hitmarkers.length);

		for (var i = 0; i < hitmarkers.length; i++) {
			console.log(i);
			if (hitmarkers[i] != undefined) {
				if (!$(hitmarkers[i]).hasClass("disabled")) {
					hitmarkers[i].remove();
				} else {
					i--;	
				}
			} else {
				i--;	
			}
		}

		clearTimeout(timeout);
		smokeweedaudio.currentTime = 0.4 ;
		$("#smokeweedeverydaygif").removeClass("disabled") .attr("src", smokeweedgif.src);
		smokeweedaudio.play();

		timeout = setTimeout(function() {
			$("#smokeweedeverydaygif").addClass("disabled");
		}, 1400);
	}
});