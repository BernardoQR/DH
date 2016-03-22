'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
     service = require('./thingsToDo-service'),
    observable = require("data/observable"),
    segmentedBarModule = require("ui/segmented-bar"),
    // additional requires
    viewModel = require('./thingsToDo-view-model');


function ShowList(eventData) {
    viewModel.set('ListVisible', "visible");
    viewModel.set('MapVisible', "collapsed");

};

function ShowMap(args) {
    viewModel.set('ListVisible', "collapsed");
    viewModel.set('MapVisible', "visible");
}

// additional functions
function pageLoaded(args) {
    viewModel.set('isLoading', true);
    var page = args.object;
    viewModel.set('indexExpanded', -1);
    helpers.platformInit(page);

    page.bindingContext = viewModel;
    var itemsList = [];
    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);

    service.getAllRecords()
        .then(function (result) {

            result.forEach(function (item) {
                flattenLocationProperties(item);
                itemsList.push({
                    itemTitle: item.Title,
                    itemDescription: item.Description,
                    itemId: item.Id,
                    subItems: [],
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
    itemsList = GetListItems();
    var itemData = itemsList[args.index];
    var ChildItems = [];

    if (viewModel.get('indexExpanded') != args.index) {
        viewModel.set('indexExpanded', args.index);
        service.getDynamicContent(itemData.itemId)
                        .then(function (SubItems) {
                            ChildItems = [];
                            SubItems.forEach(function (dynamicContent) {
                                flattenLocationProperties(dynamicContent);
                                ChildItems.push({
                                    thingstoDoId: dynamicContent.Id,
                                    thingstoDoTitle: dynamicContent.Title,
                                    thingstoDoDescription: dynamicContent.Description,
                                    thingstoDoTelephone: dynamicContent.Telephone,
                                    thingstoDoAddress: dynamicContent.Address,
                                    thingstoDoImage: dynamicContent.Image,
                                    piPhoneAndAddress: dynamicContent.Address + " . " + dynamicContent.Telephone,
                                    ShareLink: dynamicContent.Website,
                                    thingstoDoImageUrl: "",
                                    thingstoDocategory: itemData.itemTitle,
                                    shareVisible: (dynamicContent.Website != undefined && dynamicContent.Website != null && dynamicContent.Website != "" ? "visible" : "collapsed")
                                });
                            });
                            itemsList[args.index].visibility = "visible";
                            itemsList[args.index].subItems = ChildItems;
                            viewModel.set('listItems', []);
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

    if (subItemData.thingstoDoImage != undefined && subItemData.thingstoDoImage != null && subItemData.thingstoDoImage != "") {

        service.getImage(subItemData.thingstoDoImage)
            .then(function (data) {
                var ChildItems = [];
                ChildItems.push({
                    thingstoDoId: subItemData.thingstoDoId,
                    thingstoDoTitle: subItemData.thingstoDoTitle,
                    thingstoDoDescription: subItemData.thingstoDoDescription,
                    thingstoDoTelephone: subItemData.thingstoDoTelephone,
                    thingstoDoAddress: subItemData.thingstoDoAddress,
                    thingstoDoImage: subItemData.thingstoDoImage,
                    piPhoneAndAddress: subItemData.piPhoneAndAddress,
                    thingstoDocategory: subItemData.thingstoDocategory,
                    ShareLink: subItemData.ShareLink,
                    shareVisible: subItemData.shareVisible,
                    thingstoDoImageUrl: data[0].Uri
                });
                viewModel.set('SubListItems', "");
                viewModel.set('SubListItems', ChildItems);
                helpers.navigate({
                    moduleName: 'components/thingsToDo/itemDetails/itemDetails',
                    context: GetSubListItems()[0]
                });
            })
         .catch(function onCatch(ex) {
             alert(ex)
         });
    }
    else {
        helpers.navigate({
            moduleName: 'components/thingsToDo/itemDetails/itemDetails',
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
        item.subItems = "";
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

// START_CUSTOM_CODE_thingsToDo
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_thingsToDo
exports.pageLoaded = pageLoaded;
exports.onListViewItemTap = onListViewItemTap;
exports.onDetailItemTap = onDetailItemTap;
exports.ShowMap = ShowMap;
exports.ShowList = ShowList;