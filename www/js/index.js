app.initialize();
startApp();

function startApp() {	
	localStorage.removeItem("position");
	localStorage.removeItem("quadrant");
	localStorage.removeItem("valor_buffet");
	localStorage.removeItem("valor_domicilio");
	localStorage.removeItem("valor_recomendado");
	localStorage.removeItem("zonas");
	localStorage.removeItem("MsgZone");	
	
	var dispositivo = navigator.userAgent.toLowerCase();
	if( dispositivo.search(/android/) > -1 ){
		localStorage.setItem("OS","android");
	}else if( dispositivo.search(/iphone/) > -1 ){
		localStorage.setItem("OS","iphone");
	}else{
		localStorage.setItem("OS","n/a");
	}
	
    window.setTimeout(function() {
		window.location.href = 'load.html';
    }, 800);
}