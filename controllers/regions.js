(function () {
    'use strict';

    var regionsNameList = [],
        regionsFlagList = [];

    server.regions(function (response) {
        for (var i = 0; i < response.length; i++) {
            regionsNameList.push(response[i].region_name);
            regionsFlagList.push(response[i].flag);
        }

        var target = document.getElementById('regions-list');

        renderArray('regions', target, regionsNameList, regionsFlagList);
    });
})();