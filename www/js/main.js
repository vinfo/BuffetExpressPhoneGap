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
	.otherwise({
		redirectTo: '/'
	});
});

angularRoutingApp.controller('menuController', function($scope) {
	$scope.message = 'Esta es la página "Acerca de"';
});

angularRoutingApp.controller('comprasController', function($scope) {
	$scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});

angularRoutingApp.controller('mapaController', function($scope) {
	$scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
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

angularRoutingApp.controller("mainController", ["$scope", function mainController($scope) {		
	$scope.Adress = "6.270318, -75.595974";
}]);