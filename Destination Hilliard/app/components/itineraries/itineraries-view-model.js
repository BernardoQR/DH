'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'Itineraries',
    isLoading: false,
    listItems: [],
    SubListItems: [],
    ListVisible: "visible",
    MapVisible: "collapsed"



});

// START_CUSTOM_CODE_itineraries
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_itineraries
module.exports = ViewModel;