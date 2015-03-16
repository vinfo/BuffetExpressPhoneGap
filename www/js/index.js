GetGeoLocation();

function  GetGeoLocation () {
	alert(2);
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	alert(5);
}

var onSuccess = function(position) {
	alert(3);
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert(4);
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}