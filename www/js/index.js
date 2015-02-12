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
	
    window.setTimeout(function() {
		window.location.href = 'load.html';
    }, 1000);
}