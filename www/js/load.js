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
					          var final = {dist:dist, zone:data}; 
                    distancias.push(final);
                    datos.push(data);
                  }
                }       
				
				var equalGroup =  distancias.reduce(function(prev, curr, index, arr) {
                       var num = curr["dist"];
                       if (!prev[num]) {
                           prev[num] = [];
                       }
                       prev[num].push({'dist':curr["dist"],zone:curr["zone"]});
                       return prev;
                       },{});
					   
				
        localStorage.setItem("zonas",JSON.stringify(datos));
				var cont=distancias.length;
                if(cont>0){                  
				          localStorage.setItem("zona",JSON.stringify(distancias[cont-1].zone));
                  get_CoordinateJSON(distancias[cont-1].zone.code);
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

function get_CoordinateJSON(file){
	var a= getQuadrant(file,'a');
	var b= getQuadrant(file,'b');
	var c= getQuadrant(file,'c');
	var d= getQuadrant(file,'d'); 
}
function getQuadrant(file,q){
    var exists=false;
	var Coords = [];
	var kml= file+"_"+q;
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
  var pos= JSON.parse(localStorage.getItem("position"));
  var point = new google.maps.LatLng(pos.lat,pos.lng);//6.239124, -75.545917
  //console.log("Coordenadas en punto: "+google.maps.geometry.poly.containsLocation(point, zone)+" "+pos.lat+","+pos.lng);
    if(google.maps.geometry.poly.containsLocation(point, zone)){
	 localStorage.setItem("quadrant",q);
	  exists=true;
    }
	return exists;	
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