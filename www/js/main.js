  // Creación del módulo
  var angularRoutingApp = angular.module('angularRoutingApp', ["ngRoute","ngSanitize"]);
  var localData = JSON.parse(localStorage.getItem('cuenta'));
  var num = localStorage.setItem("num",0);
  var base_url="http://buffetexpress.com.co/REST/";
  var base_site="http://buffetexpress.com.co/";
  var rand= Math.floor((Math.random() * 999) + 1);

  // Configuración de las rutas
  angularRoutingApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'templates/slider.html',
      controller  : 'sliderController'
    })
    .when('/menu', {
      templateUrl : 'templates/menu.html',
      controller  : 'mainController'
    })
    .when('/compras', {
      templateUrl : 'templates/compras.html',
      controller  : 'comprasController'
    })
    .when('/mapa', {
      templateUrl : 'templates/mapa.html',
      controller  : 'mapaController'
    })  
    .when('/mi_cuenta', {
      templateUrl : 'templates/mi_cuenta.html',
      controller  : 'mi_cuentaController'
    })  
    .when('/categoria/:activity/:idCat/:Nombre', {
      templateUrl : 'templates/categoria.html',
      controller  : 'categoriaController'
    })
    .when('/redes', {
      templateUrl : 'templates/redes.html',
      controller  : 'mainController'
    })
    .when('/nosotros', {
      templateUrl : 'templates/nosotros.html',
      controller  : 'nosotrosController'
    })
    .when('/felicitaciones', {
      templateUrl : 'templates/felicitaciones.html',
      controller  : 'felicitacionesController'
    })  
    .when('/contactenos', {
      templateUrl : 'templates/contactenos.html',
      controller  : 'contactenosController'
    })
    .when('/redes', {
      templateUrl : 'templates/redes.html',
      controller  : 'redesController'
    })
    .when('/recomendado', {
      templateUrl : 'templates/recomendado.html',
      controller  : 'recomendadoController'
    })
    .when('/pago', {
      templateUrl : 'templates/pago.html',
      controller  : 'pagoController'
    })
    .when('/guia', {
      templateUrl : 'templates/guia.html',
      controller  : 'guiaController'
    })              
    .otherwise({
      redirectTo: '/'
    });
  });

  angularRoutingApp.controller('sliderController', function($scope,$location,Items) {   
    setTimer();	
    $("li").removeClass("active");
    $(".menupie ul li:nth-child(1)").addClass("active");
    $(".menusup button.ico-menu span").css("background","url(images/linmenu.png)");
    $("#img1").attr("src", "http://buffetexpress.com.co/imagenes/recomendado/imagen1/buffet1295.jpg?timestamp=" + new Date().getTime());
    $("#img2").attr("src", "http://buffetexpress.com.co/imagenes/recomendado/imagen1/recomendado-del-dia1296.jpg?timestamp=" + new Date().getTime());
    
    var banner = JSON.stringify(ajaxrest.getBanners("token="+localStorage.token));
    if(banner)localStorage.setItem("banner",banner);
        
    $scope.page="slider";
    setBackground("fondo","");
    setDisplayMenu();

    var banner = JSON.parse(localStorage.banner);   
    if(banner[0] && banner[0].img_matrix!=""){
      var rnd=Math.random();
      image_banner= '<img src="http://buffetexpress.com.co/imagenes/publicidad/imagen1/'+banner[0].img_matrix+'?rnd='+rnd+'" alt="" title="" />';
      $scope.image_banner= image_banner;
      $scope.info_banner= banner[0].contenido_matrix;
    }   

    $scope.recomendado = function () {
      window.location = "internal.html#/recomendado"; 
    }   

    $("#totalDish").html(Items.getNumDish());
  }); 

  angularRoutingApp.controller('mainController', function($scope,$location,$routeParams,Images,Items,Currency){
	  setTimer();
        alert(2222);
        navigator.notification.alert(
            'You are the winner!',  // message
            null,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
        alert(333);

    $(".menusup button.ico-menu span").css("background","url(images/linmenu.png)");
    $(".imgCat").click(function(){      
      $(this).attr("src","images/"+this.alt+"_load.png");
      return false;
    });

    if($routeParams.activity)localStorage.activity=$routeParams.activity;   
    var plato= 1;
    if(localStorage.plato)plato= parseInt(localStorage.plato);
    if(localStorage.getItem("dimension")==768)$(".menuplato").css("width","82%");   

    if(localStorage.getItem("quadrant")==""){
      if(!localStorage.MsgZone)alert("Ubicación fuera de rango de despacho.\nPuede navegar la aplicación; pero no podrá ordenar pedidos.");
      localStorage.setItem("MsgZone",1);
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

        var fid= fcode[0];
        var fname= fcode[3];
        var price= fcode[4];
        var name= "item_"+plato+"_"+dish.idCat+"_B_"+dish.code;

        var cant=0;
        if(!localStorage.getItem(name)){          
          localStorage.setItem(name,JSON.stringify({id:fid,cant:cant,pos:pos,code:dish.code,cat:dish.idCat,fname:fname,price:price}));
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
          localStorage.setItem(name,JSON.stringify({id:fid,cant:cant,pos:pos,code:dish.code,cat:dish.idCat,fname:fname,price:price}));
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
	setTimer();
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
          Narray.push({pos:valor.pos,data:dat[m],cant:valor.cant});         
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
    var cant= datos[m].cant;
        var price= parseInt(datos[m].data.price);
        
        var image=base_url+"resources/images/dish/"+code+"_2.png?rand="+rand; 
        
        var vItem= "item_"+dish+"_"+cat+"_"+tipo+"_"+code;
        cant= Items.getExtraDish(vItem);
        
        var add="";
    if(cant>0){
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
        cantDish=localStorage.getItem("cant_"+tipo+"_"+dish);       
        if(cantDish>0)total=htotal*cantDish;
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
    setTimer();
	$scope.message = 'Esta es la página de "Login"';
  });

  angularRoutingApp.controller('mi_cuentaController', function($scope) {
	setTimer();
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
	setTimer();
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
    var id_zona=2;
    if(zona.id)id_zona=zona.id;
    ajaxrest.getDishes("zone="+id_zona+"&category="+cat+"&token="+localStorage.token+"&dimension="+localStorage.dimension);
    var datos= $("#datos").val();
    if(datos)$scope.dishes = angular.fromJson(datos);
    
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
	setTimer();
	setBackground("fondo","");
    $(".menusup button.ico-menu span").css("background","url(images/flecha_atras.png)");
    var items="";
    var zona= JSON.parse(localStorage.zona);    
    var id_zona=2;
    if(zona.id)id_zona=zona.id;   
    
    if(localStorage.token){
      var data= ajaxrest.getDishDay("zone="+id_zona+"&token="+localStorage.token);
      if(data){
        var dat = angular.fromJson(data);
        var dish=[];
        if(dat.length>0){
          for(var i=0;i<dat.length;i++){          
            if(dat[i].idCat==1)$scope.sopas= base_url+"resources/images/dish/"+dat[i].code+"_2.png?rand="+rand;
            if(dat[i].idCat==2)$scope.arroz= base_url+"resources/images/dish/"+dat[i].code+"_2.png?rand="+rand;         
            if(dat[i].idCat==3)$scope.carnes= base_url+"resources/images/dish/"+dat[i].code+"_2.png?rand="+rand;
            if(dat[i].idCat==4)$scope.guarnicion= base_url+"resources/images/dish/"+dat[i].code+"_2.png?rand="+rand;
            if(dat[i].idCat==5)$scope.bebidas= base_url+"resources/images/dish/"+dat[i].code+"_2.png?rand="+rand;
            var item = {id:dat[i].id,code:dat[i].code, cat:dat[i].idCat,fname:dat[i].name,price:dat[i].price}; 
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
        localStorage.setItem("item_"+plato+"_"+items[j].cat+"_R_"+items[j].code,JSON.stringify({id:items[j].id,cant:1,pos:j+1,code:items[j].code,cat:items[j].cat,fname:items[j].fname,price:items[j].price}));
      }

      localStorage.setItem("plato",plato);
      localStorage.setItem("cant_R_"+plato,1);
      $("#totalDish").html(Items.getNumDish());
      $location.path("compras");
    } 
    $(".botones,.contpag,.verplatoico,.pedidotar").css({"bottom":+$("li.carrito a img").height()+"px"});      
  }); 

  angularRoutingApp.controller('pagoController', function($scope,Items,Currency) {   
	setTimer();
	setBackground("","white");    
	$(".menusup button.ico-menu span").css("background","url(images/flecha_atras.png)");
	var id_cliente="";
	var nombre_cliente="";
	var cellPhone="";
	var direccion="";
	var idType="";
    $(".direcciones").hide();
    var datos= localStorage.getItem("cuenta");
    if(datos!=null){
      var data= JSON.parse(datos);
      var cont=0;      
      if(data.idType!="")idType= data.idType;      
/*      if(data.address!="")direccion= data.address;
      $scope.direccion= direccion;*/
      id_cliente= data.id;
      $scope.user_id= data.id+"&session="+localStorage.token;
      nombre_cliente= data.names;
      $scope.nombre_cliente= nombre_cliente;
      cellPhone= data.cellPhone;
      direccion='<li>&nbsp;</li>';
      var dir= ajaxrest.getLastAddress("user="+id_cliente+"&token="+localStorage.token);
      if(dir!=""){
        for(var j=0;j<dir.length;j++){
      cont++;
          var datos= dir[j].address+'|'+dir[j].num+'|'+dir[j].reference;
          direccion+='<li><span class="dirs" title="'+datos+'">'+dir[j].address+'</span><i class="glyphicon glyphicon-minus-sign"></i></li>';
        }
      }
    if(cont!=0)$(".direcciones").show();
      $scope.direcciones_frecuentes= direccion;   
    }   

    if(localStorage.getItem("direccion")){
	  $scope.bono= localStorage.getItem("bono");
	  $scope.direccion= localStorage.getItem("direccion");
	  $scope.referencia= localStorage.getItem("referencia");
	  $scope.numero= localStorage.getItem("numero");

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
          var idD=dat[m].id;
          var code=dat[m].code;
          var name=dat[m].name;
          var cat=dat[m].idCat;
          var price=parseInt(dat[m].price); 

          var vItem= "item_"+dish+"_"+cat+"_"+tipo+"_"+code;

          cant= Items.getExtraDish(vItem);
          var add="";
          orderxitems.push({idDish:dish,idItem:idD,qty:cant,price:price});                    
          
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
          total= parseInt(localStorage.valor_recomendado * cantDish);
          total2=total;
        }
    
    	var shipping= localStorage.valor_domicilio;         
        orderdetail.push({numDish:dish,qty:cantDish,price:total2,shipping:shipping,type:type});

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
    $("#total").html(Currency.setMoney(Gtotal + tDomicilio, 0, ",", "."));
	$("#Gtotal").val(Gtotal);
	$("#tDomicilio").val(tDomicilio);
    $scope.valor_plato= " Und x "+domicilio;	
	
	if($scope.bono!=""){
		getBonus($scope.bono,Gtotal,tDomicilio);
	}
    setBackDefaultPay();

    $scope.bonoChanged = function() {
      var bono= $scope.bono.trim();
      getBonus(bono,Gtotal,tDomicilio);
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
      var bono= $("#bono").val();
      var direccion= $("#direccion").val();   
      var referencia= $("#referencia").val();
      var numero= $("#numero").val();
      var tipo= $('input[name=tipo]:checked').val();
      var tipoPago= $("#tipoPago").val();
      var zona= JSON.parse(localStorage.getItem("zona"));
      var Hbono= $('#hbono').val();
      var order=[];   

      if(Gtotal>0){       
        if(!localStorage.getItem("cuenta")){
          $(".div_loading").fadeOut();
          alert("Debe estar logueado para terminar el pedido.");
          localStorage.setItem("orden","Pendiente");
          localStorage.setItem("bono",bono);
		  localStorage.setItem("direccion",direccion);
          localStorage.setItem("referencia",referencia);
          localStorage.setItem("numero",numero);
          localStorage.setItem("tipo",tipo);
          window.location = "login.html#/cuenta";         
        }else{
      var flag=true;
      var bono=$("#bono").val();
      if(bono!=""){   
        var bonus= ajaxrest.getBono("bono="+bono+"&token="+localStorage.token);		
		if(!bonus){
            flag=false;					
			localStorage.removeItem("bono");
			$(".bono").hide(); 
			$(".bono").css("display","none");
			$("#bono").val('');
			$("#hbono").val('');
			getBonus($("#bono").val(''),parseInt($("#Gtotal").val()),parseInt($("#tDomicilio").val()));			
        }
      }
	  
	var statusZone= ajaxrest.getStatusZone("zona="+zona.id+"&token="+localStorage.token);
    if(statusZone[0].status==0){
	  flag=false;
      alert("Lo sentimos la tienda esta cerrada en estos momentos.\nPuede navegar la aplicación; pero no podrá ordenar pedidos.");
    }	  
      
      if(flag){      
      $scope.nombre_cliente= nombre_cliente;      
      $(".div_loading").fadeIn();
      setTimeout(function() {   
      var data= ajaxrest.getUser("email="+localData['email']+"&token="+localStorage.token); 
      var dat = angular.fromJson(data);     
      if(dat[0].survey != "0")$("#encuesta").hide();      
        getQuadrant(zona.id,zona.code);         
        var quadrant= localStorage.quadrant;
        if(quadrant != "n/a" && quadrant != ""){
        if(direccion!=""){
                     
        var coords="";
        if(localStorage.position){
          coord= JSON.parse(localStorage.position);
          coords= coord.lat+","+coord.lng;
        }              
        order.push({idUser:id_cliente,coordinates:coords,quadrant:quadrant,idZone:zona.id,idCupon:Hbono,address:direccion,type:tipo,typePay:tipoPago,num:numero,reference:referencia,cellPhone:cellPhone,status:71});
        
        var checkInv= ajaxrest.checkInv(order,orderdetail,orderxitems);       
        var contI=0;
        var datos=[];codes=[];names=[];cants=[];sols=[];disps=[];
        for(var i=0;i<checkInv.length;i++){
          var data= checkInv[i];
          var code= data.code;
          var name= data.name;
          var disp= data.disp;
          var sol= data.sol;
		  sols[i]= parseInt(sol);
		  disps[i]=  parseInt(disp);
		  codes[i]= code;
		  names[i]= name;
        }
		var codigos=[];nombres=[];solicitados=[];disponibles=[];
		for(var h=0;h<codes.length;h++){
			var obj= String(codes[h]);
			if(codigos[ obj ]){
				codigos[ obj ]= codes[h];
				nombres[ obj ]= names[h];
				solicitados[ obj ]= solicitados[ obj ] + sols[h];
			}else{
				codigos[ obj ]= String(codes[h]);
				nombres[ obj ]= names[h];				
				solicitados[ obj ]= sols[h];
				disponibles[ obj ]= disps[h]; 			
			}
		}
		var cantF=0;
		for (i in codigos) {
			 var obj2= String(codigos[i])
			 cantF= disponibles[ obj2 ] - solicitados[ obj2 ];
			 var object= obj2 +"|"+ nombres[ obj2 ] + "|" + disponibles[ obj2 ] + "|" +solicitados[ obj2 ];
			  if(cantF<0){
				  contI++;
				  datos.push( object );
			  }	 
		}
        
        var final= sortUnique(datos);
        
        if(contI==0){		  
          ajaxrest.processOrder(order,orderdetail,orderxitems);
          $(".vrdirc,.bondesc").css("display","none");
          $(".confirmacion").css("display","inline-block");
          localStorage.removeItem("orden");
          localStorage.removeItem("direccion");
          localStorage.removeItem("referencia");
          localStorage.removeItem("numero");
          localStorage.removeItem("tipo");
          $("#totalDish").html("0");
          cleanSession();
		  localStorage.setItem("tipo_pago","efectivo");
          $(".div_loading").fadeOut(); 
          $('.container').animate({
            scrollTop: $("#topmobil").offset().top
          }, 5);                    
        }else{
          $(".div_loading").fadeOut();
          var inventario= "";
          for(var j=0;j<final.length;j++){
            var prod= final[j].split("|");
            var rest= parseInt(cants[ final[j] ]) - prod[1];
			var disp=0;
			if(prod[2]>0)disp=prod[2];
            inventario+="- "+prod[1]+": Disponible ("+disp+"), Solicitado ("+ prod[3] +")\n";
            descargarInv(prod[0],prod[1],disp,prod[3]);
          }		  
          alert("Algunos productos de su pedido ya estan agotados. Estos serán retirados de su orden para poder continuar:\nINVENTARIO DE PRODUCTOS\n"+inventario);
		  var platos= getNumDish();
		  if(platos==0)$("#totalDish").html("0");
           window.location = "internal.html#/compras"; 
        }
                     
        }else{
        $(".div_loading").fadeOut();
        alert("Dirección es requerida.");               
        }
        }else{
          $(".div_loading").fadeOut();
          alert("Usuario fuera de cobertura.\nNo se pueden realizar pedidos.");         
        }          
      }, 800);
        }
      }
      }else{
      alert("Carro de compras esta vacio."); 
      window.location = "internal.html"; 
    }
    }	
  });

  angularRoutingApp.controller('nosotrosController', function($scope) {
	setTimer();	  
    setBackground("","white");
    var nosotros = ajaxrest.getContent("id=1322&token="+localStorage.token);
    
    $scope.imagen= base_site+"imagenes/nosotros/imagen1/"+nosotros[0].img_matrix+"?rand="+rand;
    $scope.titulo= nosotros[0].nombre_matrix;
    $scope.info_nosotros= nosotros[0].contenido_matrix;
  }); 

  angularRoutingApp.controller('felicitacionesController', function($scope) {
	setTimer();	  
    setBackground("fondo","");  
    var desde= JSON.parse(getVariables(252));
    $("#desde").val(desde[0].valor_variable);       
    $scope.sendContact = function (type) {      
      ajaxrest.sendContact(type);
    },
    $scope.setTipo = function (type) {      
      if(type=="Felicitaciones"){
        desde= JSON.parse(getVariables(252));
        $("#chk_Felicitaciones").attr("src","images/checkbox_ok.png");
        $("#chk_Reclamo").attr("src","images/checkbox.png");
        $("#tipo").val('Felicitaciones');
      }else{
        desde= JSON.parse(getVariables(253));
        $("#chk_Felicitaciones").attr("src","images/checkbox.png");
        $("#chk_Reclamo").attr("src","images/checkbox_ok.png");
        $("#tipo").val('Reclamo');
      }
      $("#desde").val(desde[0].valor_variable);
    }     
  }); 
  angularRoutingApp.controller('contactenosController', function($scope) {
    setTimer();
	setBackground("fondo","");
    var desde= JSON.parse(getVariables(169)); 
    $("#desde").val(desde[0].valor_variable);   
    $scope.sendContact = function (type) {
      ajaxrest.sendContact(type);
    }
  });
  angularRoutingApp.controller('redesController', function($scope) {
    setTimer();
	setBackground("fondo","");
    var data= JSON.parse(JSON.stringify(ajaxrest.getSocialNet())); 
    for(var i=0;i<data.length;i++){ 
      $(".redesi").append('<a href="internal.html#/redes" onclick="openRedes(\''+data[i].valor_variable+'\');" class="linkredes '+data[i].contenido_variable+'"></a>');
    }
  }); 
  angularRoutingApp.controller('guiaController', function($scope) {
    setTimer();
	setBackground("fondo","");      
  }); 

  angularRoutingApp.controller("mapaController", ["$scope", function ($scope) {
    setTimer();
	$("li").removeClass("active");
    $(".menupie ul li:nth-child(4)").addClass("active");
    $scope.minutes="N/A";
    $(".txt_mapa").html("Min. para tu entrega");
    if(localStorage.position){
      var position= JSON.parse(localStorage.position);
      $scope.Area = { Name: "Mi ubicación", Latitude: position.lat, Longitude: position.lng };
    }

    $(".menusup button.ico-menu span").css("background","url(images/linmenu.png)");
    $(".botones,.contpag,.verplatoico,.pedidotar").css({"bottom":+$("li.carrito a img").height()+"px"});
    
    var cont=$(".container").height();
    var menu=$(".menusup").height();
    var pie=$(".menupie").height();
    var alto= parseInt(cont) - (parseInt(menu) + parseInt(pie));
    $("#areaMap").css("height",alto+"px");
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
      controller: function ($scope,$location,$interval) {
        var mapOptions;
        var map;           
        var marker;
        var zone= JSON.parse(localStorage.zona);
        var position= JSON.parse(localStorage.position);        
        var MyPosition = new google.maps.LatLng(position.lat, position.lng);  
        var markers = {};
        var initialize = function () {
          var lat= 6.195603;
          if(position.lat)lat= position.lat;
          var lng= -75.562061;
          if(position.lng)lng= position.lng;

          mapOptions = {
            zoom: 14,
            panControl: false,
            center: new google.maps.LatLng(lat,lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map(document.getElementById('areaMap'), mapOptions);
          var homeControlDiv = document.createElement('div');
          var homeControl = new HomeControl(homeControlDiv, map);
          
          var area={Latitude:lat,Longitude:lng};      
          createMarker(area,'Mí ubicación','rastreo_cliente');
      posDomiciliario();
          
          homeControlDiv.index = 9999;
          map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
        };

        var createMarker = function (area,Name,image) {
          var position = new google.maps.LatLng(area.Latitude, area.Longitude);
          map.setCenter(position);
      //alert(Name+" - "+area.Latitude);
      if(markers[1]){
      marker = markers[1]; 
      marker.setMap(null);        
      }
          marker = new google.maps.Marker({
            map: map,
            position: position,
            title: Name,
            icon: 'images/'+image+'.png'
          });
      if(Name=="Domiciliario" || Name=="Cocina")markers[1] = marker;    
        };

        var createKML = function (src) {
          var kmlLayer = new google.maps.KmlLayer(src, {
            suppressInfoWindows: true,
            preserveViewport: true,
            map: map
          });             
        };
    
        var posDomiciliario = function () {
        var datos= localStorage.getItem("cuenta");
        if(datos != null){
          var data= JSON.parse(datos);
          var dat = angular.fromJson(data);
          var orden= ajaxrest.getLastOrden(dat.id);                 
          var route = [];         
          if(orden){
            var or = angular.fromJson(orden);
            if(or[0].coordinates && or[0].status==73){
              var mins=0;
              var rest=or[0].mins - or[0].mins_r;
              if(rest>0)mins=rest;
              $(".mins").html(mins);
              $(".txt_mapa").html("Min. para tu entrega");
              var coord= or[0].coordinates.split(',');
              var pos= {Latitude:coord[0],Longitude:coord[1]};                    
              createMarker(pos,'Domiciliario','rastreo_domiciliario');
            }else{
              var zona= JSON.parse(localStorage.zona);
              var code= ajaxrest.getZone(zona.code);
              var coord= code[0].coordinates.split(",");
              var pos= {Latitude:coord[0],Longitude:coord[1]};
              $(".txt_mapa").html("Orden en empaquetado");
              createMarker(pos,'Cocina','puntero_cocina');              
            }
          }
        }           
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
      var timer= $interval(function(){
        var page= $location.url(); 
        if(page=="/mapa"){
          posDomiciliario();
          //var watchID = navigator.geolocation.watchPosition(function(position) {                
          var pos= JSON.stringify({lat:area.Latitude,lng:area.Longitude});
          if(pos != localStorage.position){
           localStorage.setItem("position",pos);
           createMarker(area,'Mí ubicación','rastreo_cliente');
           //alert("Cambio posición: "+pos);  
          }      
          //});
        }else{
          if(angular.isDefined(timer)){
            $interval.cancel(timer);
            timer=undefined;
          }
        }
      },15000);
  

            /*createKML(localStorage.getItem("domain")+'resources/kmls/zona_total.kml');*/
            var zona= JSON.parse(localStorage.getItem("zonas"));
            for (var i = 0; i < zona.length; i++){
              var zone= zona[i].code;
              var show= zona[i].show_kml;
              if(show==1){
                createKML(localStorage.getItem("domain")+'resources/kmls/'+zone+'.kml');
/*                createKML(localStorage.getItem("domain")+'resources/kmls/'+zone+'_a.kml');
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
        if(arr[0])image= base_url+"resources/images/dish/"+arr[0][1]+"_2.png?rand="+rand;
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
            plato.push({id:dat.id,code:dat.code,name:dat.fname,price:dat.price,idCat:dat.cat});
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