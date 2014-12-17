if (navigator.geolocation) {  
  var timeoutVal = 10 * 1000 * 1000;
  navigator.geolocation.getCurrentPosition(
    displayPosition, 
    displayError,
    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
  );
  window.setTimeout(function() {
          window.location.href = 'internal.html';       
        }, 1400);
}
else {
  alert("Geolocation is not supported by this browser");
}

function displayPosition(position) {
  //alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
  var dist=getDistance({lat:position.coords.latitude,lng:position.coords.longitude},{lat:6.250756,lng:-75.568008});
}

function displayError(error) {
  var errors = { 
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}

/* Calacular distancia */
var rad = function(x) {
  return x * Math.PI / 180;
};

//var dist=getDistance({lat:lat,lng:lng},{lat:6.250756,lng:-75.568008}); 
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