app.initialize();

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 75000
};
if (navigator.geolocation) {
	//alert("Detectar");
  document.addEventListener("deviceready", detectGEO, false);	 
} else {
	alert('Geolocalización no soportada');
  window.location.href = 'sector.html';
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
  localStorage.removeItem("valor_tipico");
  localStorage.removeItem("valor_premium");
  localStorage.removeItem("valor_domicilio");
  localStorage.removeItem("valor_recomendado");
  localStorage.removeItem("zonas");
  localStorage.removeItem("MsgZone");
  localStorage.removeItem("timer");
  localStorage.removeItem("orden");
  localStorage.removeItem("pedido");
  localStorage.removeItem("horario");
  localStorage.removeItem("bebida");
  localStorage.removeItem("regQR");
      
  lat1= position.coords.latitude;
  lng1= position.coords.longitude;   
  var pos= {lat:lat1,lng:lng1};
  localStorage.setItem("position",JSON.stringify(pos));
  console.log("onSuccess");
  if(!localStorage.pushtoken)setFirstPushReg();
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
  //alert('Tu GPS está inhabilitado\nVe a "Configuración" > "Privacidad" > "Servicios de ubicación"´para conceder acceso.\nSi continua el error revisa la velocidad de tu conexión de datos.');
  var pos= {lat:6.267791,lng:-75.581744};
  localStorage.setItem("position",JSON.stringify(pos));
  console.log("onError");
  window.location.href = 'sector.html';
}

function setFirstPushReg(){
    console.log("Registra primera");
    var pushNotification = window.plugins.pushNotification;
    pushNotification.onDeviceReady({ projectid: "746109479988", appid : "825C3-92C11" });
    var push= pushNotification.registerDevice(
        function(status) {
            var pushToken = status;
            console.log('push token: ' + pushToken);
            localStorage.setItem("pushtoken",pushToken);
            return true;
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
    console.log("Registra segunda");
    if(!localStorage.pushtoken){
        //initPushwoosh();
        console.log("Registra intermedia");
    }
    console.log("Registra tercera");
    return push;    
}