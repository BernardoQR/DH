'use strict';
var _,
    // additional requires
    _consts,
    dataService = require('../../dataProviders/destinationHilliard'),
    // additional requires
    Everlive = require('../../everlive/everlive.all.min.js'),
    consts;


function Service() { }



function onRequestSuccess(data) {
    return data.result;
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}


Service.prototype.getImage = function (args) {
    var expandExp,
       data = dataService.data('Files');

    var filter = {
        Id: args
    };


    expandExp = {

    };

    return data.expand(expandExp).get(filter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};




Service.prototype.getAllRecords = function (args) {
    var expandExp,
        data = dataService.data('Category');

    var filter = {
        'Parent': 'a2b6c360-eb91-11e5-a24b-434b78cc1c1f'
    };


    expandExp = {

    };

    return data.expand(expandExp).get(filter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};


Service.prototype.getDynamicContent = function (args) {
    var expandExp,
        data = dataService.data('DynamicContent');


    var filter = {
        CategoryType: args
    };
    expandExp = {

    };

    return data.expand(expandExp).get(filter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};



// additional properties

// START_CUSTOM_CODE_thingsToDo
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_thingsToDo
module.exports = new Service();