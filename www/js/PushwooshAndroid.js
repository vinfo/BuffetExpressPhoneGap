function registerPushwooshAndroid() {

 	var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");

	//set push notifications handler
	document.addEventListener('push-notification',
		function(event)
		{
            var title = event.notification.title;
            var userData = event.notification.userdata;

            //dump custom data to the console if it exists
            if(typeof(userData) != "undefined") {
				console.warn('user data: ' + JSON.stringify(userData));
			}

			//and show alert
			alert("Notificacion: "+title);
		}
	);

	pushNotification.onDeviceReady({ projectid: "746109479988", appid : "825C3-92C11" });

	
	pushNotification.registerDevice(
		function(token)
		{
			alert("Token "+token);
			//callback when pushwoosh is ready
			onPushwooshAndroidInitialized(token);
		},
		function(status)
		{
			alert("failed to register: " +  status);
		    console.warn(JSON.stringify(['failed to register ', status]));
		}
	);
}

function onPushwooshAndroidInitialized(pushToken)
{
	var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
	
	//if you need push token at a later time you can always get it from Pushwoosh plugin
	pushNotification.getPushToken(
		function(token)
		{
			console.warn('push token: ' + token);
		}
	);

	//and HWID if you want to communicate with Pushwoosh API
	pushNotification.getPushwooshHWID(
		function(token) {
			console.warn('Pushwoosh HWID: ' + token);
			alert('Pushwoosh HWID: ' + token);
			return true;
		}
	);
}
