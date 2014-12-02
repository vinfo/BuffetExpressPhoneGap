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
			controller 	: 'sliderController'
		})	
		.when('/slider', {
			templateUrl	: 'templates/slider.html',
			controller 	: 'sliderController'
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

		if(localStorage.cuenta){
			$scope.mi_cuenta="#mi_cuenta";
		}else{
			$scope.mi_cuenta="login.html";
		}
		

		$scope.num_dish=localStorage.plato;
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
				$location.path("internal.html#/menu");
			}else{
				$location.path("/login.html");
			}
		},
		$scope.setAccount = function () {
			ajaxrest.setAccount('edit');
		},
		$scope.closeSession = function () {
			localStorage.clear();
			$location.path("internal.html");	
		},		
		$scope.hiddeMenu = function () {
			hiddeMenu();
		},
		$scope.close = function (div) {
			$("."+div).hide();
		},
		$scope.stop = function (div) {
			localStorage.setItem("stop", 1);
			$("."+div).hide();
		},		
		$scope.detailDish = function (dish) {
			ajaxrest.detailDish(dish.id);
		},		
		$scope.fullDish = function (tipo) {
			$(".verplato").slideToggle();
			$(".verplatoico .img1").toggle();
			return false;
		},
		$scope.addDish = function () {
			var items=0;
			for (var i = 0; i < localStorage.length; i++){
				var item=localStorage.key(i);
				if(item.indexOf("item_1")>0)items++;
			}
			if(items<4)alert("Plato actual no esta completo!");
		},						
		$scope.setDish = function (dish,action) {
			var num= parseInt($("#numb_"+dish.code).text());
			var val= 0;
			if(action=='add'){
				val= num + 1;
			}else{
				if(num>0)val= num - 1;
			}
			localStorage.setItem("item_1_"+dish.idCat, dish.code);

			if(dish.idCat==1){	
				$scope.arroz= base_url+"resources/images/dish/"+localStorage.item_1_1+"_2.png";				
			}
			if(dish.idCat==2){
				$scope.bebidas= base_url+ "resources/images/dish/"+localStorage.item_1_2+"_2.png";
			}
			if(dish.idCat==3){
				$scope.carnes= base_url+ "resources/images/dish/"+localStorage.item_1_3+"_2.png";
			}
			if(dish.idCat==4){
				$scope.guarnicion= base_url+ "resources/images/dish/"+localStorage.item_1_4+"_2.png";
			}
			if(dish.idCat==5){
				$scope.sopa= base_url+ "resources/images/dish/"+localStorage.item_1_5.code+"_2.png";	
			}			

			if(val>1){
				localStorage.setItem("adicional_1_"+dish.idCat+"_"+dish.code, dish.code);
				$scope.precio=dish.price;
				if(!localStorage.getItem('stop'))$(".costoad").fadeIn();	
			}        
			$("#numb_"+dish.code).text(val).fadeIn('fast');
			//window.plugins.toast.showShortCenter('Producto Adicionado!');
			if(action="add")$location.path("menu");	
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

	angularRoutingApp.controller('loginController', function($scope) {
		$scope.message = 'Esta es la página de "Login"';
	});	

	angularRoutingApp.controller('sliderController', function($scope) {
		$scope.message = 'Esta es la página de "Login"';
		var data= ajaxrest.getDishDay("token="+localStorage.token);
		var dat = angular.fromJson(data);
		for(var i=0;i<dat.length;i++){
			if(dat[i].idCat==1)$scope.arroz= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
			if(dat[i].idCat==2)$scope.bebidas= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
			if(dat[i].idCat==3)$scope.carnes= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
			if(dat[i].idCat==4)$scope.guarnicion= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
			if(dat[i].idCat==5)$scope.sopas= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
		}
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
		$scope.plato= localStorage.plato;
		var cat= $routeParams.idCat;
		var data= ajaxrest.getDishes("category="+cat+"&token="+localStorage.token+"&dimension="+localStorage.dimension);
		$scope.dishes = angular.fromJson(data);
		$scope.datos=data;
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
		ajaxrest.setNumDishes(1,cat);			

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