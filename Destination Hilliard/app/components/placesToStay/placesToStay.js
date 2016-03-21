'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    observable = require("data/observable"),
    service = require('./placesToStay-service'),
    // additional requires
    viewModel = require('./placesToStay-view-model');



function ShowList(eventData) {
    viewModel.set('ListVisible', "visible");
    viewModel.set('MapVisible', "collapsed");

};


function ShowMap(args) {
    viewModel.set('ListVisible', "collapsed");
    viewModel.set('MapVisible', "visible");
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
function pageLoaded(args) {
    var page = args.object;
    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);
    helpers.platformInit(page);
    var itemsList = [];
    if (GetItems() == null || GetItems() == [] || GetItems() == "") {
        service.getAllRecords()
             .then(function (result) {
                 result.forEach(function (item) {
                     flattenLocationProperties(item);
                     itemsList.push({
                         Title: item.Title,
                         Description: item.Description,
                         Id: item.Id,
                         ImageUrl: "",
                         ObjImage: item.Image,
                         Telephone: item.Telephone,
                         Website: item.Website,
                         PhoneAndAddress: item.Address + " . " + item.Telephone
                     });
                 });
                 viewModel.set('listItems', itemsList);
             })
             .catch(function onCatch(ex) {
                 //viewModel.set('isLoading', false);
                 alert(ex)
             });

    }
    else {

    }
    viewModel.set('isLoading', false);

    page.bindingContext = viewModel;
    if (isInit) {
        isInit = false;
        // additional pageInit
    }
}


function GetItems() {
    var subItemsList = [];
    subItemsList = viewModel.get('listItems');
    return subItemsList;
}



function onDetailItemTap(args) {
    var subItemsList = GetItems();
    var subItemData = subItemsList[args.index];

    if (subItemData.ObjImage != null && subItemData.ObjImage != "") {
        service.getImage(subItemData.ObjImage)
            .then(function (data) {
                var ChildItems = [];
                ChildItems.push({
                    Id: subItemData.Id,
                    Title: subItemData.Title,
                    Description: subItemData.Description,
                    Telephone: subItemData.Telephone,
                    Address: subItemData.Address,
                    Image: subItemData.ObjImage,
                    Website: subItemData.Website,
                    PhoneAndAddress: subItemData.PhoneAndAddress,
                    ImageUrl: data[0].Uri
                });
                helpers.navigate({
                    moduleName: 'components/placesToStay/itemDetails/itemDetails',
                    context: GetSubListItems()[0]
                });
            })
         .catch(function onCatch(ex) {
             alert(ex)
         });
    }
    else {
        helpers.navigate({
            moduleName: 'components/placesToStay/itemDetails/itemDetails',
            context: subItemData
        });
    }
}



// START_CUSTOM_CODE_placesToStay
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_placesToStay
exports.pageLoaded = pageLoaded;
exports.onDetailItemTap = onDetailItemTap;
exports.ShowMap = ShowMap;
exports.ShowList = ShowList;