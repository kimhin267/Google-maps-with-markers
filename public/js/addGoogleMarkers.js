// List of locations in with {coordinates: [lat,lng]}
function listOfLocations(places) {
	deleteOverlays();
    for (var i = 0; i < places.length; i++) {
    	addMarker(places[i]);
  	}
}

// Adds marker(s) to the map
function addMarker(place) {
	var coordinates = place.coordinates;
	var lat = coordinates[0];
	var lng = coordinates[1];
	markers.push(new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map,
		draggable: false,
		title: place.company_name +"\n"+place.full_address,
		animation: google.maps.Animation.DROP
	}));
	
}