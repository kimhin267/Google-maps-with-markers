// Model
searchResults = {
	results: []
}

// variables
current_animated_marker = null;

//Queries user's input and displays results from the query.
$(document).ready(function(){
	$("#queryAddress").click(function() {
		var address = $("#address").val();
		var companyName = $("#companyName").val();
		codeAddress(companyName, address);
	});
});

function appendResults(action) {
	$('#geocode_results').html("");
	var toDrop = [];

	for (var i = 0; i < searchResults.results.length; i ++) {
		$('#geocode_results').append('<div class="content"><input class="hide" name="geocode_result" type="radio" value="'+searchResults.results[i].name+', '+searchResults.results[i].vicinity+'"/>'+searchResults.results[i].name+', '+searchResults.results[i].vicinity+'</div><input type="hidden" value="'+searchResults.results[i].geometry.location+'"/></div>');
		toDrop.push(searchResults.results[i]);
	}
	listOfLocations(toDrop);
}

function codeAddress(companyName, address) {
	companyName = "";
	//Queries user's input and displays results from the query.
	geocoder.geocode( { 'address': address }, function(results, status) {
		map_center = results[0].geometry.location;

		var request = {
			location: map_center,
			radius: 1600
		}

		if (companyName.length != 0){
			request.keyword = companyName;
		}

	  	var service = new google.maps.places.PlacesService(map);
	  	service.nearbySearch(request, callback);

	  	searchResults.results = [];

	  	_.observe(searchResults.results, function() {
			appendResults("none");
		});

	  	function callback(results, status) {
	  		if (status == google.maps.places.PlacesServiceStatus.OK) {
	  			map.setCenter(map_center);
				$("#geocode_results").show();

		  		results.forEach(function(result) {
		  			searchResults.results.push(result);
		  		});
		  	}
		  	else{
				$("#geocode_results").hide();
				$(".errorMessage").append("<p>No results found, Please try again.</p>");
		  	}
		}
	});
}