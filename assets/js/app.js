var message = $('#message');

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		message.innerHTML = "Geolocation is not supported by this browser.";
		message.show();
	}
}

function showPosition(position) {
	var params = {
		lat: position.coords.latitude,
		lon: position.coords.longitude,
		appid: "<INSERT_YOUR_APP_ID_HERE>",
		units: "metric"
	}

	$.getJSON(
		"http://api.openweathermap.org/data/2.5/weather",
		params,
		function(result) {
			console.log(result);

			var iconcode = result['weather'][0]['icon'];
			var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

			$('#icon').attr('src', iconurl);
			$('#main').text(result['weather'][0]['main']);
			$('#description').text(result['weather'][0]['description']);
			$('#location').text(result['name']);
			$('#country').text(result['sys']['country']);
			$('#temp').text(result['main']['temp']);
			$('#wind').text(result['wind']['speed']);
			$('#pressure').text(result['main']['pressure']);
			$('#humidity').text(result['main']['humidity']);
			$('#temp').text(result['main']['temp']);

			var sunrise = new Date(result['sys']['sunrise']);
			$('#sunrise').text(sunrise.getHours() + ":" + sunrise.getMinutes());
			var sunset = new Date(result['sys']['sunset']);
			$('#sunset').text(sunset.getHours() + ":" + sunset.getMinutes());


		}

	);
}

function showError(error) {
	message.show();
	switch(error.code) {
		case error.PERMISSION_DENIED:
			message.text("User denied the request for Geolocation.");
		break;
		case error.POSITION_UNAVAILABLE:
			message.text("Location information is unavailable.");
		break;
		case error.TIMEOUT:
			message.text("The request to get user location timed out.");
		break;
		case error.UNKNOWN_ERROR:
			message.text("An unknown error occurred.");
		break;
	}
}

new getLocation();

$("#app").submit(function(e) {
	e.preventDefault();
	console.log('test');
	var form = $(this);
	$.ajax({
		url : 'http://api.openweathermap.org/data/2.5/weather',
		type: "GET",
		data: form.serialize(), 
		success: function (result) {
			console.log(result);    
			var iconcode = result['weather'][0]['icon'];
			var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

			$('#icon').attr('src', iconurl);
			$('#main').text(result['weather'][0]['main']);
			$('#description').text(result['weather'][0]['description']);
			$('#location').text(result['name']);
			$('#country').text(result['sys']['country']);
			$('#temp').text(result['main']['temp']);
			$('#wind').text(result['wind']['speed']);
			$('#pressure').text(result['main']['pressure']);
			$('#humidity').text(result['main']['humidity']);
			$('#temp').text(result['main']['temp']);

			var sunrise = new Date(result['sys']['sunrise']);
			$('#sunrise').text(sunrise.getHours() + ":" + sunrise.getMinutes());
			var sunset = new Date(result['sys']['sunset']);
			$('#sunset').text(sunset.getHours() + ":" + sunset.getMinutes());
		},
		error: function () {
			console.log("error");
		}
	});
});