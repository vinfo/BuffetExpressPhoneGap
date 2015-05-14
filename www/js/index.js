app.initialize();
navigator.notification.alert(
    "Mensaje completo",
    "No Internet connection",
    "No",
    "Aceptar",
    {
        onClose: function(buttonIndex) {
            return true;
        }
    }
);  
//window.location.href = 'load.html';