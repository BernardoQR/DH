'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),

    service = require('./itineraries-service'),
    // additional requires

    viewModel = require('./itineraries-view-model');
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    viewModel.set('isLoading', true);
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
            viewModel.set('isLoading', false);
        })
        .catch(function onCatch() {
            //viewModel.set('isLoading', false);
            alert("error2")
        });



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
        			            pointOfInterestDescription: dynamicContent.Description
        			        });
        			    });
        			    itemsList[args.index].visibility = "visible";
        			    itemsList[args.index].itineraryItems = ChildItems;
        			    temp.push(itemsList[args.index]);
        			    viewModel.set('listItems', "");
        			    viewModel.set('listItems', itemsList);
        			    viewModel.set('SubListItems', ChildItems);

        			})
         .catch(function onCatch() {
             //viewModel.set('isLoading', false);
             alert("error2")
         });
}


function onDetailItemTap(args) {
    var subItemsList = GetSubListItems();
    var subItemData = subItemsList[args.index];
    alert(subItemData.pointOfInterestTitle);

    //helpers.navigate({
    //    moduleName: 'components/itineraries/itemDetails/itemDetails',
    //    context: itemData.details
    //});

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