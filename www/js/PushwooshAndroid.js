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
		}
	);

	pushNotification.onDeviceReady({ projectid: "746109479988", appid : "825C3-92C11" });

	
	pushNotification.registerDevice(
		function(token)
		{
			onPushwooshAndroidInitialized(token);
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
			alert('push token: ' + token);
		}
	);

	//and HWID if you want to communicate with Pushwoosh API
	pushNotification.getPushwooshHWID(
		function(token) {
			console.warn('Pushwoosh HWID: ' + token);			
		}
	);
	return true;
}
