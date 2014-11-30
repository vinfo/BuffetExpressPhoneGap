	// Creación del módulo
	var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);
	var localData = JSON.parse(localStorage.getItem('cuenta'));
	var num = localStorage.setItem("num",0);
	var base_url="http://buffetexpress.co/REST/";

	// Configuración de las rutas
	angularRoutingApp.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl : 'templates/slider.html',
			controller 	: 'mainController'
		})	
		.when('/slider', {
			templateUrl	: 'templates/slider.html',
			controller 	: 'mainController'
		})
		.when('/menu', {
			templateUrl : 'templates/menu.html',
			controller 	: 'mainController'
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
		.when('/redes', {
			templateUrl : 'templates/redes.html',
			controller 	: 'mainController'
		})
		.when('/nosotros', {
			templateUrl : 'templates/nosotros.html',
			controller 	: 'mainController'
		})
		.when('/felicitaciones', {
			templateUrl : 'templates/felicitaciones.html',
			controller 	: 'mainController'
		})	
		.when('/contactenos', {
			templateUrl : 'templates/contactenos.html',
			controller 	: 'mainController'
		})
		.when('/redes', {
			templateUrl : 'templates/redes.html',
			controller 	: 'mainController'
		})		
		.otherwise({
			redirectTo: '/'
		});
	});

	angularRoutingApp.controller('mainController', function($scope, $location){			
		$('.menupie').fadeIn();
		$scope.setFondo = function() {
			var style1 = "background: url(images/fondo.png)";
			var style2 = "background: url(images/fondoslide.png)";
			if($location.url()=="/" || $location.url()=="/menu"){
				return style1;		  	
			}else{
				return style2;				
			}
		}			
		
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
			ajaxrest.detailDish(dish.id);
		},		
		$scope.fullDish = function (tipo) {
			$(".verplato").slideToggle();
			$(".verplatoico .img1").toggle();
			return false;
		},				
		$scope.addDish = function (dish) {
			if(dish.idCat==1){
				localStorage.setItem("arroz", {code:dish.code, price:dish.price});
				$scope.arroz= base_url+"resources/images/dish/"+dish.code+"_2.png";		
			}
			if(dish.idCat==2){
				localStorage.setItem("bebidas", {code:dish.code, price:dish.price});
				$scope.bebidas= base_url+ "resources/images/dish/"+dish.code+"_2.png";		
			}
			if(dish.idCat==3){
				localStorage.setItem("carnes", {code:dish.code, price:dish.price});
				$scope.carnes= base_url+ "resources/images/dish/"+dish.code+"_2.png";		
			}
			if(dish.idCat==4){
				localStorage.setItem("guarnicion", {code:dish.code, price:dish.price});
				$scope.guarnicion= base_url+ "resources/images/dish/"+dish.code+"_2.png";		
			}
			if(dish.idCat==5){
				localStorage.setItem("sopa", {code:dish.code, price:dish.price});
				$scope.sopa= base_url+ "resources/images/dish/"+dish.code+"_2.png";		
			}
			window.plugins.toast.showShortCenter('Producto Adicionado!');
			$location.path("menu");	
		},	
		$scope.closeDish = function (dish) {
			$(".verplato").slideToggle();
			$(".verplatoico .img1").show();
		},
		$scope.playAudio = function (dish) {
			ajaxrest.playAudio(dish.code);
		},
		$scope.goMenu = function () {
			$("li").removeClass("active");
			$(".menupie ul li:nth-child(2)").addClass("active");
		}		
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
		var data= ajaxrest.getUser("email="+localData['email']+"&token="+localStorage.token);	
		var dat = angular.fromJson(data);
		$scope.email = localData['email'];
		$scope.name = dat[0].name;
		$scope.lastname = dat[0].lastname;
		$scope.cellPhone = dat[0].cellPhone;
	}else{
		$scope.changeRoute('login.html#/login');
	}	
});

	angularRoutingApp.controller('terminosController', function($scope) {
		$scope.message = 'Esta es la página de "Terminos"';
	});

	angularRoutingApp.controller('categoriaController', function($scope,$routeParams,$http) {		
		$(".detalle").hide();
		var cat= $routeParams.idCat;
		var data= ajaxrest.getDishes("category="+cat+"&prox=0&cant=2&token="+localStorage.token+"&dimension="+localStorage.dimension);
		$scope.dishes = angular.fromJson(data);

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
		$("#cat").val(cat+'|'+$scope.imageCat);
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