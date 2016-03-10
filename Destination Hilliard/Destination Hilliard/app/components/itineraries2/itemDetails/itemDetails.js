var helpers = require('../../../utils/widgets/helper'),
    dataService = require('../../../dataProviders/destinationHilliard');

function navigatedTo(args) {
    var page = args.object;

    page.bindingContext = page.navigationContext;
}

exports.navigatedTo = navigatedTo;