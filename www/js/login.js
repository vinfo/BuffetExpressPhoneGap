// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'templates/login.html',
		controller 	: 'loginController'
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

angularRoutingApp.controller('loginController', function($scope, $location,$routeParams) {
	$scope.doLogin = function() {
		ajaxrest.login();
	},	
	$scope.doView = function (hash) {
		$location.path(hash);
	}
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
		$scope.getPass = function (email) {
			var data= ajaxrest.getUser("email="+email+"&token="+localStorage.token);	
			var dat= angular.fromJson(data);
			if(dat[0].name!="" && dat[0].name!=""){
				var data= ajaxrest.getPass("email="+email+"&identity="+dat[0].identity+"&token="+localStorage.token);
			}
		}
});
