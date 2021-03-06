'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    service = require('./itineraries-service'),
    observable = require("data/observable"),
    segmentedBarModule = require("ui/segmented-bar"),
    viewModel = require('./itineraries-view-model');



//var mapsModule = require("nativescript-google-maps-sdk/map-view");
//var mapsModule = require("nativescript-google-maps-sdk");
//var GoogleMapsLoader = require('google-maps');
//var mapbox = require("nativescript-mapbox");


function ShowList(eventData) {
    viewModel.set('ListVisible', "visible");
    viewModel.set('MapVisible', "collapsed");

};


function ShowMap(args) {
    viewModel.set('ListVisible', "collapsed");
    viewModel.set('MapVisible', "visible");
}


function pageLoaded(args) {
    var page = args.object;
    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);
    viewModel.set('indexExpanded', -1);
    helpers.platformInit(page);

    var itemsList = [];
    service.getAllRecords()
        .then(function (result) {
            result.forEach(function (item) {
                flattenLocationProperties(item);
                itemsList.push({
                    itineraryTitle: item.Title,
                    itineraryDescription: item.Description,
                    itineraryId: item.Id,
                    itineraryItems: [],
                    visibility: "collapsed"
                });
            });
            viewModel.set('listItems', itemsList);
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
            alert("error2")
        });

    viewModel.set('isLoading', false);

    page.bindingContext = viewModel;
    if (isInit) {
        isInit = false;
        // additional pageInit
    }
}


function onListViewItemTap(args) {
    var itemsList = [];

    itemsList = GetListItems();
    var itemData = itemsList[args.index];

    var ChildItems = [];

    if (viewModel.get('indexExpanded') != args.index) {
        viewModel.set('indexExpanded', args.index);
        service.getDynamicContent(itemData.itineraryId)
                        .then(function (SubItems) {
                            ChildItems = [];
                            SubItems.forEach(function (dynamicContent) {
                                flattenLocationProperties(dynamicContent);
                                ChildItems.push({
                                    pointOfInterestId: dynamicContent.Id,
                                    pointOfInterestTitle: dynamicContent.Title,
                                    pointOfInterestDescription: dynamicContent.Description,
                                    pointOfInterestTelephone: dynamicContent.Telephone,
                                    pointOfInterestAddress: dynamicContent.Address,
                                    pointOfInterestImage: dynamicContent.Image,
                                    piPhoneAndAddress: dynamicContent.Address + " . " + dynamicContent.Telephone,
                                    pointOfInterestImageUrl: ""
                                });
                            });
                            itemsList[args.index].visibility = "visible";
                            itemsList[args.index].itineraryItems = ChildItems;
                            viewModel.set('listItems', "");
                            viewModel.set('listItems', itemsList);
                            viewModel.set('SubListItems', ChildItems);
                        })
             .catch(function onCatch(ex) {
                 alert(ex)
             });
    }
    else {
        viewModel.set('indexExpanded', -1);
        itemsList[args.index].visibility = "collapsed";
        itemsList[args.index].subItems = [];
        viewModel.set('SubListItems', []);
        viewModel.set('listItems', []);
        viewModel.set('listItems', itemsList);

    }
}


function onDetailItemTap(args) {
    var subItemsList = GetSubListItems();
    var subItemData = subItemsList[args.index];

    if (subItemData.pointOfInterestImage != undefined && subItemData.pointOfInterestImage != null && subItemData.pointOfInterestImage != "") {

        service.getImage(subItemData.pointOfInterestImage)
            .then(function (data) {
                var ChildItems = [];
                ChildItems.push({
                    pointOfInterestId: subItemData.pointOfInterestId,
                    pointOfInterestTitle: subItemData.pointOfInterestTitle,
                    pointOfInterestDescription: subItemData.pointOfInterestDescription,
                    pointOfInterestTelephone: subItemData.pointOfInterestTelephone,
                    pointOfInterestAddress: subItemData.pointOfInterestAddress,
                    pointOfInterestImage: subItemData.pointOfInterestImage,
                    piPhoneAndAddress: subItemData.piPhoneAndAddress,
                    pointOfInterestImageUrl: data[0].Uri
                });
                viewModel.set('SubListItems', "");
                viewModel.set('SubListItems', ChildItems);
                helpers.navigate({
                    moduleName: 'components/itineraries/itemDetails/itemDetails',
                    context: GetSubListItems()[0]
                });
            })
         .catch(function onCatch(ex) {
             alert(ex)
         });





    }
    else {
        helpers.navigate({
            moduleName: 'components/itineraries/itemDetails/itemDetails',
            context: subItemData
        });
    }
}


function GetSubListItems() {
    var subItemsList = [];
    subItemsList = viewModel.get('SubListItems');
    return subItemsList;
}


function GetListItems() {
    var itemsList = [];
    itemsList = viewModel.get('listItems');
    itemsList.forEach(function (item) {
        item.visibility = "collapsed";
        item.itineraryItems = "";
    });
    return itemsList;
}


function flattenLocationProperties(dataItem) {
    var propName, propValue,
        isLocation = function (value) {
            return propValue && typeof propValue === 'object' &&
                propValue.longitude && propValue.latitude;
        };

    for (propName in dataItem) {
        if (dataItem.hasOwnProperty(propName)) {
            propValue = dataItem[propName];
            if (isLocation(propValue)) {
                dataItem[propName] =
                    'Latitude: ' + propValue.latitude +
                    'Longitude: ' + propValue.longitude;
            }
        }
    }
}
// additional functions



// START_CUSTOM_CODE_itineraries
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_itineraries
exports.pageLoaded = pageLoaded;
exports.onListViewItemTap = onListViewItemTap;
exports.onDetailItemTap = onDetailItemTap;
exports.ShowMap = ShowMap;
exports.ShowList = ShowList;