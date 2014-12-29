app.initialize();
startApp();

function startApp() {  
  //alert("startApp");
  localStorage.domain = "http://buffetexpress.co/REST/";  
  localStorage.dimension = $(window).width();

  var banner = JSON.stringify(ajaxrest.getSlider("token="+localStorage.token));
  if(banner)localStorage.setItem("banner",banner); 
  
  var lat1="";
  var lng1="";    
  var zones= JSON.parse(getZone());  
  localStorage.setItem("zona",JSON.stringify({id:1,code:'cam001',show:0}));
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
              function(position) {
                lat1= position.coords.latitude;
                lng1= position.coords.longitude;     
                localStorage.setItem("position",JSON.stringify({lat:lat1,lng:lng1})); 
                var datos=[];
                var distancias=[];
                var totalZones=[];             
                for(var i=0;i<zones.length;i++){
                  var coord= zones[i].coordinates.split(',');
                  if(coord[1]){
                    var dist= getDistance({lat:lat1,lng:lng1},{lat:coord[0],lng:coord[1]});
                    var data= {id:zones[i].id,code:zones[i].code,show:zones[i].show_kml};
                    distancias.push(dist);
                    datos.push(data);
                  }
                }
                distancias.sort();
                localStorage.setItem("zonas",JSON.stringify(datos));
                if(distancias.length>0){                   
                  localStorage.setItem("zona",JSON.stringify(datos[0]));
                  getCoordinateJSON(datos[0]['code']);
                } 
                redirect();
              },
              function(error) {
                  alert("Ubicación no disponible");
                  redirect();
              },
              {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000}
      );
  }else{
    alert("Geolocalización no soportada en dispositivo!");
    redirect();
  }  
}

function redirect(){
    window.setTimeout(function() {
            window.location.href = 'internal.html';  
         }, 1000);   
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
       }
     });
     return res;
}

function getCoordinateJSON(file){
  var Coords = [];
  var q='a';
  for(var i=0;i<4;i++){
    if(i==1)q='b';
    if(i==2)q='c';
    if(i==3)q='d';
  var kml= "cam001";

  var kmlLayer = new google.maps.KmlLayer(localStorage.getItem("domain")+'resources/kmls/'+kml+'.kml', {
    suppressInfoWindows: true,
    preserveViewport: false
  });
    
    var process= ajaxrest.getCoordinateJSON(kml);
    for(var i=0;i<process.length;i++){
        Coords.push(new google.maps.LatLng(process[i][0],process[i][1]));
    }

    var zone = new google.maps.Polygon({
        paths: Coords
    });
  var pos= localStorage.getItem("position");
  var point = new google.maps.LatLng("6.230951594193816","-75.58729841171405");
  //console.log(google.maps.geometry.poly.containsLocation(point, zone));
  }
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