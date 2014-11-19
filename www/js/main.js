	// Creación del módulo
	var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);
	var localData = JSON.parse(localStorage.getItem('cuenta'));


	// Configuración de las rutas
	angularRoutingApp.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl : 'templates/slider.html',
			controller 	: 'mainController'
		})	
		.when('/slider', {
			templateUrl	: 'templates/slider.html',
			controller 	: 'sliderController'
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
		.when('/mi_cuenta', {
			templateUrl : 'templates/mi_cuenta.html',
			controller 	: 'mi_cuentaController'
		})	
		.when('/categoria/:idCat/:Nombre', {
			templateUrl : 'templates/categoria.html',
			controller 	: 'categoriaController'
		})
		.otherwise({
			redirectTo: '/'
		});
	});

	angularRoutingApp.controller('mainController', function($scope, $location){		 
		 $scope.doLogin = function() {
			ajaxrest.login();
		},	
		$scope.doCuenta = function (hash) { 
			$location.path(hash);
		},
		$scope.checkLogin = function (section) {		
			if(localData['cellPhone']!=""){
				$location.path("index.html#/menu");
			}else{
				$location.path("/login.html");
			}
		},
		$scope.setAccount = function () {
			ajaxrest.setAccount('edit');
		},
		$scope.hiddeMenu = function () {
			hiddeMenu();
		},
		$scope.detailDish = function (dish) {
			$("#detalle_"+dish.id).slideToggle();
		},
		$scope.fullDish = function () {
			$(".verplato").slideToggle();
			$(".verplatoico .img1").toggle();
		},
		$scope.playAudio = function () {
			ajaxrest.playAudio();
		}
	});

	angularRoutingApp.controller('sliderController', function($scope) {
		$scope.message = 'Esta es la página de "Main"';
	});

	angularRoutingApp.controller('menuController', function($scope) {
		$scope.message = 'Esta es la página de "Menu"';
	});

	angularRoutingApp.controller('comprasController', function($scope) {
		$scope.message = 'Esta es la página de "Compras"';
	});

	angularRoutingApp.controller('loginController', function($scope) {
		$scope.message = 'Esta es la página de "Login"';
	});

	angularRoutingApp.controller('mi_cuentaController', function($scope) {
		$scope.changeRoute = function(url, forceReload) {
			$scope = $scope || angular.element(document).scope();
	        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
	        	window.location = url;
	    } else {
	    	$location.path(url);
	    	$scope.$apply();
	    }
	};		
	if(localData!=null && localData!=""){
		$scope.email = localData['email'];
		$scope.name = localData['name'];
		$scope.lastname = localData['lastname'];
		$scope.cellPhone = localData['cellPhone'];
	}else{
		$scope.changeRoute('login.html#/cuenta');
	}
});

	angularRoutingApp.controller('terminosController', function($scope) {
		$scope.message = 'Esta es la página de "Terminos"';
	});

	angularRoutingApp.controller('categoriaController', function($scope,$routeParams,$http) {
		var cat=$routeParams.idCat;
		var data= ajaxrest.getDishes("category="+cat+"&token="+localStorage.token);
		$scope.dishes=angular.fromJson(data);
		$scope.imageCat="sopas_mini";
		if(cat==1){
			$scope.imageCat="arroz_mini";
		}else if(cat==2){
			$scope.imageCat="bebidas_mini";
		}else if(cat==3){
			$scope.imageCat="carnes_mini";
		}else if(cat==4){
			$scope.imageCat="guarnicion_mini";
		}	
	});

	angularRoutingApp.controller("mapaController", ["$scope", function mapaController($scope) {		
		$scope.Adress = "6.270318, -75.595974";
	}]);

	angularRoutingApp.directive('wrapOwlcarousel', function () {
		return {
			restrict: 'E',
			link: function (scope, element, attrs) {
				var options = scope.$eval($(element).attr('data-options'));
				var owl =$(element).owlCarousel(options);
				//options.goTo(3);
			}
		};
	});

	angularRoutingApp.filter('noFractionCurrency',
		[ '$filter', '$locale', function(filter, locale) {
			var currencyFilter = filter('currency');
			var formats = locale.NUMBER_FORMATS;
			return function(amount, num, currencySymbol) {
				if (num===0) num = -1;
				var value = currencyFilter(amount, currencySymbol);
				var sep = value.indexOf(formats.DECIMAL_SEP)+1;
				var symbol = '';
				if (sep<value.indexOf(formats.CURRENCY_SYM)) symbol = ' '+formats.CURRENCY_SYM;
				return value.substring(0, sep+num).replace(/,/g , ".")+symbol;
			};
		} ]);