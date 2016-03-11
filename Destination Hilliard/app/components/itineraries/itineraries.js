'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    service = require('./itineraries-service'),
    //mapbox = require("nativescript-mapbox"),
    segmentedBarModule = require("ui/segmented-bar"),
    viewModel = require('./itineraries-view-model');

function test(args) {
   // alert("INNNNNN")
}


function pageLoaded(args) {
    viewModel.set('isLoading', true);
    var page = args.object;
    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);
    helpers.platformInit(page);

    page.bindingContext = viewModel;
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
            //viewModel.set('isLoading', false);
            alert("error2")
        });

    viewModel.set('isLoading', false);

    if (isInit) {
        isInit = false;
        // additional pageInit
    }
}


function onListViewItemTap(args) {
    var itemsList = [];
    var temp = [];
    itemsList = GetListItems();
    var itemData = itemsList[args.index];

    var ChildItems = [];
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
        			    temp.push(itemsList[args.index]);
        			    viewModel.set('listItems', "");
        			    viewModel.set('listItems', itemsList);
        			    viewModel.set('SubListItems', ChildItems);
        			})
         .catch(function onCatch(ex) {
             alert(ex)
         });
}


function onDetailItemTap(args) {
    var subItemsList = GetSubListItems();
    var subItemData = subItemsList[args.index];

    if (subItemData.pointOfInterestImage != null && subItemData.pointOfInterestImage != "") {

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



// START_CUSTOM_CODE_itineraries2
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_itineraries2
exports.pageLoaded = pageLoaded;
exports.onListViewItemTap = onListViewItemTap;
exports.onDetailItemTap = onDetailItemTap;