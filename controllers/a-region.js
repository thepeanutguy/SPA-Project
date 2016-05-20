(function () {
    'use strict';

    var region = hasher.getHash().split('/')[1],
        drill_down = document.getElementById('drill-down'),
        regionData,
        responseData;

    xmlHttpRequest('GET', './server/regions.php', null, function (res) {
        responseData = JSON.parse(res);
        responseData = responseData.regions;
        region = region.replace(/-/g, ' ');

        for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].region_name === region) {
                regionData = responseData[i];
            }
        }

        if (typeof regionData === 'undefined') {
            console.log('regionData; undefined');
        } else {
            renderRegion(regionData, function () {
                // Image selector controller
                var main_image = document.getElementById('main-image').getElementsByTagName('img')[0],
                    small_images = document.getElementById('other-region-images').getElementsByTagName('img');
                
                for (var i = 0; i < small_images.length; i++) {
                    small_images[i].addEventListener('click', function (event) {
                        try {
                            var main_image_src = main_image.getAttribute('src');
                            var small_image_src = this.getAttribute('src');
                            
                            // Replace main image with selected image
                            main_image.setAttribute('src', small_image_src);
                            
                            // Replace old image with the to-be-removed main image
                            this.setAttribute('src', main_image_src);
                        } catch (Exception) {
                            console.log('Error with event listener.');
                        }
                    }, false);
                }
            });
        }
        
        // Map
        var map = L.map('mapId').setView([regionData.lat, regionData.long], 7);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([regionData.lat, regionData.long]).addTo(map)
            .bindPopup(regionData.region_name)
            .openPopup();

        // Drill-down menu
        server.regions(function (regions) {
            console.log(regions);

            server.cities(function (cities) {
                for (var i = 0; i < cities.length; i++) {
                    if (cities[i].region_id === regionData.region_id) {
                        var drill_down_item = document.createElement('li'),
                            drill_down_link = document.createElement('a');

                        drill_down.appendChild(drill_down_item).appendChild(drill_down_link).href = '#/cities/' + cities[i].city_name.replace(/[\. ,:-]+/g, '-');
                        drill_down_link.innerText = cities[i].city_name;
                    }
                }
            });
        });
    });
})();