var provider,
    TelerikBackendServices = require('../everlive/everlive.all.min');

provider = new TelerikBackendServices({

    appId: 'lt3c280403rhmq8t',
    scheme: 'https'
});

// START_CUSTOM_CODE_destinationHilliard
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_destinationHilliard
module.exports = provider;