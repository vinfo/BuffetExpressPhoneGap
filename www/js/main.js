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
		.when('/pago', {
			templateUrl : 'templates/pago.html',
			controller 	: 'pagoController'
		})				
		.otherwise({
			redirectTo: '/'
		});
	});

	angularRoutingApp.controller('mainController', function($scope,$location,Images,Items){
		var platos= localStorage.plato;
		if(jQuery.parseJSON(Items.getNumDish()).platos>0)platos=jQuery.parseJSON(Items.getNumDish()).platos;		
		$scope.num_dish= platos;
		
		$("#totalDish").html(platos);

		if(localStorage.cuenta){
			$scope.mi_cuenta="#mi_cuenta";
		}else{
			$scope.mi_cuenta="login.html";
		}


			//Validar imagenes plato existente
			$scope.arroz= $scope.someText=Images.getImage(platos,1);
			$scope.bebidas= $scope.someText=Images.getImage(platos,2);
			$scope.carnes= $scope.someText=Images.getImage(platos,3);
			$scope.guarnicion= $scope.someText=Images.getImage(platos,4);
			$scope.sopa= $scope.someText=Images.getImage(platos,5);



			$scope.setFondo = function() {
				var style1 = "background: url(images/fondo.png)";
				var style2 = "background: url(images/fondoslide.png)";
				if($location.url()=="/" || $location.url()=="/menu"){
					return style1;		  	
				}else{
					return style2;				
				}
			},
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
				var items=Items.getItems(platos);
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
						var ndish= parseInt(platos) + 1;
						$scope.num_dish= ndish;
						localStorage.plato=platos;

						$scope.arroz= Images.getImage(ndish,1);
						$scope.bebidas= Images.getImage(ndish,2);
						$scope.carnes= Images.getImage(ndish,3);
						$scope.guarnicion= Images.getImage(ndish,4);
						$scope.sopa= Images.getImage(ndish,5);
						$("#totalDish").html(jQuery.parseJSON(Items.getNumDish()).platos);
					}else{
						$location.path("compras");
					}
				}
			},					
			$scope.setDish = function (dish,action) {
				var plato= localStorage.plato;
				var name= "item_"+plato+"_"+dish.idCat;
				var val= 0;
				if(localStorage.getItem(name))val= 1;

				var cnt=0;
				if(localStorage.getItem("adicional_"+plato+"_"+dish.idCat+"_"+dish.code)){
					cnt= jQuery.parseJSON(localStorage.getItem("adicional_"+plato+"_"+dish.idCat+"_"+dish.code));
				}
				var total= val + cnt;
				if(action=='add'){
					val= total + 1;
				}else{
					if(total>0)val= total - 1;
				}
				
				if(!localStorage.getItem(name))localStorage.setItem(name, dish.code);

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
					var op=cnt;
					if(action=='add'){
						op+=1;
					}else{
						op-=1;
					}					
					localStorage.setItem("adicional_"+plato+"_"+dish.idCat+"_"+dish.code, op);
					$scope.precio= dish.price;
					if(!localStorage.getItem('stop') && action=="add")$(".costoad").fadeIn();	
				}else{
					localStorage.removeItem("adicional_"+plato+"_"+dish.idCat); 
				}

				if(val==0){
					localStorage.removeItem(name); 
				}       
				//$("#numb_"+dish.code).text(val).fadeIn('fast');
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

	angularRoutingApp.controller('comprasController', function($scope,Items,Currency) {
		var plato='';
		var platos= jQuery.parseJSON(Items.getNumDish());
		
		for (var i = 0; i < platos.names.length; i++){
			var item= platos.names[i].split('_');
			var num= item[1];
			var items= Items.getItems(num);
			var details= Items.getDetail(num);
			var aditionals= Items.getAditional(num);
			
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
				var cant= localStorage.getItem("adicional_"+num+"_"+aditionals[h].idCat+"_"+aditionals[h].code);
				adicionales+= "Adicional: "+aditionals[h].name+" X "+cant+"<br/>";
				total+= parseInt(details[h].price)*cant;
			}
			plato+='<div class="comprasitem"><div class="imgcont" ><div class="padre"><div class = "derrap"><div class="contenedor"><div class="sopa"><img src="images/plato_2.png" style="width:100%;" border="0" margin="0"/><div class="sopacont"><img src="'+sopa+'" style="width:100%;" border="0" margin="0" /></div></div><div class="vaso"><img src="images/plato_3.png" style="width:100%;" border="0" margin="0"/><div class="jugo"><img src="'+bebidas+'" style="width:100%;" border="0" margin="0"/></div></div><div class="plato"><img src="images/plato.png" style="width:100%;" border="0" margin="0"/><div class="arroz"><img src="'+arroz+'" style="width:100%;" border="0" margin="0"/></div><div class="guarnicion"><img src="'+guarnicion+'" style="width:100%;" border="0" margin="0"/></div><div class="carne"><img src="'+carnes+'" style="width:100%;" border="0" margin="0"/></div></div></div></div></div></div><div class="contnn"><h3>Plato #'+(i+1)+'</h3><p>'+opciones+adicionales+'</p></p><div class="icodeli"><a href="" ng-click="lessDish"><span class="elimina"></span></a><span class="contador"><label>1</label></span><a href="" ng-click="lessDish"><span class="suma"></span></a></div></div><div class="icodeta"><div><img src="'+sopaIco+'" alt="..." title="..." onclick="editDish(5,\'sopas y cremas\','+num+')"></div><div><img src="'+arrozIco+'" alt="..." title="..." onclick="editDish(1,\'arroz\','+num+')"></div><div><img src="'+carnesIco+'" alt="..." title="..." onclick="editDish(3,\'carnes\','+num+')"></div><div><img src="'+guarnicionIco+'" alt="..." title="..." onclick="editDish(4,\'guarnición\','+num+')"></div><div><img src="'+bebidasIco+'" alt="..." title="..." onclick="editDish(2,\'bebidas\','+num+')"></div> <div class="subtt"><label class="currency">$'+Currency.getMoney(total, 0, ",", ".")+'</label></div></div>';
		}
		var contPago='<div class="contpag"><div class="cont" onclick="doPay('+platos.platos+')">Continúe con el pago</div></div>';
		$("#miscompras").html(plato+contPago);
		$("#totalDish").html(platos.platos);
	});

	angularRoutingApp.controller('loginController', function($scope) {
		$scope.message = 'Esta es la página de "Login"';
	});

	angularRoutingApp.controller('loginController', function($scope) {
		$scope.message = 'Esta es la página de "Login"';
	});	

	angularRoutingApp.controller('sliderController', function($scope,$location,Items) {
		$scope.recomendado = function () {
			var rec=confirm("Desea adicionar el Recomendado del Día al carro de compras?");
			if(rec)localStorage.setItem("recomendado",1);
			window.location = "internal.html#/compras";		
		}		

		$("#totalDish").html(jQuery.parseJSON(Items.getNumDish()).platos);
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
		var plato=localStorage.plato;
		$scope.plato= plato;
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
		ajaxrest.setNumDishes(plato,cat);

		$scope.arroz= $scope.someText=Images.getImage(plato,1);
		$scope.bebidas= $scope.someText=Images.getImage(plato,2);
		$scope.carnes= $scope.someText=Images.getImage(plato,3);
		$scope.guarnicion= $scope.someText=Images.getImage(plato,4);
		$scope.sopa= $scope.someText=Images.getImage(plato,5);		
	});


	angularRoutingApp.controller('pagoController', function($scope,Items) {
		$("#totalDish").html(jQuery.parseJSON(Items.getNumDish()).platos);
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

	angularRoutingApp.factory('Currency', function () {
		return {
			getMoney: function(numero, decimales, separador_decimal, separador_miles) {
				numero=parseFloat(numero);
				if(isNaN(numero)){
					return "";
				}

				if(decimales!==undefined){
			        // Redondeamos
			        numero=numero.toFixed(decimales);
			    }

			    // Convertimos el punto en separador_decimal
			    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");

			    if(separador_miles){
			        // Añadimos los separadores de miles
			        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
			        while(miles.test(numero)) {
			        	numero=numero.replace(miles, "$1" + separador_miles + "$2");
			        }
			    }

			    return numero;
			}
		};
	});	

	angularRoutingApp.factory('Items', function () {
		return {
			getNumDish: function() {
				var items=0;
				var dishes=0;
				var cont=[];
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_")==0){
						var dish=item.substring(item.lastIndexOf("item_"),item.lastIndexOf("_"));
						cont.push(dish);
						items++;
					}
				}

				var farr= compressArray(cont);				
				var arr=[];
				for(var j=0;j<farr.length;j++){
					if(farr[j].count>2)arr.push(farr[j].value);
				}

				arr = $.grep(arr, function(v, k){
					return $.inArray(v ,arr) === k;
				});		
				if(arr.length>0)dishes=arr.length;
				var data={"platos":dishes,"names":arr};
				return JSON.stringify(data);
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
						var dish=item.split('_');
						codes+= dish[3] +',';
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