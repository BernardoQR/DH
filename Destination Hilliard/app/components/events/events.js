'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper');
// additional requires
var viewModel = require('./events-view-model');
var observable = require("data/observable");
//var viewModel = new observable.Observable({});
//var FetchStream = require("fetch").FetchStream;
var http = require("http");









// additional functions
function pageLoaded(args) {
    var page = args.object;
    viewModel.set('isLoading', true);
    helpers.platformInit(page);

    var itemsList = [];
    http.request({ url: "http://destinationhilliard.com/events/feed/", method: "GET" }).then(function (response) {
        // Argument (response) is HttpResponse!
        // Content property of the response is HttpContent!
        var str = response.content.toString();
        //var obj = response.content.toJSON();
        var arrayChannel = str.split("<channel>");
        var arrayItems = arrayChannel[1].split("<item>");     
        for (var i = 1; i < arrayItems.length; i++) {
            itemsList.push({
                title: arrayItems[i].split("<title>")[1].split("</title>")[0],
                link: arrayItems[i].split("<link>")[1].split("</link>")[0],
                guid: arrayItems[i].split("<guid>")[1].split("</guid>")[0],
                pubDate: arrayItems[i].split("<description><![CDATA[")[1].split("]]></description>")[0].split("<br/>")[0],
                description: arrayItems[i].split("<description><![CDATA[")[1].split("]]></description>")[0].split("<br/>")[1],
                address: arrayItems[i].split("<description><![CDATA[")[1].split("]]></description>")[0].split("<br/>")[2]
            });
        }
        viewModel.set('listItems', itemsList);
       

        //var img = response.content.toImage();
    }, function (e) {
        // Argument (e) is Error!
        alert(e)
    });


    
    page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        // additional pageInit
    }
}

// START_CUSTOM_CODE_events
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_events
exports.pageLoaded = pageLoaded;