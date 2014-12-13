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
			controller 	: 'nosotrosController'
		})
		.when('/felicitaciones', {
			templateUrl : 'templates/felicitaciones.html',
			controller 	: 'felicitacionesController'
		})	
		.when('/contactenos', {
			templateUrl : 'templates/contactenos.html',
			controller 	: 'contactenosController'
		})
		.when('/redes', {
			templateUrl : 'templates/redes.html',
			controller 	: 'redesController'
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
		$(".menusup button.ico-menu span").css("background","url(images/linmenu.png)");
		$scope.page="slider";
		setBackground("fondo","");
		setDisplayMenu();

		$scope.recomendado = function () {
			window.location = "internal.html#/recomendado";	
		}		

		$("#totalDish").html(Items.getNumDish());

	});	

	angularRoutingApp.controller('mainController', function($scope,$location,$routeParams,Images,Items,Currency){
		$(".menusup button.ico-menu span").css("background","url(images/linmenu.png)");
		if($routeParams.activity)localStorage.activity=$routeParams.activity;
		var plato= 1;
		if(localStorage.plato)plato=localStorage.plato;

		var checkPlato= Items.getItems(plato);
		var flag=false;
		if(Items.getTypeDish(plato)=="R"){
			plato= Items.getFullLastId()+1;
			flag=true;
		}		

		setDisplayMenu();
		if($location.url()=="/" || $location.url()=="/menu"){
			setBackground("fondo","");
		}else{
			setBackground("fondoslide","");
		}

		if(localStorage.cuenta){
			$scope.mi_cuenta="#mi_cuenta";
		}else{
			$scope.mi_cuenta="login.html";
		}		

			//Validar imagenes plato existente			
			if(Items.getTypeDish(plato)=="B" || Items.getItems(plato)==0){
				$scope.arroz= Images.setImage(plato,1);
				$scope.bebidas= Images.setImage(plato,2);
				$scope.carnes= Images.setImage(plato,3);
				$scope.guarnicion= Images.setImage(plato,4);
				$scope.sopa= Images.setImage(plato,5);
			}


			$scope.num_dish= localStorage.plato;

			$("#totalDish").html(Items.getNumDish());

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
				$scope.mi_cuenta="login.html";
				$location.path("internal.html");
			},		
			$scope.hiddeMenu = function () {
				hiddeMenu();
			},
			$scope.open = function (div) {
				$("."+div).css("display","inline");
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
			//Adicionar nuevo plato
			$scope.addDish = function (action,tipo) {
				var plato= localStorage.plato;
				var items= Items.getItems(plato);
				var checkPlato= Items.getItems(plato);				
				
				var flag=false;
				if(Items.getTypeDish(plato)=="R"){
					plato= Items.getFullLastId()+1;
					flag=true;
				}

				if(!localStorage.getItem("cant_"+tipo+"_"+plato))localStorage.setItem("cant_"+tipo+"_"+plato,1);
				if(items<3 || flag){
					if(action=="add"){
						alert("Plato actual no esta completo!");
						return false;
					}else{
						var conf=confirm("El plato actual no esta completo.\nDesea continuar?");
						if(conf)$location.path("compras");	
					}					
				}else{
					var ndish= parseInt(plato) + 1;				
					if(action=="add"){
						$scope.num_dish= ndish;
						$scope.arroz= Images.setImage(ndish,1);
						$scope.bebidas= Images.setImage(ndish,2);
						$scope.carnes= Images.setImage(ndish,3);
						$scope.guarnicion= Images.setImage(ndish,4);
						$scope.sopa= Images.setImage(ndish,5);	
						localStorage.setItem("plato",ndish);
					}else{
						$("li").removeClass("active");
						$(".menupie ul li:nth-child(3)").addClass("active");						
						$location.path("compras");
					}
					window.location = "internal.html#/menu";
				}
			},	

			//Agregar items a X categoria en plato					
			$scope.setDish = function (dish,action) {				
				var activity= localStorage.activity;
				var plato= localStorage.getItem("plato");
				var checkPlato= Items.getItems(plato);				
				
				var flag=false;
				if(Items.getTypeDish(plato)=="R"){
					plato= Items.getFullLastId()+1;
					flag=true;
				}

				var pos= Items.getPos();
				
				var name= "item_"+plato+"_"+dish.idCat+"_B_"+dish.code;
				var cant=0;
				if(!localStorage.getItem(name)){
					localStorage.setItem(name,JSON.stringify({cant:cant,pos:pos}));
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
				}else{
					var valor=JSON.parse(localStorage.getItem(name));
					cant= parseInt(valor.cant);
				}
				if(action=='add'){
					cant= cant + 1;
				}else{
					if(cant>0)cant= cant - 1;										
				}
				if(cant>0){					
					localStorage.setItem(name,JSON.stringify({cant:cant,pos:pos}));
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
				var redir=true;
				if(!localStorage.getItem('stop') && items>1){
					$scope.precio= Currency.setMoney(dish.price, 0, ",", ".");
					if(action=="add")$(".costoad").fadeIn();
					redir=false;
				}
				localStorage.setItem("plato",plato);
				$("#totalDish").html(Items.getFullLastId());
				if(activity=="ins" && action=="add" && cant!=0 && redir && items<=1)window.location = "internal.html#/menu";
				//if(activity!="edit" && action=="add" && cant!=0 && redir)window.location = "internal.html#/compras";

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
			},
			$scope.goTo = function (page) {
				$location.path(page);
				$("li").removeClass("active");
				$(".menupie ul li:nth-child(1)").addClass("active");
			}
			$(".botones,.contpag,.verplatoico,.pedidotar").css({"bottom":+$("li.carrito a img").height()+"px"});				
		});

	angularRoutingApp.controller('comprasController', function($scope,Items,Currency) {
		setBackground("fondo","");
		$(".menusup button.ico-menu span").css("background","url(images/linmenu.png)");
		
		var dishes=[];
		setDisplayMenu();

		$("li").removeClass("active");
		$(".menupie ul li:nth-child(3)").addClass("active");

		for(var j=0;j<localStorage.length;j++){
			var item= localStorage.key(j);
			if(item.indexOf("item_")==0){
				var dish=item.split("_");
				dishes.push(dish[1]);
			}
		}		
		var farr= compressArray(dishes.sort().reverse());		
		var plato='';
		var tipo="";
		var nDish= farr.length;
		for(var h=0;h<farr.length;h++){
			var item= farr[h];
			var dish= item.value;//Real ID plato
			var codes="";
			for(var j=0;j<localStorage.length;j++){
				var item= localStorage.key(j);
				if(item.indexOf("item_"+dish)==0){
					var cod= item.split("_");
					codes+=cod[4]+",";
					tipo=cod[3];
				}
			}
			var data= ajaxrest.getItemsxDish("codes="+codes+"&token="+localStorage.token);
			var dat = angular.fromJson(data);

			var Narray=[];
			for(var m=0;m<dat.length;m++){
				var valor= JSON.parse(localStorage.getItem("item_"+dish+"_"+dat[m].idCat+"_"+tipo+"_"+dat[m].code));
				Narray.push({pos:valor.pos,data:dat[m]});
			}

			var sort_by = function(field, reverse, primer){
				var key = primer ? 
				function(x) {return primer(x[field])} : 
				function(x) {return x[field]};
				reverse = [-1, 1][+!!reverse];
				return function (a, b) {
					return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
				} 
			}			

			var datos= Narray.sort(sort_by('pos', true, parseInt));		

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
			var htotal=0;
			var total=0;
			if(tipo=="B"){
				htotal= parseInt(localStorage.valor_buffet);				
			}else{
				htotal= parseInt(localStorage.valor_recomendado);
			}
			total=htotal;
			for(var m=0;m<datos.length;m++){
				var code= datos[m].data.code;
				var name= datos[m].data.name;
				var cat= datos[m].data.idCat;
				var price= parseInt(datos[m].data.price);
				
				var image=base_url+"resources/images/dish/"+code+"_2.png";	

				var vItem= "item_"+dish+"_"+cat+"_"+tipo+"_"+code;
				cant= Items.getExtraDish(vItem);
				
				var add="";
				if(cat==1){					
					if(c1==0){
						var ad="";
						if(cant>1)ad= " <b><b>(extra X "+ (cant - 1)+")</b></b>";
						ppal+="- "+name+ad+"</br>";
						arroz=image;
						arrozIco="images/arroz_mini_ok.png";
						total+= price * (cant-1);				
					}else{
						var ad="";
						if(cant>=1)ad= " <b>(extra X "+ (cant)+")</b>";							
						extra+="- "+name+ad+"</br>";
						total+= price * cant;
					}					
					c1++;
				}
				if(cat==2){	
					if(c2==0){
						var ad="";
						if(cant>1)ad= " <b>(extra X "+ (cant - 1)+")</b>";
						ppal+="- "+name+ad+"</br>";
						bebidas=image;
						bebidasIco="images/bebidas_mini_ok.png";
						total+= price * (cant-1);		
					}else{						
						var ad="";
						if(cant>=1)ad= " <b>(extra X "+ (cant)+")</b>";
						extra+="- "+name+ad+"</br>";
						total+= price * cant;
					}
					c2++;
				}
				if(cat==3){					
					if(c3==0){
						var ad="";
						if(cant>1)ad= " <b>(extra X "+ (cant - 1)+")</b>";
						ppal+="- "+name+ad+"</br>";
						carnes=image;
						carnesIco="images/carnes_mini_ok.png";	
						total+= price * (cant-1);					
					}else{
						var ad="";
						if(cant>=1)ad= " <b>(extra X "+ (cant)+")</b>";							
						extra+="- "+name+ad+"</br>";	
						total+= price * cant;				
					}
					c3++;
				}
				if(cat==4){					
					if(c4==0){
						var ad="";
						if(cant>1)ad= " <b>(extra X "+ (cant - 1)+")</b>";
						ppal+="- "+name+ad+"</br>";
						guarnicion=image;
						guarnicionIco="images/guarnicion_mini_ok.png";	
						total+= price * (cant-1);					
					}else{
						var ad="";
						if(cant>=1)ad= " <b>(extra X "+ (cant)+")</b>";							
						extra+="- "+name+ad+"</br>";
						total+= price * cant;
					}
					c4++;
				}
				if(cat==5){					
					if(c5==0){
						var ad="";
						if(cant>1)ad= " <b>(extra X "+ (cant - 1)+")</b>";
						ppal+="- "+name+ad+"</br>";
						sopa=image;		
						sopaIco="images/sopas_mini_ok.png";	
						total+= price * (cant-1);					
					}else{
						var ad="";
						if(cant>=1)ad= " <b>(extra X "+ (cant)+")</b>";						
						extra+="- "+name+ad+"</br>";
						total+= price * cant;
					}
					c5++;
				}																				
			}
			var cantDish=1;
			htotal=total;
			if(localStorage.getItem("cant_"+tipo+"_"+dish)){				
				cantDish=localStorage.getItem("cant_"+tipo+"_"+dish);				
				if(cantDish>0)total=htotal*cantDish;
			}			
			
			var nameDish="Plato #"+nDish;
			if(tipo=="R")nameDish="Recomendado Día";
			plato='<div class="comprasitem" id="dish_'+dish+'"><div class="imgcont" ><div class="padre"><div class = "derrap"><div class="contenedor"><div class="sopa"><img src="images/plato_2.png" style="width:100%;" border="0" margin="0"/><div class="sopacont"><img src="'+sopa+'" style="width:100%;" border="0" margin="0" /></div></div><div class="vaso"><img src="images/plato_3.png" style="width:100%;" border="0" margin="0"/><div class="jugo"><img src="'+bebidas+'" style="width:100%;" border="0" margin="0"/></div></div><div class="plato"><img src="images/plato.png" style="width:100%;" border="0" margin="0"/><div class="arroz"><img src="'+arroz+'" style="width:100%;" border="0" margin="0"/></div><div class="guarnicion"><img src="'+guarnicion+'" style="width:100%;" border="0" margin="0"/></div><div class="carne"><img src="'+carnes+'" style="width:100%;" border="0" margin="0"/></div></div></div></div></div></div><div class="contnn"><h3>'+nameDish+'</h3><p>'+ppal+extra+'</p></p><div class="icodeli"><span class="elimina" onclick="setFinalOrder('+dish+',\'less\',\''+tipo+'\')"></span><span class="contador"><label id="cont_'+dish+'">'+cantDish+'</label></span><span class="suma" onclick="setFinalOrder('+dish+',\'add\',\''+tipo+'\')"></span></div></div><div class="icodeta"><div><img src="'+sopaIco+'" alt="..." title="..." onclick="editDish(5,\'sopas y cremas\','+dish+',\''+tipo+'\')"></div><div><img src="'+arrozIco+'" alt="..." title="..." onclick="editDish(1,\'arroz\','+dish+',\''+tipo+'\')"></div><div><img src="'+carnesIco+'" alt="..." title="..." onclick="editDish(3,\'carnes\','+dish+',\''+tipo+'\')"></div><div><img src="'+guarnicionIco+'" alt="..." title="..." onclick="editDish(4,\'guarnición\','+dish+',\''+tipo+'\')"></div><div><img src="'+bebidasIco+'" alt="..." title="..." onclick="editDish(2,\'bebidas\','+dish+',\''+tipo+'\')"></div> <div class="subtt"><input type="hidden" name="price_'+dish+'" id="price_'+dish+'" value="'+htotal+'" /><label class="currency" id="lprice_'+dish+'">$'+Currency.setMoney(total, 0, ",", ".")+'</label></div></div>';
			$("#miscompras").append(plato);
			var icodeta=$(".icodeta").height();
			var padre=$(".comprasitem").height();
			
			if(localStorage.dimension>380){
				$(".imgcont").css({"min-height":+(padre-icodeta)+"px"});	
			}				
			nDish--;
		}
		var fDish= Items.getRealDish();
		var contPago='<div class="contpag" onclick="doPay(\''+fDish+'\')"><div class="cont">Continúe con el pago</div></div>';
		$("#miscompras").append(contPago);
		$("#miscompras").append('<div style="height:250px;">&nbsp;</div>');
		if(plato==""){
			Items.delAllCant();
			$(".costoad").fadeIn();
		}
		$(".botones,.contpag,.verplatoico,.pedidotar").css({"bottom":+$("li.carrito a img").height()+"px"});			
	});

	angularRoutingApp.controller('loginController', function($scope) {
		$scope.message = 'Esta es la página de "Login"';
	});

	angularRoutingApp.controller('mi_cuentaController', function($scope) {
		setBackground("fondo","");
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

	angularRoutingApp.controller('categoriaController', function($scope,$routeParams,$http,Images,Items,Currency) {		
		setDisplayMenu();
		$(".menusup button.ico-menu span").css("background","url(images/flecha_atras.png)");				
		$(".detalle").hide();
		$scope.precio_plato= Currency.setMoney(localStorage.valor_buffet, 0, ",", ".");
		var plato= localStorage.plato;
		var checkPlato= Items.getItems(plato);
		var flag=false;
		if(Items.getTypeDish(plato)=="R"){
			plato= Items.getFullLastId()+1;
			flag=true;
		}

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
		$(".botones,.contpag,.verplatoico,.pedidotar").css({"bottom":+$("li.carrito a img").height()+"px"});	
	});

	angularRoutingApp.controller('recomendadoController', function($scope,$location,Currency,Items) {		
		setBackground("fondo","");
		$(".menusup button.ico-menu span").css("background","url(images/flecha_atras.png)");
		var items="";
		if(localStorage.token){
			var data= ajaxrest.getDishDay("token="+localStorage.token);
			var dat = angular.fromJson(data);
			var dish=[];
			if(dat.length>0){
				for(var i=0;i<dat.length;i++){					
					if(dat[i].idCat==1)$scope.arroz= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
					if(dat[i].idCat==2)$scope.bebidas= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
					if(dat[i].idCat==3)$scope.carnes= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
					if(dat[i].idCat==4)$scope.guarnicion= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
					if(dat[i].idCat==5)$scope.sopas= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
					var item = {code:dat[i].code, cat:dat[i].idCat}; 
					dish.push(item);					
					items+="- "+dat[i].name+"<br/>";
				}
				localStorage.setItem("plato_dia",JSON.stringify(dish));
			}
		}
		$scope.items = items;
		$scope.price = Currency.setMoney(localStorage.valor_recomendado, 0, ",", ".");
		$("#totalDish").html(Items.getNumDish());

		$scope.goTo = function (page) {
			$location.path(page);
		},
		$scope.goPay = function () {
			var items= angular.fromJson(localStorage.getItem("plato_dia"));
			var plato= Items.getFullLastId()+1;
			for(var j=0;j<items.length;j++){	
				localStorage.setItem("item_"+plato+"_"+items[j].cat+"_R_"+items[j].code,JSON.stringify({cant:1,pos:j+1}));
			}
			localStorage.setItem("plato",Items.getFullLastId()+1);
			localStorage.setItem("cant_R_"+plato,1);
			$("#totalDish").html(Items.getNumDish());	
			$location.path("compras");
		}	
		$(".botones,.contpag,.verplatoico,.pedidotar").css({"bottom":+$("li.carrito a img").height()+"px"});			
	});	

	angularRoutingApp.controller('pagoController', function($scope,Items,Currency) {
		setBackground("","white");
		$(".menusup button.ico-menu span").css("background","url(images/flecha_atras.png)");
		var domicilio=0;
		var dishes=[];
		var tipo_pago="efectivo";
		if(localStorage.getItem("tipo_pago")){
			tipo_pago=localStorage.getItem("tipo_pago");
			$("#"+tipo_pago).css("background","#FDB813");
			$("#"+tipo_pago+" > img").css("display","inline");
		}
		
		for(var j=0;j<localStorage.length;j++){
			var item= localStorage.key(j);
			if(item.indexOf("item_")==0){
				var dish=item.split("_");
				dishes.push(dish[1]);
			}
		}		
		var farr= compressArray(dishes.sort().reverse());
		var Ditem='';
		var labels='';
		var valores='';
		var Gtotal=0;
		var plato='';	
		var tipo="";
		var nDish=farr.length;
		for(var h=0;h<farr.length;h++){			
			var item= farr[h];
			var dish=item.value;//Real ID plato
			var codes="";
			var itemsDish=Items.getItems(dish);
			if(itemsDish>2){
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
				var total=0;
				var total2=0;
				if(tipo=="B"){
					total= parseInt(localStorage.valor_buffet);
				}else{
					total= parseInt(localStorage.valor_recomendado);
				}
				for(var m=0;m<dat.length;m++){
					var code=dat[m].code;
					var name=dat[m].name;
					var cat=dat[m].idCat;
					var price=parseInt(dat[m].price);	

					var vItem= "item_"+dish+"_"+cat+"_"+tipo+"_"+code;
					cant= Items.getExtraDish(vItem);
					var add="";

					if(cat==1){					
						if(c1==0){
							var ad="";
							if(cant>1)ad= " <b>(extra X "+ (cant - 1)+")</b>";
							ppal+="- "+name+ad+"</br>";		
							total+= price * (cant-1);				
						}else{
							var ad="";
							if(cant>=1)ad= " <b>(extra X "+ (cant)+")</b>";							
							extra+="- "+name+ad+"</br>";
							total+= price * cant;	
						}					
						c1++;
					}
					if(cat==2){					
						if(c2==0){
							var ad="";
							if(cant>1)ad= " <b>(extra X "+ (cant - 1)+")</b>";
							ppal+="- "+name+ad+"</br>";		
							total+= price * (cant-1);				
						}else{						
							var ad="";
							if(cant>=1)ad= " <b>(extra X "+ (cant)+")</b>";							
							extra+="- "+name+ad+"</br>";
							total+= price * cant;
						}
						c2++;
					}
					if(cat==3){					
						if(c3==0){
							var ad="";
							if(cant>1)ad= " <b>(extra X "+ (cant - 1)+")</b>";
							ppal+="- "+name+ad+"</br>";	
							total+= price * (cant-1);						
						}else{
							var ad="";
							if(cant>=1)ad= " <b>(extra X "+ (cant)+")</b>";							
							extra+="- "+name+ad+"</br>";	
							total+= price * cant;				
						}
						c3++;
					}
					if(cat==4){					
						if(c4==0){
							var ad="";
							if(cant>1)ad= " <b>(extra X "+ (cant - 1)+")</b>";
							ppal+="- "+name+ad+"</br>";		
							total+= price * (cant-1);				
						}else{
							var ad="";
							if(cant>=1)ad= " <b>(extra X "+ (cant)+")</b>";							
							extra+="- "+name+ad+"</br>";
							total+= price * cant;
						}
						c4++;
					}
					if(cat==5){					
						if(c5==0){
							var ad="";
							if(cant>1)ad= " <b>(extra X "+ (cant - 1)+")</b>";
							ppal+="- "+name+ad+"</br>";		
							total+= price * (cant-1);				
						}else{
							var ad="";
							if(cant>=1)ad= " <b>(extra X "+ (cant)+")</b>";						
							extra+="- "+name+ad+"</br>";
							total+= price * cant;
						}
						c5++;
					}																				
				}
				var cantDish=1;
				total2=total;
				if(localStorage.getItem("cant_"+tipo+"_"+dish)){				
					cantDish=localStorage.getItem("cant_"+tipo+"_"+dish);				
					if(cantDish>0)total2=total*cantDish;
				}
				var nameDish="Plato #"+nDish+" (Und x "+cantDish+")";
				if(tipo=="R")nameDish="Recomendado (Und x "+cantDish+")";
				labels+='<label>'+nameDish+'</label>';
				Gtotal+=total2;
				valores+='<label>$'+Currency.setMoney(total2, 0, ",", ".")+'</label>';
				domicilio+= parseInt(cantDish);
				nDish--;
			}
		}
		
		Ditem='<div class="td">'+labels+'</div><div class="td">'+valores+'</div>';
		$scope.platos= Ditem;
		var tDomicilio= localStorage.valor_domicilio * domicilio;
		$scope.domicilio = Currency.setMoney(tDomicilio, 0, ",", ".");
		$scope.total = Currency.setMoney(Gtotal + tDomicilio, 0, ",", ".");
		$scope.valor_plato= " Und x "+domicilio;
		setBackDefaultPay();
		$scope.setTypePay = function (type) {			
			localStorage.setItem("tipo_pago",type);
			$(".formpago li").css("background","none");
			$(".formpago .icobie").css("display","none");
			$("#"+type).css("background","#FDB813");
			$("#"+type+" > img").css("display","inline");
			$(".sombra,.formpago").css("display","none");
			$("#img_pago").attr("src","images/boton_"+type+".png");
		},
		$scope.viewTypePay = function () {
			$(".sombra,.formpago").css("display","inline");
		},
		$scope.SendPay = function () {
			$(".vrdirc,.bondesc").css("display","none");
			$(".confirmacion").css("display","inline-block");
			cleanSession();
		}						
	});

	angularRoutingApp.controller('nosotrosController', function($scope) {
		setBackground("","white");
	});	

	angularRoutingApp.controller('felicitacionesController', function($scope) {
		setBackground("fondo","");
		$scope.sendContact = function (type) {			
			ajaxrest.sendContact(type);
		}		
	});	
	angularRoutingApp.controller('contactenosController', function($scope) {
		setBackground("fondo","");
		$scope.sendContact = function (type) {			
			ajaxrest.sendContact(type);
		}
	});
	angularRoutingApp.controller('redesController', function($scope) {
		setBackground("fondo","");		
	});			

	angularRoutingApp.controller("mapaController", ["$scope", function mapaController($scope) {
		setBackground("fondo","");
		$(".menusup button.ico-menu span").css("background","url(images/linmenu.png)");
		$(".botones,.contpag,.verplatoico,.pedidotar").css({"bottom":+$("li.carrito a img").height()+"px"});
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
			getPos: function() {
				var pos=0;
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_")==0){
						pos++;
					}
				}
				return pos;
			},			
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
			getRealDish: function() {
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
				var full=0;
				var notfull=0;
				var total=[];
				for (var h = 0; h < com.length; h++){					
					if(com[h].count<3){
						notfull++;
					}else{
						full++;
					}
				}								
				return full+"|"+notfull;//Platos completos y no completos
			},
			getBuffetLastId: function() {
				var arr=[];		
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					var dish= item.split("_");
					if(item.indexOf("_B_")==0)arr.push(dish[1]);
				}
				var total=compressArray(arr.sort());
				var last_element=1;
				if(total.length>0){
					last_element = total[total.length - 1].value;
				}				
				return parseInt(last_element);
			},						
			getFullLastId: function() {
				var arr=[];
				var last_element=0;	
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					var dish= item.split("_");
					if(item.indexOf("item_")==0)arr.push(dish[1]);
				}				
				if(arr.length>0){
					var total=compressArray(arr.sort());						
					if(total.length>0){
						last_element = total[total.length - 1].value;
					}
				}				
				return parseInt(last_element);
			},
			getTypeDish: function(dish) {
				var type="";
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_"+dish)==0){
						var data=item.split("_");						
						if(data[3])type=data[3];
					}
				}
				return type;
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
					if(item == value){
						var valor=JSON.parse(localStorage.getItem(item));
						cant+=parseInt(valor.cant);
					}
				}
				return cant;
			},			
			getItemsxCat: function(Dish,cat) {
				var items=0;
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_"+Dish+"_"+cat)==0){
						var valor=JSON.parse(localStorage.getItem(item));
						items+=parseInt(valor.cant);
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
			delAllCant: function() {
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("cant_")==0){
						localStorage.removeItem(item);
					}
				}
				return true;
			}																
		};
	});