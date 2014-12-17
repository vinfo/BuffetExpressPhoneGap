angularRoutingApp.directive('addressBasedGoogleMap', function () {
    return {
        restrict: "A",
        template: "<div id='addressMap'></div>",
        scope: {
            address: "=",
            zoom: "="
        },
        controller: function ($scope) {
            var geocoder;
            var latlng;
            var map;
            var marker;
            var initialize = function (pos) {
                geocoder = new google.maps.Geocoder();
                latlng = new google.maps.LatLng(6.270318, -75.595974);
                var mapOptions = {
                    zoom: $scope.zoom,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById('addressMap'), mapOptions);
                markAdressToMap(pos);
            };
            var getPosition= function(){
                if(navigator.geolocation) {      
                    alert(1);              
                    navigator.geolocation.getCurrentPosition(function(position) {
                        lat= position.coords.latitude;
                        lng= position.coords.longitude;  
                        coord= lat+', '+lng;
                        initialize(coord);
                        alert(2);
                    });                    
                }                
            }
            var markAdressToMap = function (coord) {                
                geocoder.geocode({ 'address': coord }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    }
                });
            };
            getPosition();
        },
    };
});