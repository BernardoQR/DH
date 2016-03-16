'use strict';
var helpers = require('../utils/widgets/helper'),
    navigationViewModel = require('./navigation-view-model');
var frameModule = require("ui/frame");
var imageModule = require("ui/image");



function pageLoaded(args) {
    var page = args.object;
    helpers.platformInit(page);
    page.bindingContext = navigationViewModel;
    navigationViewModel.set('pageTitle', 'Destination Hilliard');

}

function menuItemTap(args) {
    helpers.navigate(navigationViewModel.menuItems[args.index]);
}

exports.pageLoaded = pageLoaded;
exports.menuItemTap = menuItemTap;
