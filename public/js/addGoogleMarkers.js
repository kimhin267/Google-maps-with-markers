var markers = [];

// List of locations in with {coordinates: [lat,lng]}
function listOfLocations(places) {
	deleteOverlays();
    for (var i = 0; i < places.length; i++) {
    	addMarker(places[i]);
  	}
  	setBounds();
}

// Sets the map on all markers in the array.
function setAllMap(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// Removes the overlays from the map, but keeps them in the array.
function clearOverlays() {
	setAllMap(null);
}

// Deletes all markers in the array by removing references to them.
function deleteOverlays() {
	clearOverlays();
	markers = [];
}

// Adds a marker to the map
function addMarker(place) {
	var coordinates = place.geometry.location;
	var keys = Object.keys(coordinates);
	var lat = coordinates[keys[0]];
	var lng = coordinates[keys[1]];

	var contentString = '<div class="infowindow"><div>'+place.name+'</div><div>'+place.vicinity+'</div>';

	var infowindow = new google.maps.InfoWindow({
	    content: contentString,
	    maxWidth: 300
	});

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map,
		draggable: false,
		title: place.name,
		animation: google.maps.Animation.DROP
	})

	markers.push(marker);

	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.open(map,marker);
  	});
}

function setBounds() {

    var bounds = new google.maps.LatLngBounds();
    for (var i=0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }
    map.fitBounds(bounds);
}