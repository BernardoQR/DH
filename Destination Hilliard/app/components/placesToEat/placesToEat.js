'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    service = require('./placesToEat-service'),
    viewModel = require('./placesToEat-view-model');


function pageLoaded(args) {
    viewModel.set('isLoading', true);
    var page = args.object;

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
    var temp = [];
    itemsList = GetListItems();
    var itemData = itemsList[args.index];
    var ChildItems = [];
  
    service.getDynamicContent(itemData.itemId)
        			.then(function (SubItems) {
        			  
        			    ChildItems = [];
        			    SubItems.forEach(function (dynamicContent) {
        			        flattenLocationProperties(dynamicContent);
        			        ChildItems.push({
        			            placeToEatId: dynamicContent.Id,
        			            placeToEatTitle: dynamicContent.Title,
        			            placeToEatDescription: dynamicContent.Description,
        			            placeToEatTelephone: dynamicContent.Telephone,
        			            placeToEatAddress: dynamicContent.Address,
        			            placeToEatImage: dynamicContent.Image,
        			            piPhoneAndAddress: dynamicContent.Address + " . " + dynamicContent.Telephone,
        			            placesToEatImageUrl: "",
        			            placesToEatcategory: itemData.itemTitle
        			        });
        			    });
        			    itemsList[args.index].visibility = "visible";
        			    itemsList[args.index].subItems = ChildItems;
        			    temp.push(itemsList[args.index]);
        			    viewModel.set('listItems', []);
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

    if (subItemData.placeToEatImage != null && subItemData.placeToEatImage != "") {

        service.getImage(subItemData.placeToEatImage)
            .then(function (data) {
                var ChildItems = [];
                ChildItems.push({
                    placeToEatId: subItemData.placeToEatId,
                    placeToEatTitle: subItemData.placeToEatTitle,
                    placeToEatDescription: subItemData.placeToEatDescription,
                    placeToEatTelephone: subItemData.placeToEatTelephone,
                    placeToEatAddress: subItemData.placeToEatAddress,
                    placeToEatImage: subItemData.placeToEatImage,
                    piPhoneAndAddress: subItemData.piPhoneAndAddress,
                    placesToEatcategory: subItemData.placesToEatcategory,
                    placeToEatImageUrl: data[0].Uri
                });
                viewModel.set('SubListItems', "");
                viewModel.set('SubListItems', ChildItems);
                helpers.navigate({
                    moduleName: 'components/placesToEat/itemDetails/itemDetails',
                    context: GetSubListItems()[0]
                });
            })
         .catch(function onCatch(ex) {
             alert(ex)
         });
    }
    else {
        helpers.navigate({
            moduleName: 'components/placesToEat/itemDetails/itemDetails',
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
// additional functions



exports.pageLoaded = pageLoaded;
exports.onListViewItemTap = onListViewItemTap;
exports.onDetailItemTap = onDetailItemTap;
