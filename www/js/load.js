startApp();

function startApp() {  
  //alert("startApp");
  localStorage.domain = "http://buffetexpress.co/REST/";  
  localStorage.dimension = $(window).width();
  localStorage.setItem("quadrant","");
  localStorage.setItem("banner","");
  
  var lat1="";
  var lng1="";    
  var zones= JSON.parse(getZone());
  localStorage.setItem("zona",JSON.stringify({id:1,code:'cam001'}));
  localStorage.setItem("zonas",JSON.stringify(zones)); 
  if(zones){
    if (navigator.geolocation) {    
      navigator.geolocation.getCurrentPosition(
        function(position) {
          lat1= position.coords.latitude;
          lng1= position.coords.longitude;
      var pos= {lat:lat1,lng:lng1};
      var codes=[];
          localStorage.setItem("position",JSON.stringify(pos));     
      for(var i=0;i<zones.length;i++){
        var zona= zones[i].id+"|"+zones[i].code;
        codes.push(zona);
      }
      var process= ajaxrest.getCoordinatesJSON(codes);
      var quadrant=0;
      for(var i=0;i<process.length;i++){        
        var Coords = process[i][3];
        var limits=[];
        for(var j=0;j<Coords.length;j++){                 
          limits.push(new google.maps.LatLng(Coords[j][0],Coords[j][1]));  
        }
        quadrant+= checkZonaxQuadrant(process[i][0],process[i][1],limits,process[i][2]);         
      }     
          if(quadrant==0)alert("Ubicación no tiene cobertura para realizar pedidos.\nSolo podrá revisar nuestra oferta de productos.");
          redirect();
        },
        function(error) {
          alert("Ubicación no disponible");
          redirect();
        },
        {timeout: 15000, enableHighAccuracy: true, maximumAge: 75000}
        );
}else{
  alert("Geolocalización no soportada en dispositivo!");
  redirect();
} 
}else{
  alert("Problemas de conectividad a Internet");
}
}

function sortByDist(a, b) {
    var x = a.dist;
    var y = b.dist;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function redirect(){
    $(".loading_msg").html("Detectando zona de pedidos");
    window.setTimeout(function() {
    if(!localStorage.show_guia){
            window.location = "internal.html#/guia";
    }else{
      window.location.href = 'internal.html';
    }              
         }, 1000);   
}

function getZone(){
    var res="";
    $.ajax({
       type: 'GET',
       url: localStorage.domain+'api/v1/getZones/',
       crossDomain: true,
       dataType: 'json',
       async: false, 
       success: function(msg) {
         res= JSON.stringify(msg);   
       }
     });
     return res;
}
function checkZonaxQuadrant(id_zone,code,limits,quadrant){
  var exists=0;
    var zone = new google.maps.Polygon({
        paths: limits
    });
  var pos= JSON.parse(localStorage.getItem("position"));
  var point = new google.maps.LatLng(pos.lat,pos.lng);//6.239124, -75.545917
  //console.log("Coordenadas en punto: "+google.maps.geometry.poly.containsLocation(point, zone)+" "+pos.lat+","+pos.lng);
    if(google.maps.geometry.poly.containsLocation(point, zone)){
    //alert("Zona: "+id_zone+", Cuadrante: " + quadrant);
    localStorage.setItem("zona",JSON.stringify({id:id_zone,code:code}));
      localStorage.setItem("quadrant",quadrant);
    exists=1;
    }
  return exists;
}