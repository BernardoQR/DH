'use strict';
var observable = require('data/observable'),
    navigationViewModel = new observable.Observable(),
    openApp;


navigationViewModel.set('openApp', true);

module.exports = navigationViewModel;