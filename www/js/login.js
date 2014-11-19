// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'templates/login.html',
		controller 	: 'mainController'
	})
	.when('/cuenta', {
		templateUrl : 'templates/cuenta.html',
		controller 	: 'cuentaController'
	})	
	.when('/login/:email', {
		templateUrl : 'templates/login.html',
		controller 	: 'loginController'
	})	
	.when('/terminos', {
		templateUrl : 'templates/terminos.html',
		controller 	: 'terminosController'
	})	
	.when('/clave', {
		templateUrl : 'templates/clave.html',
		controller 	: 'claveController'
	})	
	.otherwise({
		redirectTo: '/'
	});
});

angularRoutingApp.controller('mainController', function($scope, $location){	
	$scope.doLogin = function() {
		ajaxrest.login();
	},	
	$scope.doView = function (hash) {
		$location.path(hash);
	}
});

angularRoutingApp.controller('loginController', function($scope, $routeParams) {
	$scope.email = $routeParams.email;
});

angularRoutingApp.controller('cuentaController', function($scope) {
	$scope.setAccount = function () {
		ajaxrest.setAccount('add');
	}
});

angularRoutingApp.controller('terminosController', function($scope) {
	$scope.message = 'Esta es la página de "Terminos"';
});

angularRoutingApp.controller('claveController', function($scope) {
	$scope.message = 'Esta es la página de "Recuperar contraseña"';
});
