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

exports.placesToEat = function () {
    helpers.navigate("components/placesToEat/placesToEat");
};

exports.placesToStay = function () {
    helpers.navigate("components/placesToStay/placesToStay");
};

exports.thingsToDo = function () {
    helpers.navigate("components/thingsToDo/thingsToDo");
};

exports.itineraries = function () {
    helpers.navigate("components/itineraries/itineraries");
};

exports.events = function () {
    helpers.navigate("components/events/events");
};

exports.contactUs = function () {
    helpers.navigate("components/contactUs/contactUs");
};



function menuItemTap(args) {
    helpers.navigate(viewModel.menuItems[args.index]);
}

exports.pageLoaded = pageLoaded;
exports.menuItemTap = menuItemTap;
