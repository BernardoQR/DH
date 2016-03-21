'use strict';
var _,

    _consts,
    dataService = require('../../dataProviders/destinationHilliard'),
    // additional requires
    Everlive = require('../../everlive/everlive.all.min.js'),
    consts;


function Service() { }




// additional properties

// START_CUSTOM_CODE_placesToStay
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes




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
        data = dataService.data('DynamicContent');

    var filter = {
        Category: 'f9097500-eb91-11e5-abe1-5de1c5770579'
    };

    expandExp = {

    };

    return data.expand(expandExp).get(filter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};







// END_CUSTOM_CODE_placesToStay
module.exports = new Service();