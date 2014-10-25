cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.boyvanderlaak.cordova.plugin.orientationchanger/www/orientationchanger.js",
        "id": "com.boyvanderlaak.cordova.plugin.orientationchanger.OrientationChanger",
        "clobbers": [
            "window.plugins.orientationchanger"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.OrientationLock/www/orientationLock.js",
        "id": "com.phonegap.plugins.OrientationLock.OrientationLock",
        "clobbers": [
            "OrientationLock"
        ]
    },
    {
        "file": "plugins/com.tsukurusha.cordova.screenorientation/www/ScreenOrientation.js",
        "id": "com.tsukurusha.cordova.screenorientation.screenOrientation",
        "merges": [
            "navigator.screenOrientation"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/www/Toast.js",
        "id": "nl.x-services.plugins.toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/test/tests.js",
        "id": "nl.x-services.plugins.toast.tests"
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.boyvanderlaak.cordova.plugin.orientationchanger": "0.1.1",
    "com.phonegap.plugins.OrientationLock": "0.1",
    "com.tsukurusha.cordova.screenorientation": "0.2.1",
    "nl.x-services.plugins.toast": "2.0.2",
    "org.apache.cordova.network-information": "0.2.13"
}
// BOTTOM OF METADATA
});