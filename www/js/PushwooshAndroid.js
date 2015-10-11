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
				//alert('user data: ' + JSON.stringify(userData));
			}
		}
	);

	pushNotification.onDeviceReady({ projectid: "746109479988", appid : "825C3-92C11" });

	
	pushNotification.registerDevice(
		function(token)
		{
			onPushwooshAndroidInitialized(token);
			alert("Register Android");
		},
		function(status)
		{
			alert(JSON.stringify(['failed to register ', status]));			
		}
	);
}

function onPushwooshAndroidInitialized(pushToken)
{
	var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
	pushNotification.getPushToken(
		function(token)
		{
			//alert('push token: ' + token);
			localStorage.setItem("pushtoken",token);
		}
	);

	//and HWID if you want to communicate with Pushwoosh API
	pushNotification.getPushwooshHWID(
		function(token) {
			//alert('Pushwoosh HWID: ' + token);		
		}
	);
}
