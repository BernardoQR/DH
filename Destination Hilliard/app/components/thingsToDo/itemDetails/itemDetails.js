var helpers = require('../../../utils/widgets/helper'),

    dialogs = require('ui/dialogs'),
    dataService = require('../../../dataProviders/destinationHilliard');
var socialShare = require("nativescript-social-share");


function navigatedTo(args) {
    var page = args.object;

    page.bindingContext = page.navigationContext;
}


exports.share = function () {
    socialShare.shareText(shareLink);
};


exports.navigatedTo = navigatedTo;