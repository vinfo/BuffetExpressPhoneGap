app.initialize();

if (window.jQuery) {  
 $(function(){
    // Tamaño container
    $(".container").css({"min-height":$(document).height()});    

    $(window).load(function(){
        $(".menupie ul li").css({"height":$("li.carrito a img").height()});
        $(".pedidotar").css({"bottom":$("li.carrito a img").height()});
        $(".contpag").css({"bottom":$("li.carrito a img").height()});
    })    

    // Tamaño alto menu inferior
    $(window).load(function(){ 
        $(".menupie ul li").css({"height":$("li.carrito a img").height()}); 
        $(".latermenu").css({"margin-top":$(".menusup").height()}); 
    });
    //fin tamaño container    
    
    // Menu lateral
    $(".latermenu").hover(function(){
    },function(){
        $(".latermenu").animate({"left":-412},200);
        return false;
    });             
    
    //Mostrar menu lateral  
    $(".verlatermenu").click(function(event){
        event.preventDefault();
        var position = $(".latermenu").position();
        if(position.left==0){
            $(".latermenu").animate({"left":-412},200);
        }else{
            $(".latermenu").animate({"left":0},400);           
        }
        $(".container").animate({
           scrollTop:0
       },"slow");         
    });
    $(".td a").click(function(){
        $(".latermenu").animate({"left":-412},200);
    });    
    $(".menupie").hover(function(){
        $(".latermenu").animate({"left":-412},200);
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