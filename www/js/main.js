	// Creación del módulo
	var angularRoutingApp = angular.module('angularRoutingApp', ["ngRoute","ngSanitize"]);
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
		.when('/categoria/:activity/:idCat/:Nombre', {
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
		.when('/recomendado', {
			templateUrl : 'templates/recomendado.html',
			controller 	: 'recomendadoController'
		})
		.when('/pago', {
			templateUrl : 'templates/pago.html',
			controller 	: 'pagoController'
		})						
		.otherwise({
			redirectTo: '/'
		});
	});

	angularRoutingApp.controller('sliderController', function($scope,$location,Items) {		
		//localStorage.clear();
		setBackground("fondo","");
		setDisplayMenu();

		$scope.recomendado = function () {
			window.location = "internal.html#/recomendado";	
		}		

		$("#totalDish").html(Items.getNumDish());

	});	

	angularRoutingApp.controller('mainController', function($scope,$location,Images,Items,Currency){
		var plato= localStorage.plato;
		setDisplayMenu();
		if($location.url()=="/" || $location.url()=="/menu"){
			setBackground("fondo","");
		}else{
			setBackground("fondoslide","");
		}

		$scope.num_dish= plato;
		
		$("#totalDish").html(Items.getNumDish());

		if(localStorage.cuenta){
			$scope.mi_cuenta="#mi_cuenta";
		}else{
			$scope.mi_cuenta="login.html";
		}
			//Validar imagenes plato existente
			$scope.arroz= Images.setImage(plato,1);
			$scope.bebidas= Images.setImage(plato,2);
			$scope.carnes= Images.setImage(plato,3);
			$scope.guarnicion= Images.setImage(plato,4);
			$scope.sopa= Images.setImage(plato,5);

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
				window.location = "internal.html#/menu";	
			},		
			$scope.detailDish = function (dish) {
				ajaxrest.detailDish(dish.id);
			},		
			$scope.fullDish = function (tipo) {
				$(".verplato").slideToggle();
				$(".verplatoico .img1").toggle();
				return false;
			},
			//Adicionar nuevo plato
			$scope.addDish = function (action) {
				var plato= Items.getLastId();
				var items= Items.getItems(plato);
				if(items<3){
					if(action=="add"){
						alert("Plato actual no esta completo!");
						return false;
					}else{
						var conf=confirm("El plato actual no esta completo.\nDesea continuar?");
						if(conf)$location.path("compras");	
					}					
				}else{
					var ndish= parseInt(plato) + 1;
					localStorage.setItem("plato",ndish);				
					if(action=="add"){
						$scope.num_dish= ndish;
						$scope.arroz= Images.setImage(ndish,1);
						$scope.bebidas= Images.setImage(ndish,2);
						$scope.carnes= Images.setImage(ndish,3);
						$scope.guarnicion= Images.setImage(ndish,4);
						$scope.sopa= Images.setImage(ndish,5);
						$("#totalDish").html(ndish);
					}else{
						$location.path("compras");
					}
					window.location = "internal.html#/menu";
				}
			},	

			//Agregar items a X categoria en plato					
			$scope.setDish = function (dish,action) {
				var plato= localStorage.getItem("plato");
				var activity= localStorage.activity;
				var name= "item_"+plato+"_"+dish.idCat+"_B_"+dish.code;
				var cant=0;
				var redir=false;
				if(!localStorage.getItem(name)){
					localStorage.setItem(name,cant);
					var img=Images.setImage(plato,dish.idCat);
					if(dish.idCat==1){	
						$scope.arroz= img;				
					}
					if(dish.idCat==2){
						$scope.bebidas= img;
					}
					if(dish.idCat==3){
						$scope.carnes= img;
					}
					if(dish.idCat==4){
						$scope.guarnicion= img;
					}
					if(dish.idCat==5){
						$scope.sopa= img;	
					}
					redir=true;
				}else{
					cant=parseInt(localStorage.getItem(name));
				}
				if(action=='add'){
					cant= cant + 1;
				}else{
					if(cant>0)cant= cant - 1;										
				}
				if(cant>0){
					localStorage.setItem(name,cant);
					$("#numb_"+dish.code).html(cant).fadeIn();
				}else{
					localStorage.removeItem(name);
					$("#numb_"+dish.code).html('').fadeOut();
					var img=Images.setImage(plato,dish.idCat);
					if(dish.idCat==1){	
						$scope.arroz= img;				
					}
					if(dish.idCat==2){
						$scope.bebidas= img;
					}
					if(dish.idCat==3){
						$scope.carnes= img;
					}
					if(dish.idCat==4){
						$scope.guarnicion= img;
					}
					if(dish.idCat==5){
						$scope.sopa= img;	
					}					
				}
				var items=Items.getItemsxCat(plato,dish.idCat);
				if(!localStorage.getItem('stop') && items>1 && action=="add"){
					$scope.precio= Currency.setMoney(dish.price, 0, ",", ".");
					$(".costoad").fadeIn();
				}				
				if(redir==true && activity=="ins")window.location = "internal.html#/menu";
				if(redir==true && activity=="edit")window.location = "internal.html#/compras";
			},	
			$scope.closeDish = function (dish) {
				$(".verplato").slideToggle();
				$(".verplatoico .img1").show();
			},
			$scope.playAudio = function (dish) {
				ajaxrest.playAudio(dish.code);
			},
			$scope.goMenu = function () {
				var dish=1;
				if(Items.getNumDish()>0)dish=Items.getNumDish();
				localStorage.plato=dish;
				$("li").removeClass("active");
				$(".menupie ul li:nth-child(2)").addClass("active");
			}		
		});

	angularRoutingApp.controller('comprasController', function($scope,Items,Currency) {
		var plato='';		
		var dishes=[];
		
		for(var j=0;j<localStorage.length;j++){
			var item= localStorage.key(j);
			if(item.indexOf("item_")==0){
				var dish=item.split("_");
				dishes.push(dish[1]);
			}
		}
		var farr= compressArray(dishes).reverse();		
		var tipo="";
		var nDish=farr.length;	
		for(var h=0;h<farr.length;h++){
			var item= farr[h];
			var dish=item.value;//Real ID plato
			var codes="";
			for(var j=0;j<localStorage.length;j++){
				var item= localStorage.key(j);
				if(item.indexOf("item_"+dish)==0){
					var cod=item.split("_");
					codes+=cod[4]+",";
					tipo=cod[3];
				}
			}
			var data= ajaxrest.getItemsxDish("codes="+codes+"&token="+localStorage.token);
			var dat = angular.fromJson(data);
			var c1=0;c2=0;c3=0;c4=0;c5=0;
			var ppal="";
			var extra="";			
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
			var total=0;
			if(tipo=="B")total= parseInt(localStorage.valor_buffet);			
			for(var m=0;m<dat.length;m++){
				var code=dat[m].code;
				var name=dat[m].name;
				var cat=dat[m].idCat;
				var price=parseInt(dat[0].price);
				
				var image=base_url+"resources/images/dish/"+code+"_2.png";	

				var vItem="item_"+dish+"_"+cat+"_"+tipo+"_"+code;
				cant= Items.getExtraDish(vItem)-1;
				var add="";
				if(cant>0){
					add=" (extra X "+cant+")";
					total+= price * cant;						
				}				
				if(cat==1){					
					if(c1==0){
						ppal+="- "+name+add+"</br>";
						arroz=image;
						arrozIco="images/arroz_mini_ok.png";						
					}else{
						extra+="- "+name+add+"</br>";
					}					
					c1++;
				}
				if(cat==2){					
					if(c2==0){
						ppal+="- "+name+add+"</br>";
						bebidas=image;
						bebidasIco="images/bebidas_mini_ok.png";						
					}else{						
						extra+="- "+name+add+"</br>";
					}
					c2++;
				}
				if(cat==3){					
					if(c3==0){
						ppal+="- "+name+add+"</br>";
						carnes=image;
						carnesIco="images/carnes_mini_ok.png";						
					}else{
						extra+="- "+name+add+"</br>";						
					}
					c3++;
				}
				if(cat==4){					
					if(c4==0){
						ppal+="- "+name+add+"</br>";
						guarnicion=image;
						guarnicionIco="images/guarnicion_mini_ok.png";						
					}else{
						extra+="- "+name+add+"</br>";
					}
					c4++;
				}
				if(cat==5){					
					if(c5==0){
						ppal+="- "+name+add+"</br>";
						sopa=image;		
						sopaIco="images/sopas_mini_ok.png";						
					}else{
						extra+="- "+name+add+"</br>";
					}
					c5++;
				}																				
			}			
			plato+='<div class="comprasitem" id="dish_'+dish+'"><div class="imgcont" ><div class="padre"><div class = "derrap"><div class="contenedor"><div class="sopa"><img src="images/plato_2.png" style="width:100%;" border="0" margin="0"/><div class="sopacont"><img src="'+sopa+'" style="width:100%;" border="0" margin="0" /></div></div><div class="vaso"><img src="images/plato_3.png" style="width:100%;" border="0" margin="0"/><div class="jugo"><img src="'+bebidas+'" style="width:100%;" border="0" margin="0"/></div></div><div class="plato"><img src="images/plato.png" style="width:100%;" border="0" margin="0"/><div class="arroz"><img src="'+arroz+'" style="width:100%;" border="0" margin="0"/></div><div class="guarnicion"><img src="'+guarnicion+'" style="width:100%;" border="0" margin="0"/></div><div class="carne"><img src="'+carnes+'" style="width:100%;" border="0" margin="0"/></div></div></div></div></div></div><div class="contnn"><h3>Plato #'+(nDish)+'</h3><p>'+ppal+extra+'</p></p><div class="icodeli"><a href="#compras" onclick="setFinalOrder('+dish+',\'less\')"><span class="elimina"></span></a><span class="contador"><label id="cont_'+dish+'">1</label></span><a href="#compras" onclick="setFinalOrder('+dish+',\'add\')"><span class="suma"></span></a></div></div><div class="icodeta"><div><img src="'+sopaIco+'" alt="..." title="..." onclick="editDish(5,\'sopas y cremas\','+dish+')"></div><div><img src="'+arrozIco+'" alt="..." title="..." onclick="editDish(1,\'arroz\','+dish+')"></div><div><img src="'+carnesIco+'" alt="..." title="..." onclick="editDish(3,\'carnes\','+dish+')"></div><div><img src="'+guarnicionIco+'" alt="..." title="..." onclick="editDish(4,\'guarnición\','+dish+')"></div><div><img src="'+bebidasIco+'" alt="..." title="..." onclick="editDish(2,\'bebidas\','+dish+')"></div> <div class="subtt"><input type="hidden" name="price_'+dish+'" id="price_'+dish+'" value="'+total+'" /><label class="currency" id="lprice_'+dish+'">$'+Currency.setMoney(total, 0, ",", ".")+'</label></div></div>';
			nDish--;
		}
		var contPago='<div class="contpag"><div class="cont">Continúe con el pago</div></div>';		
		$("#miscompras").html(plato+contPago);
		if(plato=="")$(".costoad").fadeIn();	
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

	angularRoutingApp.controller('categoriaController', function($scope,$routeParams,$http,Images,Currency) {		
		setDisplayMenu();		
		$(".detalle").hide();
		$scope.precio_plato= Currency.setMoney(localStorage.valor_buffet, 0, ",", ".");
		var plato=localStorage.plato;
		$scope.plato= plato;
		var cat= $routeParams.idCat;
		localStorage.activity=$routeParams.activity;

		ajaxrest.getDishes("category="+cat+"&token="+localStorage.token+"&dimension="+localStorage.dimension);
		var datos=$("#datos").val();
		$scope.dishes = angular.fromJson(datos);		

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
		$scope.arroz= Images.setImage(plato,1);
		$scope.bebidas= Images.setImage(plato,2);
		$scope.carnes= Images.setImage(plato,3);
		$scope.guarnicion= Images.setImage(plato,4);
		$scope.sopa= Images.setImage(plato,5);

		$scope.viewDish = function () {
			$scope.arroz= Images.setImage(plato,1);
			$scope.bebidas= Images.setImage(plato,2);
			$scope.carnes= Images.setImage(plato,3);
			$scope.guarnicion= Images.setImage(plato,4);
			$scope.sopa= Images.setImage(plato,5);
		}		
	});

	angularRoutingApp.controller('terminosController', function($scope) {
		$scope.message = 'Esta es la página de "Terminos"';
	});

	angularRoutingApp.controller('recomendadoController', function($scope,$location,Currency) {
		$(".menupie").css("bottom","-12%");
		setBackground("fondo","");
		var items="";
		if(localStorage.token){
			var data= ajaxrest.getDishDay("token="+localStorage.token);
			var dat = angular.fromJson(data);
			if(dat.length>0){
				for(var i=0;i<dat.length;i++){
					if(dat[i].idCat==1)$scope.arroz= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
					if(dat[i].idCat==2)$scope.bebidas= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
					if(dat[i].idCat==3)$scope.carnes= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
					if(dat[i].idCat==4)$scope.guarnicion= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
					if(dat[i].idCat==5)$scope.sopas= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
					items+="- "+dat[i].name+"<br/>";
				}
			}
		}
		$scope.items = items;
		$scope.price = Currency.setMoney(localStorage.valor_recomendado, 0, ",", ".");	
		$scope.goTo = function (page) {
			$location.path(page);	
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
			setImage: function(dish,cat) {
				var image="images/sp.gif";
				var cont=0;
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_"+dish+"_"+cat)==0){						
						if(item && cont==0){
							var code=item.split("_");
							image= base_url+"resources/images/dish/"+code[4]+"_2.png";
							cont++;
						}
					}
				}			
				return image;
			}
		};
	});

	angularRoutingApp.factory('Currency', function () {
		return {
			setMoney: function(numero, decimales, separador_decimal, separador_miles) {
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
			getLabelDish: function() {
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
				alert(JSON.stringify(farr));								
				return 0;
			},			
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
				for (var j = 0; j < farr.length; j++){					
					var item=farr[j].value.split("_");
					arr.push("item_"+item[1]);
				}
				var com= compressArray(arr);
				var total=[];
				for (var h = 0; h < com.length; h++){					
					var value= com[h].count;
					total.push(com[h].value);
				}								
				return total.length;
			},
			getLastId: function() {
				var arr=[];		
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					var dish= item.split("_");
					if(item.indexOf("item_")==0)arr.push(dish[1]);
				}
				var total=compressArray(arr);
				var last_element=1;
				if(total.length>0){
					last_element = total[total.length - 1].value;
				}				
				return last_element;
			},						
			getItems: function(dish) {
				var items=0;c1=0;c2=0;c3=0;c4=0;c5=0;
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_"+dish+"_1")==0 && c1==0){items++;c1=1;}
					if(item.indexOf("item_"+dish+"_2")==0 && c2==0){items++;c2=1;}
					if(item.indexOf("item_"+dish+"_3")==0 && c3==0){items++;c3=1;}
					if(item.indexOf("item_"+dish+"_4")==0 && c4==0){items++;c4=1;}
					if(item.indexOf("item_"+dish+"_5")==0 && c5==0){items++;c5=1;}
				}
				return items;
			},
			getExtraDish: function(value) {
				var cant=0;
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item==value){
						cant+=parseInt(localStorage.getItem(item));
					}
				}
				return cant;
			},			
			getItemsxCat: function(Dish,cat) {
				var items=0;
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_"+Dish+"_"+cat)==0){
						items+=parseInt(localStorage.getItem(item));
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
			}								
		};
	});	