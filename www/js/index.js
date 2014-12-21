app.initialize();
startApp();

function startApp() {
    alert("Start");
    if (navigator.geolocation) {
        alert("Geolocation");
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
    alert("End");
}
function showPosition(position) {
    alert("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
}