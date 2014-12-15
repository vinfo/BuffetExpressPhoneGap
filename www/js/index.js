localStorage.clear();
getLocation();

function getLocation() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition, showError);
       window.setTimeout(function() {                
              window.location.href = 'internal.html';
       }, 1400);        
    } else { 
        alert("Geolocation is not supported by this browser.");
    }    
}

function showPosition(position) {
   //alert("Latitude: " + position.coords.latitude +",Longitude: " + position.coords.longitude);
   localStorage.setItem("GPS",true);
   lat= position.coords.latitude;
   lng= position.coords.longitude;  
   coord= lat+', '+lng;
   var dist=getDistance({lat:lat,lng:lng},{lat:6.250756,lng:-75.568008});
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
/* Calacular distancia */
var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {  
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};