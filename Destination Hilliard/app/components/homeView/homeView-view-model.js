'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [ {
    "title": "Places To Eat",
    "moduleName": "components/placesToEat/placesToEat",
    "icon": "\ue0eb"
}, {
    "title": "Places To Stay",
    "moduleName": "components/placesToStay/placesToStay",
    "icon": "\ue0eb"
}, {
    "title": "Things To Do",
    "moduleName": "components/thingsToDo/thingsToDo",
    "icon": "\ue0eb"
}, {
    "title": "Itineraries",
    "moduleName": "components/itineraries/itineraries",
    "icon": "\ue0eb"
}, {
    "title": "Events",
    "moduleName": "components/events/events",
    "icon": "\ue0eb"
}, {
    "title": "Contact Us",
    "moduleName": "components/contactUs/contactUs",
    "icon": "\ue0eb"
}];

navigationViewModel.set('menuItems', menuItems);

module.exports = navigationViewModel;