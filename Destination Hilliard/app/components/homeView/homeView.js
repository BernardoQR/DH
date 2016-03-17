'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    // additional requires
    viewModel = require('./homeView-view-model');


function pageLoaded(args) {
    var page = args.object;
    helpers.platformInit(page);
    page.bindingContext = viewModel;
    viewModel.set('pageTitle', 'Destination Hilliard');

}

function menuItemTap(args) {
    helpers.navigate(viewModel.menuItems[args.index]);
}

exports.pageLoaded = pageLoaded;
exports.menuItemTap = menuItemTap;
