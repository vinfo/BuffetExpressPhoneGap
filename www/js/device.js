/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var networkStat;
 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("offline", checkConnection, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //alert("Iniciando app..");
        //app.receivedEvent('deviceready');
        screen.lockOrientation('portrait-primary');
        //navigator.splashscreen.show();
        //window.cache.clear( alertDismissed, alertDismissed );
        checkConnection;
        GetGeoLocation;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function checkConnection() {    
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    if(states[networkState]=='No network connection'){
        //navigator.notification.beep(1);
        alert('Internet es requerido!');
        throw new Error('No Internet Connection.');                              
    }
    return false;
}

function  GetGeoLocation () {
  var options =  { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
  navigator.geolocation.getCurrentPosition(ShowPosition, ShowError, options);
  //var dist=getDistance({lat:position.coords.latitude,lng:position.coords.longitude},{lat:6.250756,lng:-75.568008});
}

function ShowPosition(position) {
    alert("Latitude: " + position.coords.latitude +
          "Longitude: " + position.coords.longitude);
    localStorage.setItem("position",position.coords.latitude+"|"+position.coords.longitude);
}
function ShowError(error) {
   alert("Errorcode: "    + error.code    +
         "Errormessage: "+ error.message );
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