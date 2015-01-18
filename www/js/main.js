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
		.when('/guia', {
			templateUrl : 'templates/guia.html',
			controller 	: 'guiaController'
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
		localStorage.setItem("guia",JSON.stringify(ajaxrest.getGuia()));

		var banner = JSON.parse(localStorage.banner);		
		if(banner[0] && banner[0].img_matrix!=""){
			image_banner= '<img src="http://buffetexpress.co/imagenes/publicidad/imagen1/'+banner[0].img_matrix+'" alt="" title="" />';
			$scope.image_banner= image_banner;
			$scope.info_banner= banner[0].contenido_matrix;
		}		

		$scope.recomendado = function () {
			window.location = "internal.html#/recomendado";	
		}		

		$("#totalDish").html(Items.getNumDish());
	});	

	angularRoutingApp.controller('mainController', function($scope,$location,$routeParams,Images,Items,Currency){
		//alert("Zona "+localStorage.zona);	
		$(".menusup button.ico-menu span").css("background","url(images/linmenu.png)");
		if($routeParams.activity)localStorage.activity=$routeParams.activity;
		var plato= 1;
		if(localStorage.plato)plato= parseInt(localStorage.plato);
		if(localStorage.getItem("dimension")==768)$(".menuplato").css("width","82%");

		if(localStorage.getItem("quadrant")==""){
			alert("Ubicación fuera de rango de despacho.\nPuede navegar la aplicación; pero no podrá ordenar pedidos.");
			localStorage.setItem("quadrant","n/a");
		}
		
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
				$scope.sopa= Images.setImage(plato,1);
				$scope.arroz= Images.setImage(plato,2);				
				$scope.carnes= Images.setImage(plato,3);
				$scope.guarnicion= Images.setImage(plato,4);
				$scope.bebidas= Images.setImage(plato,5);				
			}

			$scope.num_dish= localStorage.plato;

			$("#totalDish").html(Items.getNumDish());

			$scope.doLogin = function() {
				ajaxrest.login(82);
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
				localStorage.removeItem("cuenta");
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
				var plato= parseInt(localStorage.plato);
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
						$scope.sopa= Images.setImage(ndish,1);
						$scope.arroz= Images.setImage(ndish,2);						
						$scope.carnes= Images.setImage(ndish,3);
						$scope.guarnicion= Images.setImage(ndish,4);
						$scope.bebidas= Images.setImage(ndish,5);	
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

				var pos= Items.getPos(plato,dish.idCat);
				var fcode= $("#code_"+dish.code).val().split('|');
				var fname=fcode[2];
				var price=fcode[3];
				var name= "item_"+plato+"_"+dish.idCat+"_B_"+dish.code;
				var cant=0;
				if(!localStorage.getItem(name)){					
					localStorage.setItem(name,JSON.stringify({cant:cant,pos:pos,code:dish.code,cat:dish.idCat,fname:fname,price:price}));
					var img=Images.setImage(plato,dish.idCat);
					if(dish.idCat==1){	
						$scope.sopa= img;			
					}
					if(dish.idCat==2){
						$scope.arroz= img;
					}
					if(dish.idCat==3){
						$scope.carnes= img;
					}
					if(dish.idCat==4){
						$scope.guarnicion= img;
					}
					if(dish.idCat==5){
						$scope.bebidas= img;	
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
					localStorage.setItem(name,JSON.stringify({cant:cant,pos:pos,code:dish.code,cat:dish.idCat,fname:fname,price:price}));
					$("#numb_"+dish.code).html(cant).fadeIn();
				}else{
					localStorage.removeItem(name);
					$("#numb_"+dish.code).html('').fadeOut();
					var img=Images.setImage(plato,dish.idCat);
					if(dish.idCat==1){	
						$scope.sopa= img;
					}
					if(dish.idCat==2){
						$scope.arroz= img;
					}
					if(dish.idCat==3){
						$scope.carnes= img;
					}
					if(dish.idCat==4){
						$scope.guarnicion= img;
					}
					if(dish.idCat==5){
						$scope.bebidas= img;					
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
		var farr= compressArray(dishes.sort(sortNumber).reverse());
		var plato='';		
		var nDish= farr.length;
		for(var h=0;h<farr.length;h++){
			var item= farr[h];
			var dish= item.value;//Real ID plato
			var codes="";
			for(var j=0;j<localStorage.length;j++){
				var item= localStorage.key(j);
				var parts= item.split('_');			
				if(parts[1]==dish && item.indexOf("item_"+dish)==0){
					var cod= item.split("_");
					codes+=cod[4]+",";				
				}
			}
			//var data= ajaxrest.getItemsxDish("codes="+codes+"&token="+localStorage.token);
			var data= Items.getItemsxDish(dish);
			var dat = angular.fromJson(data);

			var Narray=[];
			var tipo="";
			for(var m=0;m<dat.length;m++){				
				tipo= Items.getCat(dish);
				var valor= JSON.parse(localStorage.getItem("item_"+dish+"_"+dat[m].idCat+"_"+tipo+"_"+dat[m].code));
				if(valor){					
					Narray.push({pos:valor.pos,data:dat[m]});					
				}				
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
			var sopa="images/sp.gif";
			var arroz="images/sp.gif";			
			var carnes="images/sp.gif";
			var guarnicion="images/sp.gif";
			var bebidas="images/sp.gif";			

			var sopaIco="images/sopas_mini.png";
			var arrozIco="images/arroz_mini.png";			
			var carnesIco="images/carnes_mini.png";
			var guarnicionIco="images/guarnicion_mini.png";
			var bebidasIco="images/bebidas_mini.png";
			
			var htotal=0;
			var total=0;

			tipo= Items.getCat(dish);
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
						sopa=image;		
						sopaIco="images/sopas_mini_ok.png";
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
						arroz=image;
						arrozIco="images/arroz_mini_ok.png";
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
						bebidas=image;
						bebidasIco="images/bebidas_mini_ok.png";
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
			
			var nameDish="Plato #"+dish;
			if(tipo=="R"){
				nameDish="Recomendado Día";
				htotal= parseInt(localStorage.valor_recomendado);
				total=htotal;
			}
			plato='<div class="comprasitem" id="dish_'+dish+'"><div class="imgcont" id="img_'+dish+'"><div class="padre"><div class = "derrap"><div class="contenedor"><div class="sopa"><img src="images/plato_2.png" style="width:100%;" border="0" margin="0"/><div class="sopacont"><img src="'+sopa+'" style="width:100%;" border="0" margin="0" /></div></div><div class="vaso"><img src="images/plato_3.png" style="width:100%;" border="0" margin="0"/><div class="jugo"><img src="'+bebidas+'" style="width:100%;" border="0" margin="0"/></div></div><div class="plato"><img src="images/plato.png" style="width:100%;" border="0" margin="0"/><div class="arroz"><img src="'+arroz+'" style="width:100%;" border="0" margin="0"/></div><div class="guarnicion"><img src="'+guarnicion+'" style="width:100%;" border="0" margin="0"/></div><div class="carne"><img src="'+carnes+'" style="width:100%;" border="0" margin="0"/></div></div></div></div></div></div><div class="contnn"><h3>'+nameDish+'</h3><p>'+ppal+extra+'</p></p><div class="icodeli"><span class="elimina" onclick="setFinalOrder('+dish+',\'less\',\''+tipo+'\')"></span><span class="contador"><label id="cont_'+dish+'">'+cantDish+'</label></span><span class="suma" onclick="setFinalOrder('+dish+',\'add\',\''+tipo+'\')"></span></div></div><div class="icodeta"><div><img src="'+sopaIco+'" alt="..." title="..." onclick="editDish(1,\'sopas y cremas\','+dish+',\''+tipo+'\')"></div><div><img src="'+arrozIco+'" alt="..." title="..." onclick="editDish(2,\'arroz\','+dish+',\''+tipo+'\')"></div><div><img src="'+carnesIco+'" alt="..." title="..." onclick="editDish(3,\'carnes\','+dish+',\''+tipo+'\')"></div><div><img src="'+guarnicionIco+'" alt="..." title="..." onclick="editDish(4,\'guarnición\','+dish+',\''+tipo+'\')"></div><div><img src="'+bebidasIco+'" alt="..." title="..." onclick="editDish(5,\'bebidas\','+dish+',\''+tipo+'\')"></div> <div class="subtt"><input type="hidden" name="price_'+dish+'" id="price_'+dish+'" value="'+htotal+'" /><label class="currency" id="lprice_'+dish+'">$'+Currency.setMoney(total, 0, ",", ".")+'</label></div></div>';			
			
			$("#miscompras").append(plato);
			var icodeta=$(".icodeta").height();
			var padre=$("#dish_"+nDish).height();
			if(localStorage.dimension>380){
				$("#img_"+dish).css({"min-height":+(padre-icodeta)+"px"});	
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
		var mheight= $("li.carrito a img").height();
		$(".contpag").css({"bottom":+(mheight-1)+"px"});			
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
		var plato= parseInt(localStorage.plato);
		var checkPlato= Items.getItems(plato);

		var flag=false;		
		if(Items.getTypeDish(plato)=="R"){
			plato= Items.getFullLastId() + 1;
			flag=true;
		}

		$scope.plato= plato;
		var cat= $routeParams.idCat;
		localStorage.activity=$routeParams.activity;
		var zona= JSON.parse(localStorage.zona);
		var id_zona=1;
		if(zona.id)id_zona=zona.id;		

		ajaxrest.getDishes("zone="+id_zona+"&category="+cat+"&token="+localStorage.token+"&dimension="+localStorage.dimension);
		var datos= $("#datos").val();
		$scope.dishes = angular.fromJson(datos);
		
		$scope.imageCat="bebidas_mini";
		if(cat==1){
			$scope.imageCat="sopas_mini";			
		}else if(cat==2){
			$scope.imageCat="arroz_mini";
		}else if(cat==3){
			$scope.imageCat="carnes_mini";
		}else if(cat==4){
			$scope.imageCat="guarnicion_mini";
		}		
		ajaxrest.setNumDishes(plato,cat);

		$scope.sopa= Images.setImage(plato,1);
		$scope.arroz= Images.setImage(plato,2);		
		$scope.carnes= Images.setImage(plato,3);
		$scope.guarnicion= Images.setImage(plato,4);
		$scope.bebidas= Images.setImage(plato,5);		

		$scope.viewDish = function () {
			$scope.sopa= Images.setImage(plato,1);
			$scope.arroz= Images.setImage(plato,2);			
			$scope.carnes= Images.setImage(plato,3);
			$scope.guarnicion= Images.setImage(plato,4);
			$scope.bebidas= Images.setImage(plato,5);			
		}
		var mheight= $("li.carrito a img").height();	
		$(".verplatoico").css({"bottom":+(mheight-1)+"px"});	
	});

	angularRoutingApp.controller('recomendadoController', function($scope,$location,Currency,Items) {		
		setBackground("fondo","");
		$(".menusup button.ico-menu span").css("background","url(images/flecha_atras.png)");
		var items="";
		var zona= JSON.parse(localStorage.zona);
		var id_zona=1;
		if(zona.id)id_zona=zona.id;
		if(localStorage.token){
			var data= ajaxrest.getDishDay("zone="+id_zona+"&token="+localStorage.token);
			if(data){
				var dat = angular.fromJson(data);
				var dish=[];
				if(dat.length>0){
					for(var i=0;i<dat.length;i++){					
						if(dat[i].idCat==1)$scope.sopas= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
						if(dat[i].idCat==2)$scope.arroz= base_url+"resources/images/dish/"+dat[i].code+"_2.png";					
						if(dat[i].idCat==3)$scope.carnes= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
						if(dat[i].idCat==4)$scope.guarnicion= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
						if(dat[i].idCat==5)$scope.bebidas= base_url+"resources/images/dish/"+dat[i].code+"_2.png";
						var item = {code:dat[i].code, cat:dat[i].idCat,fname:dat[i].name,price:dat[i].price}; 
						dish.push(item);					
						items+="- "+dat[i].name+"<br/>";
					}
					localStorage.setItem("plato_dia",JSON.stringify(dish));

					$scope.items = items;
					$scope.price = Currency.setMoney(localStorage.valor_recomendado, 0, ",", ".");
					$("#totalDish").html(Items.getNumDish());
					$(".comprasitem").fadeIn();				
				}
			}else{
				$(".comprasitem").fadeOut();
				$(".costoad").fadeIn();
			}
		}


		$scope.goTo = function (page) {
			$location.path(page);
		},
		$scope.goPay = function () {
			var items= angular.fromJson(localStorage.getItem("plato_dia"));
			var plato= Items.getFullLastId()+1;
			
			for(var j=0;j<items.length;j++){	
				localStorage.setItem("item_"+plato+"_"+items[j].cat+"_R_"+items[j].code,JSON.stringify({cant:1,pos:j+1,code:items[j].code,cat:items[j].cat,fname:items[j].fname,price:items[j].price}));
			}

			localStorage.setItem("plato",plato);
			localStorage.setItem("cant_R_"+plato,1);
			$("#totalDish").html(Items.getNumDish());
			$location.path("compras");
		}	
		$(".botones,.contpag,.verplatoico,.pedidotar").css({"bottom":+$("li.carrito a img").height()+"px"});			
	});	

	angularRoutingApp.controller('pagoController', function($scope,Items,Currency) {
		setBackground("","white");
		$(".menusup button.ico-menu span").css("background","url(images/flecha_atras.png)");
		var id_cliente="";
		var nombre_cliente="";
		var cellPhone="";
		var datos= localStorage.getItem("cuenta");
		if(datos!=null){
			var data= JSON.parse(datos);
			if(data.address){
				$scope.direccion= data.address;
				id_cliente= data.id;
				nombre_cliente= data.names;
				cellPhone= data.cellPhone;
				$scope.direcciones_frecuentes='<li>'+data.address+'<i class="glyphicon glyphicon-minus-sign"></i></li>';
			}			
		}		

		if(localStorage.getItem("direccion")){
			$scope.direccion=localStorage.getItem("direccion");
			$scope.referencia=localStorage.getItem("referencia");
			$scope.numero=localStorage.getItem("numero");

			if(localStorage.getItem("tipo")=="1")$('#tipo1').attr("checked","checked");
			if(localStorage.getItem("tipo")=="2")$('#tipo2').attr("checked","checked");
			if(localStorage.getItem("tipo")=="3")$('#tipo3').attr("checked","checked");
		}
		
		var domicilio=0;
		var dishes=[];
		var tipo_pago="efectivo";
		if(localStorage.getItem("tipo_pago")){
			tipo_pago=localStorage.getItem("tipo_pago");
			$("#tipoPago").val(tipo_pago);
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
		var farr= compressArray(dishes.sort(sortNumber).reverse());
		var Ditem='';
		var labels='';
		var valores='';
		var Gtotal=0;
		var plato='';	
		var tipo="";
		var nDish=farr.length;
		var order=[];
		var orderdetail=[];
		var orderxitems=[];
		for(var h=0;h<farr.length;h++){		
			var item= farr[h];
			var dish= item.value;//Real ID plato
			var codes="";
			var itemsDish= Items.getItems(dish);

			if(itemsDish>2){
				for(var j=0;j<localStorage.length;j++){
					var item= localStorage.key(j);					
					var parts= item.split('_');								
					if(parts[1]==dish && item.indexOf("item_"+dish)==0){
						var cod=item.split("_");
						codes+=cod[4]+",";
					}
				}
				//var data= ajaxrest.getItemsxDish("codes="+codes+"&token="+localStorage.token);
				var data= Items.getItemsxDish(dish);
				var dat = angular.fromJson(data);
				var c1=0;c2=0;c3=0;c4=0;c5=0;			
				var ppal="";
				var extra="";
				var total=0;
				var total2=0;	
				tipo= Items.getCat(dish);
				if(tipo=="B"){
					total= parseInt(localStorage.valor_buffet);
				}else{
					total= parseInt(localStorage.valor_recomendado);
				}

				if(dish==1)total;
				for(var m=0;m<dat.length;m++){
					var code=dat[m].code;
					var name=dat[m].name;
					var cat=dat[m].idCat;
					var price=parseInt(dat[m].price);	

					var vItem= "item_"+dish+"_"+cat+"_"+tipo+"_"+code;
					cant= Items.getExtraDish(vItem);
					var add="";					
					orderxitems.push({idDish:dish,qty:cant,price:price});								
					
					if(cat==1){					
						if(c1==0){
							var ad="";
							if(cant>1){
								ad= " <b>(extra X "+ (cant - 1)+")</b>";
								total+= price * (cant-1);
							}
							ppal+="- "+name+ad+"</br>";			
						}else{
							var ad="";
							if(cant>=1){
								ad= " <b>(extra X "+ (cant)+")</b>";
								total+= price * cant;	
							}						
							extra+="- "+name+ad+"</br>";								
						}					
						c1++;
					}
					if(cat==2){					
						if(c2==0){
							var ad="";
							if(cant>1){
								ad= " <b>(extra X "+ (cant - 1)+")</b>";
								total+= price * (cant-1);
							}
							ppal+="- "+name+ad+"</br>";			
						}else{						
							var ad="";
							if(cant>=1){
								ad= " <b>(extra X "+ (cant)+")</b>";
								total+= price * cant;	
							}						
							extra+="- "+name+ad+"</br>";
						}
						c2++;
					}
					if(cat==3){					
						if(c3==0){
							var ad="";
							if(cant>1){
								ad= " <b>(extra X "+ (cant - 1)+")</b>";
								total+= price * (cant-1);
							}
							ppal+="- "+name+ad+"</br>";					
						}else{
							var ad="";
							if(cant>=1){
								ad= " <b>(extra X "+ (cant)+")</b>";
								total+= price * cant;	
							}						
							extra+="- "+name+ad+"</br>";			
						}
						c3++;
					}
					if(cat==4){					
						if(c4==0){
							var ad="";
							if(cant>1){
								ad= " <b>(extra X "+ (cant - 1)+")</b>";
								total+= price * (cant-1);
							}
							ppal+="- "+name+ad+"</br>";		
						}else{
							var ad="";
							if(cant>=1){
								ad= " <b>(extra X "+ (cant)+")</b>";
								total+= price * cant;	
							}						
							extra+="- "+name+ad+"</br>";
						}
						c4++;
					}
					if(cat==5){					
						if(c5==0){
							var ad="";
							if(cant>1){
								ad= " <b>(extra X "+ (cant - 1)+")</b>";
								total+= price * (cant-1);
							}
							ppal+="- "+name+ad+"</br>";			
						}else{
							var ad="";
							if(cant>=1){
								ad= " <b>(extra X "+ (cant)+")</b>";
								total+= price * cant;	
							}						
							extra+="- "+name+ad+"</br>";
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

				var nameDish="Plato #"+dish+" (Und x "+cantDish+")";
				var type=0;
				if(tipo=="R"){
					var type=1;
					nameDish="Recomendado (Und x "+cantDish+")";
					total= parseInt(localStorage.valor_recomendado);
					total2=total;
				}				
				orderdetail.push({numDish:dish,qty:cantDish,price:total2,type:type});			
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

		$scope.bonoChanged = function() {
			var bono= $scope.bono;
			if(bono!=""){
				var data= ajaxrest.getBono("bono="+bono+"&token="+localStorage.token);
				if(data!=""){
					var valor=data[0].valor_bono;
					var total=Gtotal + tDomicilio;
					if(data[0].tipo_bono==84){
						$scope.valor_bono= Currency.setMoney(valor, 0, ",", ".");
						$scope.total= Currency.setMoney(total - valor, 0, ",", ".");
					}else{
						$scope.porc_bono= valor+"%";
						$scope.valor_bono= Currency.setMoney(valor, 0, ",", ".");
						var porc= total * (valor/100);
						$scope.total= Currency.setMoney(total - porc, 0, ",", ".");
					}
					$("#hbono").val(data[0].id_bono);
					$(".bono").css("display","inline");	   	
				}else{
					$(".bono").css("display","none");
					$("#hbono").val('');
					alert("Código no disponible");
				}
			}
		},
		$scope.setTypePay = function (type) {			
			localStorage.setItem("tipo_pago",type);
			$("#tipoPago").val(type);
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
			var direccion= $("#direccion").val();		
			var referencia= $("#referencia").val();
			var numero= $("#numero").val();
			var tipo= $('input[name=tipo]:checked').val();
			var tipoPago= $("#tipoPago").val();		
			
			var bono= $('#hbono').val();
			var order=[];

			if(Gtotal>0){
				if(!localStorage.getItem("cuenta")){
					alert("Debe estar logueado para terminar el pedido.");
					localStorage.setItem("orden","Pendiente");
					localStorage.setItem("direccion",direccion);
					localStorage.setItem("referencia",referencia);
					localStorage.setItem("numero",numero);
					localStorage.setItem("tipo",tipo);
					window.location = "login.html#/cuenta";
				}else{
					if(direccion!=""){
						$scope.nombre_cliente= nombre_cliente;
						var zona= JSON.parse(localStorage.getItem("zona"));

						order.push({idUser:id_cliente,idZone:zona.id,idCupon:bono,address:direccion,type:tipo,typePay:tipoPago,num:numero,reference:referencia,cellPhone:cellPhone,typePay:tipo_pago,status:72});

						var process= ajaxrest.processOrder(order,orderdetail,orderxitems);
						$(".vrdirc,.bondesc").css("display","none");
						$(".confirmacion").css("display","inline-block");
						localStorage.removeItem("orden");
						localStorage.removeItem("direccion");
						localStorage.removeItem("referencia");
						localStorage.removeItem("numero");
						localStorage.removeItem("tipo");
						$("#totalDish").html("0");
						cleanSession();
					}else{
						alert("Dirección es requerida.");
					}
				}
			}
		}						
	});

	angularRoutingApp.controller('nosotrosController', function($scope) {
		setBackground("","white");
		var nosotros = ajaxrest.getContent("vista=vnosotros&token="+localStorage.token);
		$scope.info_nosotros= nosotros[0].contenido_matrix;
	});	

	angularRoutingApp.controller('felicitacionesController', function($scope) {
		setBackground("fondo","");
		$scope.sendContact = function (type) {			
			ajaxrest.sendContact(type);
		},
		$scope.setTipo = function (type) {			
			if(type=="Felicitaciones"){
				$("#chk_Felicitaciones").attr("src","images/checkbox_ok.png");
				$("#chk_Reclamo").attr("src","images/checkbox.png");
				$("#tipo").val('Felicitaciones');
			}else{
				$("#chk_Felicitaciones").attr("src","images/checkbox.png");
				$("#chk_Reclamo").attr("src","images/checkbox_ok.png");
				$("#tipo").val('Reclamo');
			}
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
	angularRoutingApp.controller('guiaController', function($scope) {
		setBackground("fondo","");		
	});	

	angularRoutingApp.controller("mapaController", ["$scope", function ($scope) {
		$("li").removeClass("active");
		$(".menupie ul li:nth-child(4)").addClass("active");
		$scope.minutes="N/A";
		if(localStorage.position){
			var position= JSON.parse(localStorage.position);
			$scope.Area = { Name: "Mi ubicación", Latitude: position.lat, Longitude: position.lng };
		}

		$(".menusup button.ico-menu span").css("background","url(images/linmenu.png)");
		$(".botones,.contpag,.verplatoico,.pedidotar").css({"bottom":+$("li.carrito a img").height()+"px"});		
		if(localStorage.dimension>400){
			$("#areaMap").css("height","1100px");
		}else{
			$("#areaMap").css("height","600px");
		}
	}]);

	/* Directivas */
	angularRoutingApp.directive('areaBasedGoogleMap', function () {
		return {
			restrict: "A",
			template: "<div id='areaMap'></div>",
			scope: {           
				area: "=",
				zoom: "="
			},
			controller: function ($scope) {
				var mapOptions;
				var map;           
				var marker;
				var zone= JSON.parse(localStorage.zona);
				var position= JSON.parse(localStorage.position);				
				var MyPosition = new google.maps.LatLng(position.lat, position.lng);				

				var initialize = function () {
					var lat= 6.230539;
					if(position.lat)lat= position.lat;
					var lng= -75.570672;
					if(position.lng)lng= position.lng;

					mapOptions = {
						zoom: 4,
						panControl: false,
						center: new google.maps.LatLng(lat,lng),
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					map = new google.maps.Map(document.getElementById('areaMap'), mapOptions);
					var homeControlDiv = document.createElement('div');
					var homeControl = new HomeControl(homeControlDiv, map);

					homeControlDiv.index = 9999;
					map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
				};

				var createMarker = function (area) {
					var position = new google.maps.LatLng(area.Latitude, area.Longitude);
					map.setCenter(position);
					marker = new google.maps.Marker({
						map: map,
						position: position,
						title: area.Name,
						icon: 'images/rastreo_cliente.png'
					});               
				};

				var createKML = function (src) {
					var kmlLayer = new google.maps.KmlLayer(src, {
						suppressInfoWindows: true,
						preserveViewport: false,
						map: map
					});             
				};

				var HomeControl = function (controlDiv, map) {
					controlDiv.style.padding = '5px';

					var controlUI = document.createElement('div');
					controlUI.style.backgroundColor = 'white';
					controlUI.style.borderStyle = 'solid';
					controlUI.style.borderWidth = '2px';
					controlUI.style.cursor = 'pointer';
					controlUI.style.textAlign = 'center';
					controlUI.title = 'Click para ir a Mí Ubicación';
					controlDiv.appendChild(controlUI);

					var controlText = document.createElement('div');
					controlText.style.fontFamily = 'Arial,sans-serif';
					controlText.style.fontSize = '12px';
					controlText.style.paddingLeft = '4px';
					controlText.style.paddingRight = '4px';
					controlText.innerHTML = '<b>Mí Ubicación</b>';
					controlUI.appendChild(controlText);

					google.maps.event.addDomListener(controlUI, 'click', function() {
						map.setCenter(MyPosition)
					});
				}; 				           

				$scope.$watch("area", function (area) {
					if (area != undefined) {
						createMarker(area);
						createKML(localStorage.getItem("domain")+'resources/kmls/zona_total.kml');
						var zona= JSON.parse(localStorage.getItem("zonas"));
						for (var i = 0; i < zona.length; i++){
							var zone= zona[i].code;
							var show= zona[i].show;
							if(show==1){
								createKML(localStorage.getItem("domain")+'resources/kmls/'+zone+'.kml');
/*								createKML(localStorage.getItem("domain")+'resources/kmls/'+zone+'_a.kml');
								createKML(localStorage.getItem("domain")+'resources/kmls/'+zone+'_b.kml');
								createKML(localStorage.getItem("domain")+'resources/kmls/'+zone+'_c.kml');
								createKML(localStorage.getItem("domain")+'resources/kmls/'+zone+'_d.kml');*/
							}				

						}
					}
				});
				initialize();
			},
		};
	});


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
				var arr =[];
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_"+dish+"_"+cat)==0){
						if(item){
							var plato= JSON.parse(localStorage.getItem(item));
							var dat=[];
							dat.push(plato["pos"],plato["code"]);
							arr.push(dat);
						}
					}
				}				
			    arr.sort(function(a,b) {
			        return a[0]-b[0]
			    });				
				if(arr[0])image= base_url+"resources/images/dish/"+arr[0][1]+"_2.png";
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
			getPos: function(dish,cat) {
				var pos=0;
				var arr=[];
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_"+dish+"_"+cat)==0){
						var dat= JSON.parse(localStorage.getItem(item));
						arr.push(dat["pos"]);
					}
				}
				arr.sort();
				if(arr.length>0)pos= arr[arr.length-1] + 1;
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
				var total=compressArray(arr.sort(sortNumber));				
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
					var total=compressArray(arr.sort(sortNumber));						
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
					if(item.indexOf("item_"+dish+"_")==0){
						var data= item.split("_");					
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
			getCat: function(Dish) {
				var cat="";
				for (var i = 0; i < localStorage.length; i++){
					var item= localStorage.key(i);
					if(item.indexOf("item_"+Dish+"_")==0){
						var valor= item.split("_");
						cat= valor[3];
					}
				}
				return cat;
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
			getItemsxDish: function(dish) {
				var plato=[];
				for (var i = 0; i < localStorage.length; i++){					
					var item= localStorage.key(i);
					var pl= item.split('_');			
					if(pl[1]==dish && item.indexOf("item_"+dish)==0){
						var dat= JSON.parse(localStorage.getItem(item));						
						plato.push({code:dat.code,name:dat.fname,price:dat.price,idCat:dat.cat});
					}					
				}
				return JSON.stringify(plato);
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