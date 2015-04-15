app.initialize();
startApp();

function startApp() {	
	localStorage.clear();
	localStorage.removeItem("position");
	localStorage.removeItem("quadrant");
	localStorage.removeItem("valor_buffet");
	localStorage.removeItem("valor_domicilio");
	localStorage.removeItem("valor_recomendado");
	localStorage.removeItem("zonas");
	localStorage.removeItem("MsgZone");	
	
    window.setTimeout(function() {
		window.location.href = 'load.html';
    }, 800);
}