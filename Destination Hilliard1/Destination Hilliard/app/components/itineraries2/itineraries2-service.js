'use strict';
var _,

    _consts,
    dataService = require('../../dataProviders/destinationHilliard'),
    // additional requires

    consts;

function Service() {}



function onRequestSuccess(data) {
    return data.result;
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}







Service.prototype.getAllRecords = function(args) {
    var expandExp,
        data = dataService.data('Category');
    
	var filter = { 
    'Parent': 'dde30290-e48a-11e5-87d0-a95f0bfa4814'
};
    
    
    expandExp = {

    };

    return data.expand(expandExp).get(filter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};


Service.prototype.getDynamicContent = function(args) {
    var expandExp,
        data = dataService.data('DynamicContent');
    
    
	var filter = { 
        	Category: args
    };
    expandExp = {

    };

    return data.expand(expandExp).get(filter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};




// additional properties

// START_CUSTOM_CODE_itineraries2
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_itineraries2
module.exports = new Service();