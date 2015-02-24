app.initialize();

if (window.jQuery) {  
   $(function(){
    // Tamaño container
    $(".container").css({"min-height":$(document).height()});

    $(window).load(function(){
        $(".menupie ul li").css({"height":$("li.carrito a img").height()});
        $(".pedidotar").css({"bottom":$("li.carrito a img").height()});
        $(".contpag").css({"bottom":$("li.carrito a img").height()});
        $(".latermenu").css({"margin-top":$(".menusup").height()});
        $(".botones").css({"bottom":$("li.carrito a img").height()+"px"});
    });
    //fin tamaño container      
    
    //Mostrar menu lateral  
    $(".verlatermenu").click(function(event){
        event.preventDefault();
        var img= $(".menusup button.ico-menu span").css('background-image').split("flecha_atras");        
        if(img[1] && img[1].length>0){
            $(".menusup button.ico-menu span").css("background","url(images/linmenu.png)");
            //window.history.back();
            var url= window.location.href.split('#/');
            var data= url[1].split("/");

            var redir="internal.html#/slider";          
            if(data[1]=="ins")redir= "internal.html#/menu";
            if(data[1]=="edit")redir= "internal.html#/compras";
            if(url[1]=="pago#topmobil")redir= "internal.html#/compras";
			if(url[1]=="pago")redir= "internal.html#/compras";			
            window.location = redir;
        }else{
            var position = $(".latermenu").position();
            if(position.left==0){
                $(".latermenu").animate({"left":-412},200);
            }else{
                $(".latermenu").animate({"left":0},400);           
            }
            $(".container").animate({
             scrollTop:0
         },"slow");             
        }
    });	
    $(".td a").click(function(){
        $(".latermenu").animate({"left":-412},200);
    });    
    $(".menupie").hover(function(){
        $(".latermenu").animate({"left":-412},200);
    });
    $(document).on("click", ".dirs", function() {
      var dat= this.title.split('|');
      if(dat.length>0){
          if(dat[1]!="")$("#direccion").val(dat[1]);
          if(dat[2]!="")$("#numero").val(dat[2]);
          if(dat[3]!="")$("#referencia").val(dat[3]);
      }
    });
    $(document).on("click", ".glyphicon-minus-sign", function() {
      var dat= this.title.split('|');
      if(dat.length>0){
		  var orden= $(this).prev().attr("title").split("|");
		  ajaxrest.removeAddress(orden[0]);
		  $(this).parents('li').remove();		        
      }
    });	
    $(document).on("click", ".close_guia", function() {
      localStorage.setItem("show_guia","1");
      window.location.href = 'internal.html';
    });
    $(document).on("click", ".audio_play", function(event) {
        event.preventDefault();
        var audio= this.title;
        $("#audio_"+audio).attr("src",localStorage.domain+"resources/audio/"+audio+".mp3");     
        $( this ).toggleClass( "audio_stop", 1000, "audio_play" );
        if($( this ).attr("class")!='audio_play ng-scope')
        {
            $("#audio_"+audio).trigger('play');
        }
        else
        {
            $("#audio_"+audio).trigger('pause');
        }       
        return false;
    }); 

    //Activar menus  
    $(".menupie li a").click(function(){
        $("li").removeClass("active");
        $(this).parent().addClass("active");
    });
})
} else {
    alert("Internet es requerido!");
}      
/* Funciones */    
function hiddeMenu(){
    $(".latermenu").animate({"left":-412},200);
}

function addShop(action){
    var num=$(".numero").html();
    if(action=="mas"){
        num++;
    }
    if(action=="menos"){
       if(num>0)num--;
   } 
   localStorage.setItem("num",num);
   $(".numero").html(num);
   return false;
}
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}