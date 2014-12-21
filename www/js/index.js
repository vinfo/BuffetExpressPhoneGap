app.initialize();
startApp();

function startApp() {  ;
  if(navigator.geolocation) {
    alert("Init GEO");
    var lat1="";
    var lng1="";    
    var zones= JSON.parse(getZone()); 
    var distancias=[];
    localStorage.setItem("zona",JSON.stringify({id:1,code:'cam001'})); 

    navigator.geolocation.getCurrentPosition(function(position) {
      lat1= position.coords.latitude;
      lng1= position.coords.longitude;     
      localStorage.setItem("position",JSON.stringify({lat:lat1,lng:lng1}));   
      var distancia=[];
      var datos=[];
      for(var i=0;i<zones.length;i++){
        var coord= zones[i].coordinates.split(',');
        if(coord[1]){
          var dist= getDistance({lat:lat1,lng:lng1},{lat:coord[0],lng:coord[1]});
          var data= {id:zones[i].id,code:zones[i].code};
          distancias.push(dist);
          datos.push(data);
        }
      }
      distancias.sort();
      if(distancias.length>0){
        localStorage.setItem("zona",JSON.stringify(datos[0])); 
      }
      redirect();
    }, function() {
      redirect();
      handleNoGeolocation(true);
    });;
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}
function redirect(){
    window.setTimeout(function() {
            window.location.href = 'internal.html';  
         }, 1200);   
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }
}

function getZone(){
    var data= "token="+localStorage.token;
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