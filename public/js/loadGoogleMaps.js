var geocoder;
var map_center;
var map;
$(document).ready(function(){
/*---------------    Google Maps   -------------------------*/
	function initialize() {
		map_center = new google.maps.LatLng(39.50, -96.35);
		geocoder = new google.maps.Geocoder();
		var mapOptions = {
			zoom: 5,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			center: map_center
	    };
	    var canvas = $("div#map-canvas")[0];
	    map = new google.maps.Map(canvas, mapOptions);
	}

  	google.maps.event.addDomListener(window, 'load', initialize);
});