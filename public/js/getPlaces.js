//Queries user's input and displays results from the query.
$("#queryAdress").click(function() {
	var address = $("#adress").val();
	var companyName = $("#companyName").val();
	getLocation(companyName, address);
});

function codeAddress(companyName, address) {
	//Queries user's input and displays results from the query.
	geocoder.geocode( { 'address': address }, function(results, status) {
		map_center = results[0].geometry.location;

		var request = {
			location: map_center,
			radius: 1600,
			types: ['food'],
		}

		if (companyName.length != 0){
			request.keyword = companyName;
		}

	  	var service = new google.maps.places.PlacesService(map);
	  	service.nearbySearch(request, callback);

	  	searchResults.results = [];

	  	_.observe(searchResults.results, function() {
			// console.log("Filtered results changed");
			appendResults("none");
		});

	  	function callback(results, status) {
	  		if (status == google.maps.places.PlacesServiceStatus.OK) {
	  			map.setCenter(map_center);
				map.setZoom(13);
				$("#geocode_results").show();

		  		results.forEach(function(result) {
		  			searchResults.results.push(result);
		  		});
		  	}
		  	else{
				// alert("Geocode was not successful for the following reason: " + status);
				$("#geocode_results").hide();
				$(".errorMessage").append("<p>No results found, Please try again.</p>");
		  	}
		}
	});
}