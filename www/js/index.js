app.initialize();
navigator.notification.alert(
    "There was an error connecting to the Internet. Would you like to retry?.",
    "No Internet connection",
    "No",
    "Yes",
    {
        onClose: function(buttonIndex) {
            if (buttonIndex == 1)
               // retryConnection();
        }
    }
);
//window.location.href = 'load.html';