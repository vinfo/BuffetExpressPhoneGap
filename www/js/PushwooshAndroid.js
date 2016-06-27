function registerPushwooshAndroid() {
 	var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
 	alert("Archivo Android ");

	//set push notifications handler
	document.addEventListener('push-notification',
		function(event)
		{
            var title = event.notification.title;
            var userData = event.notification.userdata;

            var notification = event.notification;
            alert(notification.aps.alert);
                               
            //clear the app badge
            pushNotification.setApplicationIconBadgeNumber(0);            

            //dump custom data to the console if it exists
            if(typeof(userData) != "undefined") {
				//alert('user data: ' + JSON.stringify(userData));
			}
		}
	);

	pushNotification.onDeviceReady({ projectid: "746109479988", appid : "825C3-92C11" });

	//alert("Registrar");
	pushNotification.registerDevice(
		function(token)
		{
			alert("Registrando token Android"+ token);			
			onPushwooshAndroidInitialized(token);
			localStorage.setItem("pushtoken",token);	
		},
		function(status)
		{
			console.warn(JSON.stringify(['failed to register ', status]));			
		}
	);
}

function onPushwooshAndroidInitialized(pushToken)
{
	var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
	pushNotification.getPushToken(
		function(token)
		{
			console.log('push token: ' + token);
			//alert("Inicializando "+ token);
			console.warn('push token device: ' + token);
			localStorage.setItem("pushtoken",token);
		}
	);

	//and HWID if you want to communicate with Pushwoosh API
	pushNotification.getPushwooshHWID(
		function(token) {
			//alert('Pushwoosh HWID: ' + token);
			//alert("Obteniendo "+ token);	
		}
	);
}
