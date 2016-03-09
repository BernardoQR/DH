'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "Home View",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue0dd"
}, {
    "title": "Places To Eat",
    "moduleName": "components/placesToEat/placesToEat",
    "icon": "\ue0dd"
}, {
    "title": "Places To Stay",
    "moduleName": "components/placesToStay/placesToStay",
    "icon": "\ue0eb"
}, {
    "title": "Things To Do",
    "moduleName": "components/thingsToDo/thingsToDo",
    "icon": "\ue0dd"
}, {
    "title": "Itineraries",
    "moduleName": "components/itineraries/itineraries",
    "icon": "\ue0eb"
}, {
    "title": "Events",
    "moduleName": "components/events/events",
    "icon": "\ue0dd"
}, {
    "title": "Contact Us",
    "moduleName": "components/contactUs/contactUs",
    "icon": "\ue0dd"
}, {
    "title": "Map",
    "moduleName": "components/map/map",
    "icon": "\ue0dd"
}, {
    "title": "Itineraries",
    "moduleName": "components/itineraries2/itineraries2",
    "icon": "\ue0eb"
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;