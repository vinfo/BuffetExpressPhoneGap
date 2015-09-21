app.initialize();

var options = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 75000
};
if (navigator.geolocation) {
	//alert("Detectar");
  document.addEventListener("deviceready", detectGEO, false);	 
} else {
	alert('Geolocation not supported');
}

function detectGEO(){
  //alert("GEO");
  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

// onSuccess Geolocation    //
function onSuccess(position) {
  localStorage.removeItem("position");
  localStorage.removeItem("quadrant");
  localStorage.removeItem("valor_buffet");
  localStorage.removeItem("valor_domicilio");
  localStorage.removeItem("valor_recomendado");
  localStorage.removeItem("zonas");
  localStorage.removeItem("MsgZone"); 
  localStorage.removeItem("timer");        
  lat1= position.coords.latitude;
  lng1= position.coords.longitude;   
  var pos= {lat:lat1,lng:lng1};
  localStorage.setItem("position",JSON.stringify(pos));
  window.location.href = 'load.html';
}

// onError Callback receives a PositionError object    //
function onError(error) {
  localStorage.removeItem("position");
  localStorage.removeItem("quadrant");
  localStorage.removeItem("valor_buffet");
  localStorage.removeItem("valor_domicilio");
  localStorage.removeItem("valor_recomendado");
  localStorage.removeItem("zonas");
  localStorage.removeItem("MsgZone"); 
  localStorage.removeItem("timer");  
  alert('Tu GPS está inhabilitado\nVe a "Configuración" > "Privacidad" > "Servicios de ubicación"´para conceder acceso.\nSi continua el error revisa la velocidad de tu conexión de datos.');
  var pos= {lat:6.267791,lng:-75.581744};
  localStorage.setItem("position",JSON.stringify(pos));
  window.location.href = 'load.html';
}