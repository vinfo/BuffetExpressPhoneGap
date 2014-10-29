// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl	: 'templates/slider.html',
		controller 	: 'mainController'
	})
	.when('/menu', {
		templateUrl : 'templates/menu.html',
		controller 	: 'menuController'
	})
	.when('/compras', {
		templateUrl : 'templates/compras.html',
		controller 	: 'comprasController'
	})
	.when('/mapa', {
		templateUrl : 'templates/mapa.html',
		controller 	: 'mapaController'
	})
	.when('/cuenta', {
		templateUrl : 'templates/cuenta.html',
		controller 	: 'cuentaController'
	})	
	.otherwise({
		redirectTo: '/'
	});
});

angularRoutingApp.controller('mainController', function($scope) {
	$scope.message = 'Esta es la página de "Slider"';
});

angularRoutingApp.controller('menuController', function($scope) {
	$scope.message = 'Esta es la página de "Menu"';
});

angularRoutingApp.controller('comprasController', function($scope) {
	$scope.message = 'Esta es la página de "Compras"';
});

angularRoutingApp.controller("mapaController", ["$scope", function mapaController($scope) {		
	$scope.Adress = "6.270318, -75.595974";
}]);

angularRoutingApp.controller('cuentaController', function($scope) {
	if(localStorage.cuenta!="" && localStorage.cuenta!=undefined){
		$scope.message = 'Mí Cuenta';
		var data= JSON.parse(localStorage.cuenta);		
		$scope.email = data.email;
		$scope.name = data.name;
		$scope.lastname = data.lastname;
		$scope.cellPhone = data.cellPhone;
		$("#logout").hide();
	}else{
		$scope.message = 'Debe estar logueado para acceder a esta opción!';
		$("#logueado").hide();
	}	
});

angularRoutingApp.directive('wrapOwlcarousel', function () {
	return {
		restrict: 'E',
		link: function (scope, element, attrs) {
			var options = scope.$eval($(element).attr('data-options'));
			var owl =$(element).owlCarousel(options);
			options.goTo(3);
		}
	};
});

