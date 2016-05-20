(function () {
    'use strict';

    var citiesNames = [],
        citiesImages = [];

    server.cities(function (response) {
        for (var i = 0; i < response.length; i++) {
            citiesNames.push(response[i].city_name);
            citiesImages.push(response[i].images[0].url);
        }

        var target = document.getElementById('cities-list');

        renderArray('cities', target, citiesNames, citiesImages);
    });
})();