'use strict';
var helpers = require('../utils/widgets/helper'),
    navigationViewModel = require('./launch-view-model');
var frameModule = require("ui/frame");
var imageModule = require("ui/image");



function pageLoaded(args) {
    var page = args.object;

    if (navigationViewModel.get('openApp') == true) {
        navigationViewModel.set('openApp', false);

        var item = new imageModule.Image();
        item.src = "~/images/Landing-Page.png";
        item.height = 200;
        item.on("loaded", function (args) {


            args.object
                .animate({
                    scale: { x: 0.6, y: 0.6 },
                    duration: 0
                })
                .then(function () {
                    return args.object.animate({
                        scale: { x: 4, y: 5 },
                        duration: 750
                    });
                })
                .then(function () {
                    return args.object.animate({
                        opacity: 0,
                        duration: 900
                    });
                })
                .then(function () {
                    helpers.navigate({
                        moduleName: 'components/homeView/homeView',
                        context: []
                    }); 
                });
        });
        // Append the dynamically created image to the <GridLayout>
        var grid = page.getViewById("grid");
        grid.addChild(item);


   
    }
    else {
       
        helpers.navigate({
            moduleName: 'components/homeView/homeView',
            context: []
        });

    }


   
}

function menuItemTap(args) {
    helpers.navigate(navigationViewModel.menuItems[args.index]);
}

exports.pageLoaded = pageLoaded;
exports.menuItemTap = menuItemTap;
