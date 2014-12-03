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

	angularRoutingApp.controller('mainController', function($scope,$location,Images,Items){				
		$scope.num_dish=localStorage.plato;
		var platos= Items.getNumDish();
		localStorage.platos = platos;

		if(localStorage.cuenta){
			$scope.mi_cuenta="#mi_cuenta";
		}else{
			$scope.mi_cuenta="login.html";
		}


			//Validar imagenes plato existente
			var actualDish= $scope.num_dish;
			$scope.arroz= $scope.someText=Images.getImage(actualDish,1);
			$scope.bebidas= $scope.someText=Images.getImage(actualDish,2);
			$scope.carnes= $scope.someText=Images.getImage(actualDish,3);
			$scope.guarnicion= $scope.someText=Images.getImage(actualDish,4);
			$scope.sopa= $scope.someText=Images.getImage(actualDish,5);



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
			$scope.addDish = function (action) {
				var items=Items.getItems(localStorage.plato);
				if(items<3){
					if(action=="add"){
						alert("Plato actual no esta completo!");
						return false;
					}else{
						var conf=confirm("El plato actual no esta completo.\nDesea continuar?");
						if(conf)$location.path("compras");	
					}					
				}else{
					if(action=="add"){
					var ndish= parseInt(localStorage.plato) + 1;
					$scope.num_dish= ndish;
					localStorage.plato=ndish;

					$scope.arroz= Images.getImage(ndish,1);
					$scope.bebidas= Images.getImage(ndish,2);
					$scope.carnes= Images.getImage(ndish,3);
					$scope.guarnicion= Images.getImage(ndish,4);
					$scope.sopa= Images.getImage(ndish,5);
					}else{
						$location.path("compras");
					}
				}
			},						
			$scope.setDish = function (dish,action) {
				var plato= localStorage.plato;
				var num= parseInt($("#numb_"+dish.code).text());
				var val= 0;
				if(action=='add'){
					val= num + 1;
				}else{
					if(num>0)val= num - 1;
				}
				var name= "item_"+plato+"_"+dish.idCat;
				localStorage.setItem(name, dish.code);


				if(dish.idCat==1){	
					$scope.arroz= base_url+"resources/images/dish/"+localStorage.getItem(name)+"_2.png";				
				}
				if(dish.idCat==2){
					$scope.bebidas= base_url+ "resources/images/dish/"+localStorage.getItem(name)+"_2.png";
				}
				if(dish.idCat==3){
					$scope.carnes= base_url+ "resources/images/dish/"+localStorage.getItem(name)+"_2.png";
				}
				if(dish.idCat==4){
					$scope.guarnicion= base_url+ "resources/images/dish/"+localStorage.getItem(name)+"_2.png";
				}
				if(dish.idCat==5){
					$scope.sopa= base_url+ "resources/images/dish/"+localStorage.getItem(name)+"_2.png";	
				}			

				if(val>1){
					localStorage.setItem("adicional_"+plato+"_"+dish.idCat, dish.code);
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

	angularRoutingApp.controller('comprasController', function($scope,Items) {		
		var plato='';
		for (var i = 1; i <= localStorage.plato; i++){
			var items= Items.getItems(i);
			var details= Items.getDetail(i);
			var aditionals= Items.getAditional(i);
			
			var opciones="";
			var adicionales="";
			var total=0;

			var arroz="images/sp.gif";
			var bebidas="images/sp.gif";
			var carnes="images/sp.gif";
			var guarnicion="images/sp.gif";
			var sopa="images/sp.gif";

			var arrozIco="images/arroz_mini.png";
			var bebidasIco="images/bebidas_mini.png";
			var carnesIco="images/carnes_mini.png";
			var guarnicionIco="images/guarnicion_mini.png";
			var sopaIco="images/sopas_mini.png";		

			for(var j=0;j<details.length;j++){
				opciones+= "- "+details[j].name+"<br/>";
				total+= parseInt(details[j].price);
				var image=base_url+"resources/images/dish/"+details[j].code+"_2.png";
				if(details[j].idCat==1){
					arroz=image;
					arrozIco="images/arroz_mini_ok.png";
				}
				if(details[j].idCat==2){
					bebidas=image;
					bebidasIco="images/bebidas_mini_ok.png";
				}
				if(details[j].idCat==3){
					carnes=image;
					carnesIco="images/carnes_mini_ok.png";
				}
				if(details[j].idCat==4){
					guarnicion=image;
					guarnicionIco="images/guarnicion_mini_ok.png";
				}
				if(details[j].idCat==5){
					sopa=image;		
					sopaIco="images/sopas_mini_ok.png";
				}
			}

			for(var h=0;h<aditionals.length;h++){
				adicionales+= "Adicional: "+details[h].name+"<br/>";
				total+= parseInt(details[h].price);
			}			
			
			plato='<div class="comprasitem"><div class="imgcont" ><div class="padre"><div class = "derrap"><div class="contenedor"><div class="sopa"><img src="images/plato_2.png" style="width:100%;" border="0" margin="0"/><div class="sopacont"><img src="'+sopa+'" style="width:100%;" border="0" margin="0"/></div></div><div class="vaso"><img src="images/plato_3.png" style="width:100%;" border="0" margin="0"/><div class="jugo"><img src="'+bebidas+'" style="width:100%;" border="0" margin="0"/></div></div><div class="plato"><img src="images/plato.png" style="width:100%;" border="0" margin="0"/><div class="arroz"><img src="'+arroz+'" style="width:100%;" border="0" margin="0"/></div><div class="guarnicion"><img src="'+guarnicion+'" style="width:100%;" border="0" margin="0"/></div><div class="carne"><img src="'+carnes+'" style="width:100%;" border="0" margin="0"/></div></div></div></div></div></div><div class="contnn"><h3>Plato #'+i+'</h3><p>'+opciones+adicionales+'</p></p><div class="icodeli"><a href="" ng-click="lessDish"><span class="elimina"></span></a><span class="contador"><label>1</label></span><a href="" ng-click="lessDish"><span class="suma"></span></a></div></div><div class="icodeta"><div><img src="'+sopaIco+'" alt="..." title="..."></div><div><img src="'+arrozIco+'" alt="..." title="..."></div><div><img src="'+carnesIco+'" alt="..." title="..."></div><div><img src="'+guarnicionIco+'" alt="..." title="..."></div><div><img src="'+bebidasIco+'" alt="..." title="..."></div> <div class="subtt"><label class="currency">$'+total+'</label></div></div>';
		}
		var contPago='<div class="contpag"><div class="cont">Continúe con el pago</div></div>';
		$("#miscompras").html(plato+contPago);
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

	angularRoutingApp.controller('categoriaController', function($scope,$routeParams,$http,Images) {		
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
		ajaxrest.setNumDishes(localStorage.plato,cat);

		$scope.arroz= $scope.someText=Images.getImage(localStorage.plato,1);
		$scope.bebidas= $scope.someText=Images.getImage(localStorage.plato,2);
		$scope.carnes= $scope.someText=Images.getImage(localStorage.plato,3);
		$scope.guarnicion= $scope.someText=Images.getImage(localStorage.plato,4);
		$scope.sopa= $scope.someText=Images.getImage(localStorage.plato,5);		
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

	//Use: <div>{{Price | noFractionCurrency}}</div>
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


	angularRoutingApp.factory('Images', function () {
		return {
			getImage: function(actualDish,cat) {
				var image="images/sp.gif";
				var item=localStorage.getItem('item_'+actualDish+"_"+cat);
				if(item)image= base_url+"resources/images/dish/"+item+"_2.png";
				return image;
			}
		};
	});

	angularRoutingApp.factory('Items', function () {
		return {
			getNumDish: function() {
				var items=0;
				var cont=[];
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_")==0){
						var dish=item.substring(item.lastIndexOf("item_"),item.lastIndexOf("_"));
						cont.push(dish);
						items++;
					}
				}
				cont = $.grep(cont, function(v, k){
				    return $.inArray(v ,cont) === k;
				});				
				return cont.length;
			},			
			getItems: function(Dish) {
				var items=0;
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_"+Dish)==0){
						items++;
					}
				}
				return items;
			},
			getDetail: function(Dish) {
				var codes="";
				var dat=[];
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_"+Dish)==0){
						codes+= localStorage.getItem(item)+',';
					}				
				}
				if(codes.length>3){				
				var data= ajaxrest.getItemsxDish("codes="+codes+"&token="+localStorage.token);
				var dat = angular.fromJson(data);
				}		
				return dat;
			},
			getAditional: function(Dish) {
				var codes="";
				var dat=[];
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("adicional_"+Dish)==0){
						codes+= localStorage.getItem(item)+',';
					}				
				}
				if(codes.length>3){				
				var data= ajaxrest.getItemsxDish("codes="+codes+"&token="+localStorage.token);
				var dat = angular.fromJson(data);
				}		
				return dat;
			}						
		};
	});	