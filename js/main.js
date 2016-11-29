var hits = [];

$(document).ready(function() {
	var smokeweedaudio = document.getElementById("smokeweedeverydayaudio");
	var smokeweedgif = document.getElementById("smokeweedeverydaygif");
	var hitmarkerImage = $("#hitmarkerImage");
	var hitmarker = $("#hitmarkerTemplate");
	var eye = $("#eye");
	var hitmarkerAudio = document.getElementById("hitmarkerAudio");
	var timeout;
	
	$(document).keydown(function(e) {
		if (e.keyCode == 32) { //Smoke weed every day
			reset();
		}
	});
	
	function angle(cx, cy, ex, ey) {
		var dy = ey - cy;
		var dx = ex - cx;
		var theta = Math.atan2(dy, dx); // range (-PI, PI]
		theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
		
		return theta;
	}
	
	function angle360(cx, cy, ex, ey) {
		var theta = angle(cx, cy, ex, ey); // range (-180, 180]
		if (theta < 0) theta = 360 + theta; // range [0, 360)
		return theta;
	}
	
	$(document).mousedown(function(e) {
		var positionLeft = e.clientX - hitmarkerImage.width() / 2;
		var positionTop = e.clientY - hitmarkerImage.height() / 2;
		
		hitmarker.clone().appendTo(document.body).css({'position' : 'absolute', 'left' : positionLeft, 'top' : positionTop}).addClass("hitmarker").removeClass("disabled");
		hitmarkerAudio.play();
		
		hits.push([e.clientX, e.clientY]);
		
		if (hits.length == 3) {
			var base = averagePoint(hits[1], hits[2]);
			var w = distance(hits[1], hits[2]);
			var h = distance(hits[0], base);
			var topP = hits[0][0] - w / 2;
			var a = angle360(hits[1][0], hits[1][1], hits[2][0], hits[2][1]);
			eye.clone().appendTo(document.body).css({'position' : 'absolute', 'left' : topP - (Math.cos(a) * (h/2)), 'top' : hits[0][1] - (Math.sin(a) * (h/2)), 'height' : h, 'width' : w}).addClass("eye").removeClass("disabled");
    			
			
			console.log(a);
			$('#eye').css('transform','rotate(' + a + 'deg)');
			hits = [];
		}
		
		if (e.target.id == "spacebar") {
			reset();
		}
		
	});
	 
	function disableDragging(e) { 
		e.preventDefault();	
	}
	
	function averagePoint(a, b) {
		return [Math.floor((a[0] + b[0]) / 2), Math.floor((a[1] + b[1]) / 2)];
	}
	
	function distance(a, b) {
		return Math.floor(Math.sqrt((a[0] - b[0])*(a[0] - b[0]) + (a[1] - b[1])*(a[1] - b[1])));
	}
	
	
	
	function reset() {
		var hitmarkers = $(".hitmarker");
		var eyes = ($(".eye"));
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
		
		for (var i = 0; i < eyes.length; i++) {
			console.log(i);
			if (eyes[i] != undefined) {
				if (!$(eyes[i]).hasClass("disabled")) {
					eyes[i].remove();
				} else {
					i--;	
				}
			} else {
				i--;	
			}
		}

		hits = [];
		
		clearTimeout(timeout);
		smokeweedaudio.currentTime = 0.4 ;
		$("#smokeweedeverydaygif").removeClass("disabled") .attr("src", smokeweedgif.src);
		smokeweedaudio.play();

		timeout = setTimeout(function() {
			$("#smokeweedeverydaygif").addClass("disabled");
		}, 1400);
	}
});