function initialize() {
    var input1 = document.getElementById('from');
    const autocomplete1 = new google.maps.places.Autocomplete(input1);
    //autocomplete1.bindTo("bounds", mapObject);
    var input2 = document.getElementById('to');
    const autocomplete2 = new google.maps.places.Autocomplete(input2);
    //autocomplete2.bindTo("bounds", mapObject);
 }
   
google.maps.event.addDomListener(window, 'load', initialize);

function calculateRoute(from, to) {

    var myOptions = {
        zoom: 10,
        center: new google.maps.LatLng(18.0178834, -76.9441886),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    
      // Draw the map
      var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
    

    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    };
    
    directionsService.route(
      directionsRequest,
      function(response, status)
      {
        if (status == google.maps.DirectionsStatus.OK)
        {
          new google.maps.DirectionsRenderer({
            map: mapObject,
            directions: response
          });
          const output = document.querySelector('#output');
          output.innerHTML = "<div class='alert-info'> From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ". <br /> Driving Distance <i class='fa-solid fa-road'></i>:" + response.routes[0].legs[0].distance.text + ".<br />Duration <i class='fa-solid fa-hourglass-clock'></i> : " + response.routes[0].legs[0].duration.text + ". </div>";
        }
        else
          $("#error").append("Unable to retrieve your route<br />");
      }
    );
  }

  $(document).ready(function() {
    // If the browser supports the Geolocation API
    if (typeof navigator.geolocation == "undefined") {
      $("#error").text("Your browser doesn't support the Geolocation API");
      return;
    }

    $("#from-link, #to-link").click(function(event) {
      event.preventDefault();
      var addressId = this.id.substring(0, this.id.indexOf("-"));

      navigator.geolocation.getCurrentPosition(function(position) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK)
            $("#" + addressId).val(results[0].formatted_address);
          else
            $("#error").append("Unable to retrieve your address<br />");
        });
      },
      function(positionError){
        $("#error").append("Error: " + positionError.message + "<br />");
      },
      {
        enableHighAccuracy: true,
        timeout: 10 * 1000 // 10 seconds
      });
    });

    $("#calculate-route").submit(function(event) {
      event.preventDefault();
      calculateRoute($("#from").val(), $("#to").val());
    });
    
  });
  

//autocomplete object for input
/*var input1 = document.getElementById("from");
const autocomplete1 = new google.maps.places.Autocomplete(input1);

var input2 = document.getElementById("to");
const autocomplete2 = new google.maps.places.Autocomplete(input2);*/