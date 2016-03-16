'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    // additional requires
    viewModel = require('./events-view-model');

//var FetchStream = require("fetch").FetchStream;



// additional functions
function pageLoaded(args) {
    var page = args.object;

    var fetch = new FetchStream("destinationhilliard.com/events/feed");

    //fetch.on("data", function (chunk) {
    //   alert(chunk);
    //});

    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        // additional pageInit
    }
}

// START_CUSTOM_CODE_events
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_events
exports.pageLoaded = pageLoaded;