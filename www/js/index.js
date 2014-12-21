//app.initialize();
startApp();

function startApp() {
    alert("Start");
    var lat1="";
    var lng1="";
    alert("zones1");  
    var zones= JSON.parse(getZone());
    alert(JSON.stringify(zones));
    alert("zones2");  
    localStorage.setItem("zona",JSON.stringify({id:1,code:'cam001'}));    
    if (navigator.geolocation) {
        alert("Geolocation");
        redirect();
    } else {
        alert("Geolocalización no soportada en dispositivo");
        redirect();
    }
    alert("End");
}

function redirect(){
    alert("Redirect..");
    window.setTimeout(function() {
            window.location.href = 'internal.html';  
         }, 1200);   
}

function getZone(){   
    var data= "token=false";
    var res="";
    $.ajax({
       type: 'GET',
       url: localStorage.domain+'api/v1/getZones/',
       crossDomain: true,
       data: data,
       dataType: 'json',
       async: false, 
       success: function(msg) {         
         res= JSON.stringify(msg);  
         alert(res); 
       },
      error: function (request, status, error) {
          alert(request.responseText);
      }      
     });
     return res;
}

/* Calcular distancia */
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