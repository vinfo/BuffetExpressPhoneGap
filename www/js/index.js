app.initialize();
alert(222);
navigator.notification.alert(
            'Prueba',
            alertDismissed, 
            'Alerta',
            'Aceptar'
        );
function alertDismissed() {
    // do something
} 
alert(33);       
//window.location.href = 'load.html';