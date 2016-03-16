var application = require('application');

application.mainModule = 'launchView/launchView';
// START_CUSTOM_CODE_nativeScriptApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

if (application.ios) {
    //GMSServices.provideAPIKey("AIzaSyCuYOQOBzuw4Q2p8pXTHqbrz0mNkI6ICwg");
}

// END_CUSTOM_CODE_nativeScriptApp
application.start();